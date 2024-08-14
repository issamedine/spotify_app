'use client';

import AuthButton from "@/components/auth/AuthButton";
import UserProfile from "@/components/profile/UserProfile";
import useRefreshToken from "@/hooks/useRefreshToken";
import { usePathname } from 'next/navigation'

export default function HomePage() {
  const pathname = usePathname();
  console.log("🚀 ~ HomePage ~ router:", pathname)

  // const code = router.query.code;

  // useRefreshToken(code as string);

  return (
    <div>
      <h1>Spotify OAuth with NextAuth.js</h1>
       <UserProfile /> 
       <AuthButton />
    </div>
  );
}
