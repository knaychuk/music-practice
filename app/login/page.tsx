import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";

export default async function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  // console.log(searchParams);

  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect("/home");

    // eventually add toast or message to tell user to logout first
  }

  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/home");
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

      <h1 className="text-5xl roboto-bold text-primary text-center mb-9">Login</h1>

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
              className="text-xl rounded-md px-4 py-3 bg-inherit border mb-2"
              type="password"
              name="password"
              placeholder="••••••••"
              required
            />
            <Link href="/" className="text-right text-primary mb-2 hover:text-primary-hover">Forgot Password?</Link>
            <SubmitButton
              formAction={signIn}
              className="bg-primary text-xl rounded-md px-4 py-3 text-foreground mb-2 hover:bg-primary-hover"
              pendingText="Signing In..."
            >
              Login
            </SubmitButton>
          </form>
          <div className="text-center">Don't have an account? <Link href="/register" className="text-primary hover:text-primary-hover">Register</Link></div>
          {searchParams?.message && (
            <p className="text-lg rounded-md mt-4 p-6 bg-zinc-700 text-foreground text-center">
              {searchParams.message}
            </p>
          )}
      </div>
    </div>
  );
}
