"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(), //The amount field is specifically set to coerce (change) from a string to a number while also validating its type.
  status: z.enum(["pending", "paid"]),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
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

  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split("T")[0];

  await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;

  //revalidatePath allows you to purge cached data on-demand for a specific path.
  // Since you're updating the data displayed in the invoices route, you want to clear this cache and trigger a new request to the server.
  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}
