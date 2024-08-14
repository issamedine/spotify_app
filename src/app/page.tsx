import AuthButton from "@/components/auth/AuthButton";
import UserProfile from "@/components/profile/UserProfile";
import useRefreshToken from "@/hooks/useRefreshToken";
import { useRouter } from "next/router";

export default function HomePage() {
  const router = useRouter();

  const code = router.query.code;

  useRefreshToken(code as string);

  return (
    <div>
      <h1>Spotify OAuth with NextAuth.js</h1>
      {code ? <UserProfile /> : <AuthButton />}
    </div>
  );
}
