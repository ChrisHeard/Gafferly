import Link from "next/link";

export function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="Gafferly home">
      <span className={`grid h-9 w-9 place-items-center rounded-xl text-lg font-black ${inverse ? "bg-white text-[#132e3c]" : "bg-[#132e3c] text-white"}`}>G</span>
      <span className={`text-lg font-bold tracking-tight ${inverse ? "text-white" : "text-[#132e3c]"}`}>Gafferly</span>
    </Link>
  );
}
