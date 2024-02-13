'use client';

import React, { ElementRef } from 'react'
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { AxiosError } from 'axios';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import { Routes } from '@/routes';

export function EmailLogin() {
  const emailRef = React.useRef<(ElementRef<'input'>)>(null);
  const passwordRef = React.useRef<(ElementRef<'input'>)>(null);
  const [error, setError] = React.useState<string>();

  const router = useRouter();

  async function login() {
    try {
      await api.post('/auth/login');

      return router.push(Routes.dashboard);
    } catch (e) {
      if (e instanceof AxiosError) {
        const status = e.response?.status;
        if (status === 401) {
          setError('Tem algo errado com o e-mail ou a senha informados. Dá uma conferida.');
        } else {
          setError('Algo deu errado. Tente novamente em alguns segundos');
        }
      }
    }
  }

  return (
    <div className='flex flex-col gap-2'>
      <div>
        <Input placeholder='E-mail' type='email' required ref={emailRef} />
        <Input placeholder='Senha' type='password' required ref={passwordRef} />
      </div>
      <Button onClick={login}>Entrar</Button>
      {error && (
        <div>{error}</div>
      )}
    </div>
  );
}