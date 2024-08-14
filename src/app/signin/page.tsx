"use client";

import { signIn } from 'next-auth/react';
import { authorize } from '../API/authorize';

export default function SignInPage() {
  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={authorize}>Sign in with Spotify</button>
    </div>
  );
}
