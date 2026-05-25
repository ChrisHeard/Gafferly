import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function ButtonLink({ href, children, variant = "primary", className }: { href: string; children: ReactNode; variant?: "primary" | "secondary" | "ghost"; className?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex min-h-12 items-center justify-center rounded-xl px-5 py-3 text-sm font-bold transition",
        variant === "primary" && "bg-[#087f83] text-white hover:bg-[#096467]",
        variant === "secondary" && "border border-[#cedcdd] bg-white text-[#17323b] hover:border-[#087f83]",
        variant === "ghost" && "text-[#087f83] hover:bg-[#e6f0f0]",
        className,
      )}
    >
      {children}
    </Link>
  );
}

export function SectionTitle({ eyebrow, title, children }: { eyebrow?: string; title: string; children?: ReactNode }) {
  return (
    <div className="max-w-2xl">
      {eyebrow && <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-[#087f83]">{eyebrow}</p>}
      <h2 className="text-2xl font-bold tracking-tight text-[#132e3c] sm:text-3xl">{title}</h2>
      {children && <div className="mt-3 text-sm leading-6 text-[#50676d] sm:text-base">{children}</div>}
    </div>
  );
}

export function StatusPill({ status }: { status: string }) {
  const classes = status === "Deposit Paid" ? "bg-emerald-100 text-emerald-800" : status === "New" ? "bg-[#d7eeee] text-[#096467]" : status === "Quoted" || status === "Accepted" ? "bg-amber-100 text-amber-800" : "bg-slate-100 text-slate-700";
  return <span className={cn("inline-flex rounded-full px-3 py-1 text-xs font-bold", classes)}>{status}</span>;
}

export function DemoNotice() {
  return (
    <div className="border-b border-[#d5dfdf] bg-[#e6f0f0] px-4 py-2 text-center text-xs font-medium text-[#36545c]">
      Prototype demonstration — sample information only; no live customer data or payments.
    </div>
  );
}
