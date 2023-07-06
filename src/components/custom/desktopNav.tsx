export default function DesktopNav() {
  return (
    <>
      <div className="hidden flex-row items-center justify-between text-2xl font-bold text-white md:flex">
        <a href="/" className="mx-8">
          Home
        </a>
        <a href="/ask" className="mx-8">
          Ask
        </a>
        <a href="/" className="mx-8 blur">
          Generate
        </a>
        <a href="/" className="mx-8 blur">
          Explain
        </a>
      </div>
    </>
  );
}
