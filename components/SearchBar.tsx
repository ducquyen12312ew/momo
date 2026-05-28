import SafeImage from "./SafeImage";

export default function SearchBar() {
  return (
    <div className="px-4 py-2">
      <div className="flex items-center gap-2 bg-[#F5F5F5] rounded-[18px] h-[42px] px-3">
        <SafeImage
          src="/image/icon-search.png"
          alt="Tìm kiếm"
          width={18}
          height={18}
          className="w-[18px] h-[18px] flex-shrink-0"
        />
        <span className="text-[13px] text-[#AAAAAA] flex-1">
          Tìm số điện thoại chuyển tiền 📞
        </span>
      </div>
    </div>
  );
}
