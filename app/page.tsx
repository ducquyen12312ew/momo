"use client";
import { useState } from "react";
import Header from "@/components/Header";
import QuickActions from "@/components/QuickActions";
import WalletCard from "@/components/WalletCard";
import SearchBar from "@/components/SearchBar";
import ServiceGrid from "@/components/ServiceGrid";
import BannerSection from "@/components/BannerSection";
import BottomNav from "@/components/BottomNav";
import PinScreen from "@/components/PinScreen";
import LoadingScreen from "@/components/LoadingScreen";
import LoanScreen from "@/components/LoanScreen";
import LoanOverviewScreen from "@/components/LoanOverviewScreen";
import LoanDetailScreen from "@/components/LoanDetailScreen";

type Screen = "home" | "pin" | "loading" | "loan" | "loanOverview" | "loanDetail";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("home");

  if (screen === "pin") {
    return (
      <PinScreen
        onSuccess={() => setScreen("loading")}
        onBack={() => setScreen("home")}
      />
    );
  }

  if (screen === "loading") {
    return <LoadingScreen onComplete={() => setScreen("loan")} />;
  }

  if (screen === "loan") {
    return (
      <LoanScreen
        onBack={() => setScreen("home")}
        onStart={() => setScreen("loanOverview")}
      />
    );
  }

  if (screen === "loanOverview") {
    return (
      <LoanOverviewScreen
        onBack={() => setScreen("loan")}
        onViewDetail={() => setScreen("loanDetail")}
      />
    );
  }

  if (screen === "loanDetail") {
    return (
      <LoanDetailScreen
        onBack={() => setScreen("loanOverview")}
      />
    );
  }

  return (
    <main className="min-h-screen bg-white pb-[80px]">
      <Header />
      <QuickActions />
      <WalletCard />
      <SearchBar onVayNhanhClick={() => setScreen("pin")} />
      <div className="h-2 bg-[#F5F5F5] my-1" />
      <ServiceGrid />
      <div className="h-2 bg-[#F5F5F5] my-1" />
      <BannerSection />
      <BottomNav />
    </main>
  );
}
