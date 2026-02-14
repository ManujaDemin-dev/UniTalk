import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-950 px-6 py-24 sm:py-32 lg:px-8">
      {/* Background Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-600 rounded-full blur-[120px] opacity-20 pointer-events-none"></div>

      <div className="text-center relative z-10">
        <p className="text-sm font-bold tracking-widest text-blue-500 uppercase">
          Error 404
        </p>
        
        <h1 className="mt-4 text-5xl font-extrabold tracking-tight text-white sm:text-7xl">
          Page not found
        </h1>
        
        <p className="mt-6 text-lg leading-7 text-slate-400 max-w-md mx-auto">
          Sorry, we couldn’t find the page you’re looking for. Perhaps it’s been moved, or it never existed in this dimension.
        </p>
        
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/"
            className="rounded-full bg-blue-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/20 hover:bg-blue-500 hover:scale-105 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Go back home
          </Link>
          
          <Link href="https://youtu.be/dQw4w9WgXcQ?si=2mQKI3s6FrjIoZk6" className="text-sm font-semibold text-red-300 hover:text-white transition-colors">
            Don't Do Sus Stuff<span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </main>
  );
}