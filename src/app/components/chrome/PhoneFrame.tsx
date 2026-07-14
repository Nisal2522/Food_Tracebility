import type { ReactNode } from "react";

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full items-start justify-center bg-gray-100 py-10">
      <div
        className="relative flex-none overflow-hidden rounded-[3rem] border-[10px] border-gray-900 bg-gray-900 shadow-2xl"
        style={{ width: 393, height: 852, transform: "translateZ(0)" }}
      >
        <div className="absolute left-1/2 top-0 z-50 h-7 w-36 -translate-x-1/2 rounded-b-2xl bg-gray-900" />
        <div className="h-full w-full overflow-y-auto overflow-x-hidden rounded-[2.25rem] bg-[#f8faf8]">
          {children}
        </div>
      </div>
    </div>
  );
}
