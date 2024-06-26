'use client';

import { lusitana } from '@/app/ui/fonts';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import {
  AtSymbolIcon,
  ExclamationCircleIcon,
  EyeIcon,
  EyeSlashIcon,
  KeyIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useFormState, useFormStatus } from 'react-dom';

import PasswordStrengthMeter from '@/app/ui/password-strength-meter';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { UserState, insertUsers } from '../lib/actions';
import { PasswordSchema } from '../lib/schemas';
import { Button } from './button';
import Spinner from './spinner';

type Props = {};

const SignUpForm = (props: Props) => {
  const router = useRouter();
  const initialState: UserState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(insertUsers, initialState);
  const [visiblePassword, setVisiblePassword] = useState(false);

  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pwd = e.target.value;
    setPassword(pwd);

    const result = PasswordSchema.safeParse({ password: pwd });
    if (!result.success) {
      setErrors(result.error.errors.map((error) => error.message));
    } else {
      setErrors([]);
    }
  };

  return (
    <form action={dispatch} className="space-y-3">
      <div className="relative flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <XMarkIcon
          className="absolute right-4 top-4 size-6 cursor-pointer"
          onClick={() => {
            router.back();
          }}
        />
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Please sign up to continue.
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="name"
            >
              Name
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="name"
                type="text"
                name="name"
                placeholder="Enter your name"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="user-error" aria-live="polite" aria-atomic="true">
              {state.errors?.name &&
                state.errors.name.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="user-error" aria-live="polite" aria-atomic="true">
              {state.errors?.email &&
                state.errors.email.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              {password.length > 0 &&
                (visiblePassword ? (
                  <EyeSlashIcon
                    className="absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 cursor-pointer"
                    onMouseDown={(e) => {
                      e.preventDefault(); // Prevents onBlur from being triggered
                      setVisiblePassword(false);
                    }}
                  />
                ) : (
                  <EyeIcon
                    className="absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 cursor-pointer"
                    onMouseDown={(e) => {
                      e.preventDefault(); // Prevents onBlur from being triggered
                      setVisiblePassword(true);
                    }}
                  />
                ))}
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type={visiblePassword ? 'text' : 'password'}
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
                value={password}
                onChange={(e) => handleChange(e)}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <PasswordStrengthMeter password={password} errors={errors} />
            <div
              className="my-4"
              id="user-error"
              aria-live="polite"
              aria-atomic="true"
            >
              {state.errors?.password &&
                state.errors.password.map((error: string) => (
                  <div className="my-2 flex gap-2" key={error}>
                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                    <p className="text-sm text-red-500">{error}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <SignUpButton />
        <div
          className="mt-4 flex max-w-fit items-center justify-center space-x-2"
          aria-live="polite"
          aria-atomic="true"
        >
          {state.message && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{state.message}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;

function SignUpButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="mt-4 w-full" aria-disabled={pending}>
      {pending && <Spinner />}
      Sign Up <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
