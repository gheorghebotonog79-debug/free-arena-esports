export function ScanlineOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[60] opacity-[0.07] mix-blend-screen" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(255,106,0,0.16),transparent_68%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(0,230,255,0.24),transparent)] opacity-30" />
    </div>
  );
}
