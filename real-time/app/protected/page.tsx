import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

async function UserDetails() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    redirect("/auth/login");
  }
  return data.claims;
}

export default async function ProtectedPage() {
  await UserDetails();

  return (
    <div className="relative min-h-screen w-full bg-slate-50 overflow-hidden font-sans">
      {/* 1. THE FULL-SCREEN BACKGROUND TILES */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      {/* 2. THE PURPLE/BLUE GRADIENT BLUR (Inspiration from image) */}
      <div className="absolute -bottom-[10%] -left-[10%] w-[60%] h-[60%] bg-purple-400/30 blur-[120px] rounded-full z-0"></div>
      <div className="absolute top-[10%] right-[5%] w-[30%] h-[30%] bg-blue-400/20 blur-[100px] rounded-full z-0"></div>

      {/* 3. MAIN CONTENT CONTAINER */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-4xl">
          
          {/* Header Section */}
          <div className="mb-12">
            <p className="text-blue-900 font-bold tracking-[0.2em] uppercase text-xs mb-3">
              Design Resources & Dashboard
            </p>
            <h1 className="text-7xl md:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter">
              Thank <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">You!</span>
            </h1>
            <div className="mt-6 flex items-center gap-3">
               <span className="text-slate-500 font-medium text-lg">Manage Your Account</span>
               <div className="bg-blue-600 text-white rounded-full p-1 shadow-lg shadow-blue-200">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
               </div>
            </div>
          </div>

          {/* Action Cards Grid - Full Width Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/profile" className="group relative overflow-hidden p-8 bg-white/40 backdrop-blur-md border border-white/60 rounded-3xl shadow-2xl shadow-slate-200/50 transition-all hover:-translate-y-2 hover:bg-white/60">
              <div className="flex flex-col h-full justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-slate-800">Create/Edit Profile</h3>
                  <p className="text-slate-500 mt-2">Personalize your digital space and resources.</p>
                </div>
                <div className="mt-8 flex items-center justify-between">
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs font-mono font-bold">/profile</span>
                  <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white group-hover:bg-purple-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/chat" className="group relative overflow-hidden p-8 bg-slate-900 rounded-3xl shadow-2xl shadow-slate-900/20 transition-all hover:-translate-y-2 hover:shadow-blue-500/20">
              <div className="flex flex-col h-full justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white">Join Public Chat</h3>
                  <p className="text-slate-400 mt-2">Connect with the community in real-time.</p>
                </div>
                <div className="mt-8 flex items-center justify-between">
                  <span className="px-3 py-1 bg-white/10 text-white/70 rounded-lg text-xs font-mono font-bold">//chat</span>
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a.75.75 0 0 1-1.074-.865 5.25 5.25 0 0 0 .832-2.583C3.344 15.723 2 13.988 2 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Footer */}
          <footer className="mt-16 flex justify-between items-center border-t border-slate-200 pt-8">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Secure Access</p>
              <p className="text-xs text-slate-500 font-bold">Powered by Supabase</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400 font-medium">Design Inspiration Sources</p>
              <p className="text-[10px] text-blue-500 font-bold uppercase">Beyond Instagram</p>
            </div>
          </footer>

        </div>
      </main>
    </div>
  );
}