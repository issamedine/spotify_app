import AuthButton from "@/components/auth/AuthButton";
import UserProfile from "@/components/profile/UserProfile";

export default function HomePage() {
  return (
    <div>
      <h1>Spotify OAuth with NextAuth.js</h1>
      <AuthButton />
      <UserProfile />
    </div>
  );
}
