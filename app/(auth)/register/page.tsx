import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { SubmitButton } from "../login/submit-button";

export default async function Register({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if(user) {
    redirect('/home');
  }

  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });
       
    if (authError) {
      console.log(authError);
      return redirect("/login?message=Could not authenticate user, please try again");
    }

    const userId = authData?.user?.id;

    if (!userId) {
      console.error("Failed to retrieve user ID from auth data.");
      return redirect("/login?message=Could not retrieve user ID, please try again.");
    }

    const { data: customAuthData, error: customAuthError } = await supabase.from('users').insert([
      {
        user_id: userId,
        username: '',
        theme: 'light',
      }
    ])

    if (customAuthError) {
      return redirect("/register?message=Could not authenticate user, please try again");

    }
    
    // all actions are successful 
    return redirect("/home?");
  };
  

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <Link
        href="/"
        className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Back
      </Link>

      <h1 className="text-5xl roboto-bold text-primary text-center mb-9">Register</h1>

      <div className="flex flex-col">
        <form className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
          <label className="text-xl" htmlFor="email">
            Email
          </label>
          <input
            className="text-xl rounded-md px-4 py-3 bg-inherit border mb-4"
            name="email"
            placeholder="you@example.com"
            required
          />
          <label className="text-xl" htmlFor="password">
            Password
          </label>
          <input
            className="text-xl rounded-md px-4 py-3 bg-inherit border mb-6"
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />
          <SubmitButton
            formAction={signUp}
            className="bg-[#C82929] text-xl rounded-md px-4 py-3 text-foreground mb-2 hover:bg-primary-hover"
            pendingText="Signing Up..."
          >
            Register
          </SubmitButton>     
        </form>
        <div className="text-center">Already have an account? <Link href="/login" className="text-primary hover:text-primary-hover">Login</Link></div>
        {searchParams?.message && (
            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
              {searchParams.message}
            </p>
          )}
      </div>
    </div>
  );
}