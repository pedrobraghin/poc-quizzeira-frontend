import config from '@/config';
import Link from 'next/link';
import { Button } from '../ui/button';
import { FcGoogle } from 'react-icons/fc';

export function GoogleLogin() {
  const loginUrl = config.API_URL.concat('/auth/google');

  return (
    <div className='flex flex-col gap-2 justify-start'>
      <Link href={loginUrl}>
        <Button className='flex items-center gap-2'>Entrar com o google <FcGoogle /></Button>
      </Link>
    </div>
  )
}