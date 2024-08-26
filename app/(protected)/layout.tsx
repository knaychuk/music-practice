import Navbar from "@/components/Navbar"
import { createClient } from "@/utils/supabase/server";
import { User } from "@/utils/types";

export default async function ProtectedLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log(user);


  const formattedUser: User = {
    email: user!.email ?? '',  
  }
  
  return (
    <section>
      <Navbar user={formattedUser} /> 
 
      {children}
    </section>
  )
}