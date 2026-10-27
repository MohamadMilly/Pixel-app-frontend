import type { ReactNode } from "react";

export function PageContainer({ children }: { children: ReactNode }) {
  return (
    <main dir="rtl" className="mx-auto w-full px-4 py-7 sm:px-6 sm:py-12">
      <div className="mx-auto w-full max-w-7xl">{children}</div>
    </main>
  );
}
