'use client';

import { authorize } from '@/API/authorize';
import useRefreshToken from '@/hooks/useRefreshToken';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";

export default function AuthButton() {
  const router = useRouter();
  const { code } = router as { code?: string };
  useRefreshToken(code as string);

  if(code) router.push('/profile')
  return (
    <button onClick={authorize}>Sign in with Spotify</button>
  );
}
