"use client";
import { useState, useCallback } from "react";
import { usePayment } from "@/contexts/PaymentContext";
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
import PaymentAmountScreen from "@/components/PaymentAmountScreen";
import SecurePaymentScreen from "@/components/SecurePaymentScreen";
import PaymentLoadingScreen from "@/components/PaymentLoadingScreen";
import TransactionSuccessScreen from "@/components/TransactionSuccessScreen";
import HistoryScreen from "@/components/HistoryScreen";

type Screen =
  | "home" | "pin" | "loading" | "loan"
  | "loanOverview" | "loanDetail"
  | "paymentAmount" | "securePayment"
  | "paymentPin" | "paymentLoading" | "transactionSuccess"
  | "history";

function generateTxId(): string {
  return String(Math.floor(10000000000 + Math.random() * 90000000000));
}

const TX_AMOUNT = "3.683.000đ";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("home");
  const [txTime, setTxTime] = useState<Date>(new Date());
  const [txId, setTxId] = useState<string>("");
  const { markAsPaid } = usePayment();

  const handlePaymentPinSuccess = useCallback(() => {
    const time = new Date();
    const id = generateTxId();
    setTxTime(time);
    setTxId(id);
    markAsPaid(id, TX_AMOUNT, time);
    setScreen("paymentLoading");
  }, [markAsPaid]);

  /* ── Loan auth PIN ── */
  if (screen === "pin")
    return <PinScreen onSuccess={() => setScreen("loading")} onBack={() => setScreen("home")} />;

  if (screen === "loading")
    return <LoadingScreen onComplete={() => setScreen("loan")} />;

  /* ── Loan intro ── */
  if (screen === "loan")
    return <LoanScreen onBack={() => setScreen("home")} onStart={() => setScreen("loanOverview")} />;

  /* ── Loan flow ── */
  if (screen === "loanOverview")
    return <LoanOverviewScreen onBack={() => setScreen("loan")} onViewDetail={() => setScreen("loanDetail")} />;

  if (screen === "loanDetail")
    return <LoanDetailScreen onBack={() => setScreen("loanOverview")} onPayment={() => setScreen("paymentAmount")} />;

  /* ── Payment flow ── */
  if (screen === "paymentAmount")
    return <PaymentAmountScreen onBack={() => setScreen("loanDetail")} onPay={() => setScreen("securePayment")} />;

  if (screen === "securePayment")
    return <SecurePaymentScreen onBack={() => setScreen("paymentAmount")} onConfirm={() => setScreen("paymentPin")} />;

  if (screen === "paymentPin")
    return (
      <PinScreen
        title="Xác thực thanh toán"
        subtitle="Nhập mã PIN để tiếp tục"
        onSuccess={handlePaymentPinSuccess}
        onBack={() => setScreen("securePayment")}
      />
    );

  if (screen === "paymentLoading")
    return <PaymentLoadingScreen onComplete={() => setScreen("transactionSuccess")} />;

  if (screen === "transactionSuccess")
    return (
      <TransactionSuccessScreen
        onBack={() => setScreen("home")}
        amount={TX_AMOUNT}
        txTime={txTime}
        txId={txId}
      />
    );

  /* ── History ── */
  if (screen === "history")
    return <HistoryScreen onBack={() => setScreen("home")} />;

  /* ── Home ── */
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
      <BottomNav onHistoryClick={() => setScreen("history")} />
    </main>
  );
}
