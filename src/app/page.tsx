'use client';

import { Button } from '@/components/ui/button';
import config from '@/config';
import api from '@/lib/api';
import { User } from '@/types/user';
import { AxiosError } from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Home() {
  const loginUrl = config.API_URL.concat('/auth/google');
  const [user, setUser] = React.useState<User>();
  const [error, setError] = React.useState<string>();

  async function getMe() {
    try {
      setError(undefined)
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
      <Button onClick={getMe}>Carregar meus dados</Button>
      <div>
        {user && (
          <div className='flex flex-col gap-2 items-center justify-center'>
            <Image src={user.picture} width={80} height={80} alt={`Foto de perfil de ${user.name}`} />
            <span>Logado como {user.name}</span>
          </div>
        )}
      </div>
      <div>
        <span>{error}</span>
      </div>
    </main>
  );
}
