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
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate, authenticateGoogle } from '../lib/actions';
import { Button } from './button';
import Spinner from './spinner';

export default function LoginForm() {
  const router = useRouter();
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  const [errorMessageGoogle, dispatchGoogle] = useFormState(
    authenticateGoogle,
    undefined,
  );
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');

  return (
    <>
      <form action={dispatchGoogle}>
        <Button type="submit">Signin with Google</Button>
      </form>
      <form action={dispatch} className="space-y-3">
        <div className="relative flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
          <XMarkIcon
            className="absolute right-4 top-4 size-6 cursor-pointer"
            onClick={() => {
              router.back();
            }}
          />

          <h1 className={`${lusitana.className} mb-3 text-2xl`}>
            Please log in to continue.
          </h1>
          <div className="w-full">
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
            </div>
            <div className="mt-4">
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                {passwordInput.length > 0 &&
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
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                />
                <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>
          <LoginButton />

          <Button
            type="button"
            onClick={() => {
              router.push('/sign-up');
            }}
            className="mt-4 w-full bg-green-500 hover:bg-green-400"
          >
            Create new account
            <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
          </Button>

          <div
            className="flex h-8 items-end space-x-1"
            aria-live="polite"
            aria-atomic="true"
          >
            {errorMessage && (
              <>
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                <p className="text-sm text-red-500">{errorMessage}</p>
              </>
            )}
          </div>
        </div>
      </form>
    </>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="mt-4 w-full" aria-disabled={pending}>
      {pending && <Spinner />}
      Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
