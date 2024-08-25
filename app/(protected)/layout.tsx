import Navbar from "@/components/Navbar"
import { createClient } from "@/utils/supabase/server";

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

  return (
    <section>
      <Navbar user={user || {}} />
 
      {children}
    </section>
  )
}