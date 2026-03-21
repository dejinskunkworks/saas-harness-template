import { redirect } from "next/navigation";

import { createServerClient } from "@/lib/supabase/server";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/sign-in");
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user.email}</span>
            <form action="/api/auth/sign-out" method="POST">
              <button type="submit" className="text-sm underline">
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
}
