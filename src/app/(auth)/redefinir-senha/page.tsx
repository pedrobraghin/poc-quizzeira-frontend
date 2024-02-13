'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { ElementRef } from 'react'
import api from '@/lib/api';
import { Routes } from '@/routes';
import { AxiosError } from 'axios';
import Link from 'next/link';

export default function ResetPassword() {
  const passwordRef = React.useRef<(ElementRef<'input'>)>(null);
  const passwordConfirmRef = React.useRef<(ElementRef<'input'>)>(null);

  const [error, setError] = React.useState<string>();
  const [showResendButton, setShowResendButton] = React.useState(false);

  const token = useSearchParams().get('jwt');
  const router = useRouter();

  if (!token) {
    return router.push(Routes.forgotPass);
  }

  async function resetPassword() {
    try {
      setError(undefined);
      setShowResendButton(false);

      await api.post('/auth/reset-password', {
        password: passwordRef.current?.value,
        passwordConfirm: passwordConfirmRef.current?.value,
        token,
      });

      return router.push(Routes.dashboard)
    } catch (e) {
      if (e instanceof AxiosError) {
        const status = e.response?.status;

        if (status === 401) {
          setError('Token expirado! Envie novamente.');
          setShowResendButton(true);
        } else if (status === 422) {
          setError('Você poderá enviar um token novamente em alguns minutos!');
        }
      }
    }
  }

  return (
    <main className='flex flex-col justify-center items-center gap-2 w-screen min-h-screen p-10'>
      <div className='flex flex-col gap-4 max-w-2xl w-full'>
        <h2>Redefina sua senha</h2>
        <span>Utilize uma senha segura. Essa senha será utilizada para fazer login no Quizzeira.</span>
        <div className='flex flex-col gap-2 w-full'>
          <Input placeholder='Nova senha' ref={passwordRef} />
          <Input placeholder='Confirme a nova senha' ref={passwordConfirmRef} />
        </div>
        <Button onClick={resetPassword}>Redefinir senha</Button>
        {error && (
          <div>
            <span>{error}</span>
            {showResendButton && (
              <Link href="/esqueci-minha-senha">
                <Button>Enviar novamente</Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </main>
  )
}