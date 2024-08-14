'use client';

import { authorize } from '@/API/authorize';
import useRefreshToken from '@/hooks/useRefreshToken';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from "next/router";

export default function AuthButton() {

  return (
    <button onClick={authorize}>Sign in with Spotify</button>
  );
}
