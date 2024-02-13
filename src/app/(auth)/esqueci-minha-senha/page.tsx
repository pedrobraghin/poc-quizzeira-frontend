'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import api from '@/lib/api';
import { Routes } from '@/routes';
import Link from 'next/link';
import React, { ElementRef } from 'react'

export default function ForgotPassword() {
  const inputRef = React.useRef<(ElementRef<'input'>)>(null);
  const [error, setError] = React.useState(false);
  const [success, setSuccess] = React.useState<boolean>();

  async function requestResetPassword() {
    try {
      setError(false)
      await api.post('/auth/forgot-password', {
        email: inputRef.current?.value
      });
      setSuccess(true);
    } catch {
      setSuccess(false);
      setError(true)
    }
  }

  return (
    <main className='flex flex-col justify-center items-center w-screen min-h-screen p-10'>
      <div className='flex flex-col gap-4'>
        {success ? (
          <div>
            <span>Deu certo! Você enviou o link para recuperação de senha.</span>
          </div>
        ) : (
          <React.Fragment>
            <h2>
              Esqueceu sua senha? Insira seu endereço de e-mail cadastrado no quizzeira e enviaremos um link para redefinição de senha
            </h2>
            <Input
              placeholder="E-mail"
              ref={inputRef}
              autoComplete="email"
              onKeyDown={
                (e) => {
                  if (e.code !== 'Enter') return;
                  requestResetPassword();
                }
              }
            />
            <Button onClick={requestResetPassword}>Enviar link para redefinição de senha</Button>
            {error && (
              <div>
                <span>Algo deu errado ao enviar o e-mail. Tente novamente em alguns segundos</span>
              </div>
            )}
            <div>
              <Link href={Routes.login}>Lembrou a senha? Faça login</Link>
            </div>
          </React.Fragment>
        )}
      </div>
    </main>
  )
}