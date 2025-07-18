export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 space-y-6 bg-card/80 backdrop-blur-sm rounded-lg shadow-lg border border-primary/20 w-full animate-in fade-in-50 duration-500">
      <div className="relative w-24 h-24">
        <svg
          className="w-full h-full animate-spin-slow text-primary"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeDasharray="283"
            strokeDashoffset="212"
            strokeLinecap="round"
          />
        </svg>
        <svg
          className="w-20 h-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin-reverse-slow text-accent"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeDasharray="283"
            strokeDashoffset="212"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <p className="font-headline text-lg italic text-muted-foreground max-w-xs">
        "Offer your sankalpa and gently enter meditation during puja."
      </p>
    </div>
  );
}
