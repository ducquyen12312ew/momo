import type { Metadata, Viewport } from "next";
import "./globals.css";
import { PaymentProvider } from "@/contexts/PaymentContext";

export const metadata: Metadata = {
  title: "MoMo - Ví Điện Tử",
  description: "Ví điện tử MoMo - Thanh toán nhanh, tiện lợi",
  icons: {
    icon: "/image/momo.png",
    apple: "/image/momo.png",
    shortcut: "/image/momo.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "MoMo",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="bg-[#F0F0F0] min-h-screen">
        <div className="mx-auto max-w-[390px] min-h-screen bg-white relative overflow-hidden shadow-xl">
          <PaymentProvider>{children}</PaymentProvider>
        </div>
      </body>
    </html>
  );
}
