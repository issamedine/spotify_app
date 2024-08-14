// /src/app/api/auth/[...nextauth]/route.ts

import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import Spotify from 'next-auth/providers/spotify';

const options: NextAuthOptions = {
  providers: [
    Spotify({
      clientId: process.env.SPOTIFY_CLIENT_ID as string,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope: 'user-read-email user-read-private',
        },
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin', // Custom sign-in page
  },
  callbacks: {
    async session({ session, token }) {
      // Custom session handling, if needed
      return session;
    },
  },
};

const handler = NextAuth(options);

export { handler as GET, handler as POST };
