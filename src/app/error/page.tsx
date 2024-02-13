'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation'

export default function ErrorPage() {
  const router = useRouter();

  function retry() {
    router.back();
  }

  return (
    <div>
      <h2>Não foi possível prosseguir com a solicitação. Tente novamente em alguns segundos.</h2>
      <Button onClick={retry}>Tentar novamente</Button>
    </div>
  )
}