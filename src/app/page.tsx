'use client';

import { Button } from '@/components/ui/button';
import config from '@/config';
import api from '@/lib/api';
import { AxiosError } from 'axios';
import Link from 'next/link';
import React from 'react';

export default function Home() {
  const loginUrl = config.API_URL.concat('/auth/google');
  const [user, setUser] = React.useState<any>();
  const [error, setError] = React.useState<string>();

  async function getMe() {
    try {
      setError('')
      const response = await api.get('/users/me');
      setUser(response.data);
    } catch (e) {
      if (e instanceof AxiosError) {
        setError('Erro ao carregar os dados. Status: ' + e.response?.status);
      }
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-24">
      <h2>Faça login para continuar</h2>
      <Button>
        <Link href={loginUrl}>Entrar com o Google</Link>
      </Button>
      <div>
        <Button onClick={getMe}>Carregar meus dados</Button>
        <pre>
          {JSON.stringify(user, null, 2)}
          {error}
        </pre>
      </div>
    </main>
  );
}
