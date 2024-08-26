import Navbar from "@/components/Navbar"
import { createClient } from "@/utils/supabase/server";
import { User } from "@/utils/types";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // Redirect to login if user is not authenticated
    return redirect("/login");
  }

  const formattedUser: User = {
    email: user.email ?? '',  
  }
  
  return (
    <section>
      <Navbar user={formattedUser} /> 
 
      {children}
    </section>
  )
}