import Navbar from "@/components/navbar"; // Import the new component
import { AuthButton } from "@/components/auth-button";
import HeroScroll from "@/components/HeroScroll";
import Section from "@/components/Section";
import { hasEnvVars } from "@/lib/utils";
import { Suspense } from "react";

export default function Home() {
  const authElement = (
    <Suspense fallback={<div className="w-20 h-8 bg-white/5 animate-pulse rounded-full" />}>
      <AuthButton />
    </Suspense>
  );

  return (
    <main className="relative min-h-screen bg-black">
      {/* Render the cinematic navbar */}
      <Navbar authButton={authElement} />
      <HeroScroll totalFrames={120} />
      <section>
        
      </section>
    </main>
  );
}