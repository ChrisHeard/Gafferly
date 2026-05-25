export function DemoSurfacePhoto({ after = false }: { after?: boolean }) {
  return (
    <div className={`relative h-40 overflow-hidden rounded-2xl border ${after ? "border-[#b8d7d5] bg-[#eaf1ef]" : "border-[#d3d8d5] bg-[#cdd6cf]"}`}>
      <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-sky-100 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 grid grid-cols-5 gap-1 p-3">
        {Array.from({ length: 15 }).map((_, index) => (
          <span key={index} className={`h-7 rounded-sm border ${after ? "border-stone-300 bg-stone-200" : "border-stone-500/40 bg-stone-500/60"}`} />
        ))}
      </div>
      <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-bold ${after ? "bg-white text-[#087f83]" : "bg-[#132e3c]/75 text-white"}`}>{after ? "After" : "Before"}</span>
    </div>
  );
}

export function PhotoThumb({ index }: { index: number }) {
  return (
    <div className="relative h-28 overflow-hidden rounded-xl border border-[#d5dfdf] bg-[#dde5e3]">
      <div className="absolute bottom-2 left-2 rounded-md bg-white/95 px-2 py-1 text-xs font-semibold text-[#36545c]">Photo {index}</div>
      <div className="absolute inset-x-2 bottom-10 grid grid-cols-4 gap-1">
        {Array.from({ length: 8 }).map((_, i) => <span className="h-5 rounded-sm bg-stone-400/55" key={i} />)}
      </div>
    </div>
  );
}
