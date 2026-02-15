import Navbar from "@/components/navbar";
import { AuthButton } from "@/components/auth-button";
import HeroScroll from "@/components/HeroScroll";
import { Suspense } from "react";

export default function Home() {
  // We keep the AuthButton in a Suspense boundary so it doesn't 
  // block the rest of the Navbar if the auth check is slow.
  const authElement = (
    <Suspense fallback={<div className="w-20 h-8 bg-white/5 animate-pulse rounded-full" />}>
      <AuthButton />
    </Suspense>
  );

  return (
    <main className="relative min-h-screen bg-black">
      {/* Navbar is fixed/sticky usually, so it sits on top */}
      <Navbar authButton={authElement} />
      
      {/* HeroScroll handles its own internal loading state for the image sequence */}
      <HeroScroll totalFrames={120} />
      
      <section className="relative z-10 bg-black">
        {/* Additional content goes here */}
      </section>
    </main>
  );
}