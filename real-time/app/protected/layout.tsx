import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Removed items-center to allow children to handle their own alignment
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Fixed Navbar: Stays at the top and spans full width */}
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 bg-white/50 backdrop-blur-md sticky top-0 z-[50]">
        <div className="w-full max-w-7xl flex justify-between items-center p-3 px-5 text-sm">
          <div className="flex gap-5 items-center font-bold text-lg tracking-tighter text-slate-900">
            <Link href={"/"}>UniTalk</Link>
          </div>
          <div className="flex items-center gap-4">
            {!hasEnvVars ? (
              <EnvVarWarning />
            ) : (
              <Suspense>
                <AuthButton />
              </Suspense>
            )}
            <ThemeSwitcher />
          </div>
        </div>
      </nav>

      {/* Main Content: flex-1 makes it push the footer down. No max-width here! */}
      <main className="flex-1 w-full flex flex-col">
        {children}
      </main>

      {/* Simple, clean footer that doesn't eat up half the screen */}
      <footer className="w-full flex items-center justify-center border-t py-8 text-xs text-slate-400">
        <p>
          Powered by{" "}
          <a
            href="https://supabase.com"
            target="_blank"
            className="font-bold hover:underline text-slate-600"
            rel="noreferrer"
          >
            Supabase
          </a>
        </p>
      </footer>
    </div>
  );
}