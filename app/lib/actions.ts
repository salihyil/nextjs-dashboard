'use server';

import { signIn } from '@/auth';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import { AuthError } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { CreateInvoice, InsertUser, UpdateInvoice } from './schemas';

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export type UserState = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};

export async function createInvoice(
  prevState: State,
  formData: FormData,
): Promise<State> {
  /* Tip: If you're working with forms that have many fields, you may want to consider using the entries() method with JavaScript's Object.fromEntries().
   For example:
   const rawFormData = Object.fromEntries(formData.entries()) */

  /*   const rawFormData = {
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  };
    console.log(rawFormData);
    console.log(typeof rawFormData.amount); // "string" dönüyor bunu number çevirmek lazım typesafe için */

  // Validate form using Zod
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  // Prepare data for insertion into the database
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  // Insert data into the database
  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;

  try {
    await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
  `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Update Invoice.',
    };
  }

  //redirect'in try/catch bloğunun dışında nasıl çağrıldığına dikkat edin. Bunun nedeni, redirect'in catch bloğu tarafından yakalanacak bir hata atarak çalışmasıdır. Bundan kaçınmak için redirect'i try/catch'ten sonra çağırabilirsiniz. redirect'e yalnızca try başarılı olursa erişilebilir.

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
    return { message: 'Deleted Invoice.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Invoice.' };
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function authenticateGoogle(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('google');
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function insertUsers(prevState: UserState, formData: FormData) {
  const validatedFields = InsertUser.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Insert User.',
    };
  }

  const { email, name, password } = validatedFields.data;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${uuidv4().toString()}, ${name}, ${email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
  } catch (error: any) {
    if (
      error.message.includes(
        'duplicate key value violates unique constraint "users_email_key"',
      )
    ) {
      return {
        message:
          'This email address is already in use. Please try a different email address.',
        errors: {},
      };
    }
    return { message: error.message };
  }

  revalidatePath('/login');
  redirect('/login');
}
