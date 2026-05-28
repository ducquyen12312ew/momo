"use client";
import { useState } from "react";

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}

export default function SafeImage({ src, alt, className, width, height, style }: SafeImageProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className={`bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs ${className}`}
        style={{ width, height, ...style }}
      >
        {alt[0]?.toUpperCase() ?? "?"}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      style={style}
      onError={() => setError(true)}
    />
  );
}
