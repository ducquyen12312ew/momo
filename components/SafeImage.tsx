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
        className={className}
        style={{ width, height, background: "transparent", ...style }}
        aria-label={alt}
      />
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
