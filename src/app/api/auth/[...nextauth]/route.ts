// /src/app/api/auth/[...nextauth]/route.ts

import NextAuth from 'next-auth';
import Spotify from 'next-auth/providers/spotify';

const authOptions = {
  providers: [
    Spotify({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: 'user-read-email user-read-private',
        },
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin', // Custom sign-in page
    error: '/auth/error', // Custom error page (optional)
  },
  callbacks: {
    async session({ session, token }: any) {
      return session; // Custom session handling if needed
    },
  },
};

// Named exports for HTTP methods
export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
