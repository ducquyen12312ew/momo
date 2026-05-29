"use client";
import { useState } from "react";

interface MovieScreenProps {
  onBack: () => void;
}

const MOVIES = [
  { id: "m1", title: "Avengers: Secret Wars", genre: "Hành động · Khoa học viễn tưởng", rating: 9.1, duration: "160 phút", img: "🦸", color: "#E53935" },
  { id: "m2", title: "Inside Out 3", genre: "Hoạt hình · Gia đình", rating: 8.7, duration: "110 phút", img: "🎭", color: "#FF9800" },
  { id: "m3", title: "The Batman 2", genre: "Hành động · Tội phạm", rating: 8.9, duration: "175 phút", img: "🦇", color: "#1A237E" },
  { id: "m4", title: "Interstellar 2", genre: "Khoa học viễn tưởng · Drama", rating: 9.3, duration: "190 phút", img: "🚀", color: "#1565C0" },
];

const TIMES = ["10:00", "12:30", "15:00", "17:30", "20:00", "22:15"];
const DATES = ["T3 29/5", "T4 30/5", "T5 31/5", "T6 01/6", "T7 02/6"];

export default function MovieScreen({ onBack }: MovieScreenProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedTime, setSelectedTime] = useState("");

  const movie = MOVIES.find((m) => m.id === selected);

  if (selected && movie) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex flex-col animate-slideUp">
        <div
          className="flex-shrink-0 pb-6"
          style={{ background: `linear-gradient(135deg, ${movie.color}, ${movie.color}99)` }}
        >
          <div className="flex items-center gap-3 px-4 pt-14 pb-4">
            <button onClick={() => setSelected(null)} className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center active:bg-white/30">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <h1 className="text-[18px] font-bold text-white flex-1 truncate">{movie.title}</h1>
          </div>
          <div className="flex items-center gap-4 px-4">
            <div className="w-20 h-28 rounded-2xl bg-white/20 flex items-center justify-center text-[40px] flex-shrink-0">
              {movie.img}
            </div>
            <div>
              <p className="text-white/80 text-[12px] mb-1">{movie.genre}</p>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-yellow-300 text-[14px]">★</span>
                <span className="text-white font-bold text-[16px]">{movie.rating}</span>
              </div>
              <p className="text-white/70 text-[12px]">{movie.duration}</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pt-4 pb-8 space-y-4">
          {/* Date select */}
          <div className="bg-white rounded-3xl p-4" style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
            <p className="text-[12px] font-semibold text-[#AAAAAA] uppercase mb-3">Chọn ngày</p>
            <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
              {DATES.map((d, i) => (
                <button
                  key={d}
                  onClick={() => setSelectedDate(i)}
                  className={`flex-shrink-0 px-4 py-2.5 rounded-2xl text-[13px] font-semibold transition-all ${
                    selectedDate === i ? "text-white" : "bg-[#F5F5F5] text-[#555]"
                  }`}
                  style={selectedDate === i ? { background: movie.color } : {}}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Time select */}
          <div className="bg-white rounded-3xl p-4" style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
            <p className="text-[12px] font-semibold text-[#AAAAAA] uppercase mb-3">Chọn suất chiếu</p>
            <div className="grid grid-cols-3 gap-2">
              {TIMES.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTime(t)}
                  className={`py-3 rounded-2xl text-[14px] font-semibold transition-all active:scale-95 ${
                    selectedTime === t ? "text-white" : "bg-[#F5F5F5] text-[#333]"
                  }`}
                  style={selectedTime === t ? { background: movie.color } : {}}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Cinema */}
          <div className="bg-white rounded-3xl p-4" style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
            <p className="text-[12px] font-semibold text-[#AAAAAA] uppercase mb-3">Rạp chiếu</p>
            {["CGV Vincom Center", "Lotte Cinema Landmark", "BHD Star Bitexco"].map((cinema) => (
              <button key={cinema} className="flex items-center gap-3 w-full py-2.5 active:bg-[#F5F5F5] transition-colors rounded-xl">
                <div className="w-2 h-2 rounded-full bg-[#EC407A]" />
                <span className="text-[14px] text-[#333]">{cinema}</span>
              </button>
            ))}
          </div>

          <button
            disabled={!selectedTime}
            onClick={() => alert("Tính năng đặt vé đang phát triển!")}
            className="w-full py-4 rounded-3xl text-white text-[15px] font-bold transition-all active:scale-98 disabled:opacity-40"
            style={{ background: selectedTime ? `linear-gradient(135deg, ${movie.color}, ${movie.color}CC)` : "#CCC" }}
          >
            Đặt vé {selectedTime ? `• ${selectedTime}` : ""}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col animate-slideUp">
      <div
        className="flex-shrink-0"
        style={{ background: "linear-gradient(135deg, #E53935, #B71C1C)" }}
      >
        <div className="flex items-center gap-3 px-4 pt-14 pb-5">
          <button onClick={onBack} className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center active:bg-white/30">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <h1 className="text-[20px] font-bold text-white flex-1">Mua vé xem phim</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-8">
        <p className="text-[12px] font-semibold text-[#AAAAAA] uppercase mb-3 px-1">Đang chiếu</p>
        <div className="space-y-3">
          {MOVIES.map((movie) => (
            <button
              key={movie.id}
              onClick={() => setSelected(movie.id)}
              className="w-full bg-white rounded-3xl p-4 flex items-center gap-4 text-left active:scale-98 transition-all"
              style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}
            >
              <div
                className="w-16 h-20 rounded-2xl flex items-center justify-center text-[32px] flex-shrink-0"
                style={{ background: movie.color + "20" }}
              >
                {movie.img}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[15px] font-bold text-[#222] leading-tight">{movie.title}</p>
                <p className="text-[12px] text-[#AAAAAA] mt-0.5">{movie.genre}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-yellow-400 text-[12px]">★</span>
                  <span className="text-[13px] font-semibold text-[#444]">{movie.rating}</span>
                  <span className="text-[#DDDDDD]">·</span>
                  <span className="text-[12px] text-[#888]">{movie.duration}</span>
                </div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M9 18l6-6-6-6" stroke="#DDDDDD" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
