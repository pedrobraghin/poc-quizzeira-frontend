import Link from 'next/link';

import { Tabs } from '@/components/tabs';
import { GoogleLogin } from '@/components/auth/google-login';
import { EmailLogin } from '@/components/auth/email-login';
import { Routes } from '@/routes';

export default function LoginPage() {

  return (
    <main className='flex flex-col w-screen min-h-screen justify-center items-center'>
      <div className='flex flex-col gap-5'>
        <Tabs
          tabs={[{
            name: 'Google',
            uniqueLabel: 'google',
            component: <GoogleLogin />
          }, {
            name: 'E-mail e senha',
            uniqueLabel: 'email',
            component: <EmailLogin />
          }]}
        />
        <div>
          <Link href={Routes.forgotPass}>Esqueci minha senha</Link>
        </div>
      </div>
    </main>
  );
}