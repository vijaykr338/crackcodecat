"use client";
import ProfilePageClient from "./ProfilePageClient";
import { useUser } from "@/hooks/getuser";
import { useRouter } from "next/navigation";

export default  function ProfilePage() {
  const { user, loading } = useUser();
  const router = useRouter();

  if (loading) return <p>Loading ... </p>;
  else {
    if (!user) {
      console.log("user nhi hai");
      router.push("/auth/signin");
      return null;
    } else {
      const {userId,name,email} = user;
      return <ProfilePageClient initialUser={{ _id: userId, name, email }} />;
    }
  }
  
}
//helloworld1
