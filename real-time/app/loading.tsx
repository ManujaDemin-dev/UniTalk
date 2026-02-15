export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-black">
      {/* A simple, cinematic spinner to match your dark theme */}
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/10 border-t-white" />
    </div>
  );
}