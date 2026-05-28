import SafeImage from "./SafeImage";

export default function BannerSection() {
  return (
    <div className="px-4 py-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[14px] font-bold text-[#333333]">Sự kiện đang diễn ra</span>
        <button className="text-[12px] text-[#EC407A] font-medium">Xem thêm</button>
      </div>
      <div className="rounded-[16px] overflow-hidden" style={{ height: 110 }}>
        <SafeImage
          src="/images/banner-event.svg"
          alt="Sự kiện"
          className="w-full h-full object-cover"
          width={358}
          height={110}
        />
      </div>
    </div>
  );
}
