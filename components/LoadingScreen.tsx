"use client";
import { useState, useEffect, useRef } from "react";
import SafeImage from "./SafeImage";

const WAYPOINTS = [
  { progress: 10, duration: 800 },
  { progress: 25, duration: 700 },
  { progress: 67, duration: 1500 },
  { progress: 100, duration: 2000 },
];

const MESSAGES = [
  { min: 0, max: 20, text: "Đang xác minh thông tin" },
  { min: 20, max: 40, text: "Kiểm tra lịch sử giao dịch" },
  { min: 40, max: 60, text: "Đánh giá điều kiện vay" },
  { min: 60, max: 80, text: "Chuẩn bị hạn mức phù hợp" },
  { min: 80, max: 101, text: "Hoàn tất xác thực" },
];

function getMessage(p: number) {
  return MESSAGES.find((m) => p >= m.min && p < m.max)?.text ?? "Hoàn tất xác thực";
}

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const doneRef = useRef(false);

  useEffect(() => {
    let current = 0;
    let wpIndex = 0;

    const step = () => {
      if (wpIndex >= WAYPOINTS.length) return;
      const { progress: target, duration } = WAYPOINTS[wpIndex];
      const steps = target - current;
      const interval = duration / steps;

      let count = 0;
      const timer = setInterval(() => {
        count++;
        const next = current + count;
        setProgress(next);
        if (count >= steps) {
          clearInterval(timer);
          current = target;
          wpIndex++;
          if (current >= 100) {
            if (!doneRef.current) {
              doneRef.current = true;
              setTimeout(onComplete, 350);
            }
          } else {
            step();
          }
        }
      }, interval);
    };

    step();
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-8 animate-screenIn">
      {/* Icon */}
      <div className="w-20 h-20 rounded-2xl overflow-hidden mb-6 bg-[#FCE4EC] flex items-center justify-center">
        <SafeImage
          src="/image/search/loan-fast.svg"
          alt="Vay Nhanh"
          width={56}
          height={56}
          className="w-14 h-14"
        />
      </div>

      <h2 className="text-[20px] font-bold text-[#222222] mb-1">Vay Nhanh</h2>

      {/* Message */}
      <p
        key={getMessage(progress)}
        className="text-[14px] text-[#EC407A] font-medium mb-8 min-h-[22px] text-center animate-fadeSlideIn"
      >
        {getMessage(progress)}
      </p>

      {/* Progress bar */}
      <div className="w-full max-w-[280px] h-[6px] bg-[#F5F5F5] rounded-full overflow-hidden mb-3">
        <div
          className="h-full bg-gradient-to-r from-[#EC407A] to-[#FF6FA3] rounded-full transition-all duration-150 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-[13px] font-semibold text-[#AAAAAA]">{progress}%</p>

      {/* Dots */}
      <div className="flex gap-2 mt-10">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-[#EC407A]"
            style={{
              opacity: progress > i * 33 ? 1 : 0.3,
              transform: progress > i * 33 ? "scale(1.2)" : "scale(1)",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}
