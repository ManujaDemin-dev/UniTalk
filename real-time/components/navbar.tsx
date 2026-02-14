"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar({ authButton }: { authButton: React.ReactNode }) {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "circOut" }}
      className="fixed top-0 left-0 w-full z-[100] flex justify-between items-center px-8 md:px-16 h-24 bg-transparent"
    >
      {/* Logo Section */}
      <div className="flex items-center gap-3 group cursor-pointer">
        <div className="relative w-6 h-6">
        </div>
        <span className="font-black italic text-white text-2xl tracking-tighter uppercase">
          UniTalk
        </span>
      </div>

      {/* Navigation Links - Hidden on Mobile */}
      <div className="hidden md:flex items-center gap-12">
        {['Features', 'Universities', 'About'].map((item) => (
          <Link 
            key={item} 
            href={`#${item.toLowerCase()}`}
            className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 hover:text-orange-500 transition-colors duration-300"
          >
            {item}
          </Link>
        ))}
      </div>

      {/* Auth Action Section */}
      <div className="flex items-center gap-4">
        <div className="h-4 w-[1px] bg-white/20 mr-4 hidden sm:block" />
        <div className="scale-90 md:scale-100">
           {/* This passes your existing Supabase AuthButton through */}
          {authButton}
        </div>
      </div>
    </motion.nav>
  );
}