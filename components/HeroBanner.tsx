import SafeImage from "./SafeImage";

export default function HeroBanner() {
  return (
    <div className="px-4 pt-1 pb-2">
      <div
        className="relative rounded-[24px] overflow-hidden"
        style={{
          height: 170,
          boxShadow: "0 8px 28px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
        }}
      >
        <SafeImage
          src="/image/herobanner.jpg"
          alt="MoMo Banner"
          width={358}
          height={170}
          className="w-full h-full object-cover"
        />
        {/* Subtle vignette overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.15) 100%)",
          }}
        />
      </div>
    </div>
  );
}
