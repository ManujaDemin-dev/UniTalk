import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

async function UserDetails() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  return JSON.stringify(data.claims, null, 2);
}

export default function ProtectedPage() {
  return (
    <>
      <main>
        create a profile : 
        <a href="/profile">profile page</a>
        <br />
        Go to Public Chat :
        <a href="/chat">Public Chat</a>
      </main>
    </>
  );
}
