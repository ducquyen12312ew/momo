import Header from "@/components/Header";
import QuickActions from "@/components/QuickActions";
import WalletCard from "@/components/WalletCard";
import SearchBar from "@/components/SearchBar";
import ServiceGrid from "@/components/ServiceGrid";
import BannerSection from "@/components/BannerSection";
import BottomNav from "@/components/BottomNav";

export default function Home() {
  return (
    <main className="min-h-screen bg-white pb-[80px]">
      {/* Header with gradient */}
      <Header />

      {/* Quick actions */}
      <QuickActions />

      {/* Wallet card */}
      <WalletCard />

      {/* Search bar */}
      <SearchBar />

      {/* Divider */}
      <div className="h-2 bg-[#F5F5F5] mx-0 my-1" />

      {/* Service grid */}
      <ServiceGrid />

      {/* Divider */}
      <div className="h-2 bg-[#F5F5F5] mx-0 my-1" />

      {/* Banner section */}
      <BannerSection />

      {/* Bottom nav */}
      <BottomNav />
    </main>
  );
}
