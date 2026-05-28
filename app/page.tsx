"use client";
import { useState, useCallback } from "react";
import { usePayment } from "@/contexts/PaymentContext";
import { Transaction } from "@/contexts/PaymentContext";
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
import TransactionReceiptScreen from "@/components/TransactionReceiptScreen";

type Screen =
  | "home" | "pin" | "loading" | "loan"
  | "loanOverview" | "loanDetail"
  | "paymentAmount" | "securePayment"
  | "paymentPin" | "paymentLoading" | "transactionSuccess"
  | "history" | "transactionReceipt";

function generateTxId(): string {
  return String(Math.floor(10000000000 + Math.random() * 90000000000));
}

const TX_AMOUNT = "3.683.000đ";
const HOME: Screen = "home";

export default function Home() {
  const [screen, setScreen] = useState<Screen>(HOME);
  const [txTime, setTxTime] = useState<Date>(new Date());
  const [txId, setTxId] = useState<string>("");
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const { markAsPaid } = usePayment();

  const goHome = useCallback(() => setScreen(HOME), []);

  const handlePaymentPinSuccess = useCallback(() => {
    const time = new Date();
    const id = generateTxId();
    setTxTime(time);
    setTxId(id);
    markAsPaid(id, TX_AMOUNT, time);
    setScreen("paymentLoading");
  }, [markAsPaid]);

  const handleViewTransaction = useCallback((tx: Transaction) => {
    if (tx.isLoan) {
      setScreen("transactionSuccess");
    } else {
      setSelectedTx(tx);
      setScreen("transactionReceipt");
    }
  }, []);

  /* ── Loan auth PIN ── */
  if (screen === "pin")
    return <PinScreen onSuccess={() => setScreen("loading")} onBack={goHome} />;

  if (screen === "loading")
    return <LoadingScreen onComplete={() => setScreen("loan")} />;

  /* ── Loan intro ── */
  if (screen === "loan")
    return <LoanScreen onBack={goHome} onStart={() => setScreen("loanOverview")} onHome={goHome} />;

  /* ── Loan flow ── */
  if (screen === "loanOverview")
    return <LoanOverviewScreen onBack={() => setScreen("loan")} onViewDetail={() => setScreen("loanDetail")} onHome={goHome} />;

  if (screen === "loanDetail")
    return <LoanDetailScreen onBack={() => setScreen("loanOverview")} onPayment={() => setScreen("paymentAmount")} onHome={goHome} />;

  /* ── Payment flow ── */
  if (screen === "paymentAmount")
    return <PaymentAmountScreen onBack={() => setScreen("loanDetail")} onPay={() => setScreen("securePayment")} onHome={goHome} />;

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
    return <TransactionSuccessScreen onBack={goHome} amount={TX_AMOUNT} txTime={txTime} txId={txId} />;

  /* ── History ── */
  if (screen === "history")
    return <HistoryScreen onBack={goHome} onViewTransaction={handleViewTransaction} />;

  if (screen === "transactionReceipt" && selectedTx)
    return <TransactionReceiptScreen tx={selectedTx} onBack={() => setScreen("history")} />;

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
