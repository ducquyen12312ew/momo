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
import PromotionsScreen from "@/components/PromotionsScreen";
import ProfileScreen from "@/components/ProfileScreen";
import QRCodeScreen from "@/components/QRCodeScreen";
import FeatureDemoScreen from "@/components/FeatureDemoScreen";
import TransferScreen from "@/components/TransferScreen";
import TopupScreen from "@/components/TopupScreen";
import BillScreen from "@/components/BillScreen";
import MovieScreen from "@/components/MovieScreen";

type Screen =
  | "home" | "pin" | "loading" | "loan"
  | "loanOverview" | "loanDetail"
  | "paymentAmount" | "securePayment"
  | "paymentPin" | "paymentLoading" | "transactionSuccess"
  | "history" | "transactionReceipt"
  | "promotions" | "profile" | "qrcode"
  | "transfer" | "topup" | "data" | "bill" | "movie"
  | "featureDemo";

interface FeatureDemoMeta { title: string; description?: string }

function generateTxId(): string {
  return String(Math.floor(10000000000 + Math.random() * 90000000000));
}

const TX_AMOUNT = "3.683.000đ";

const SERVICE_SCREEN_MAP: Record<string, Screen | null> = {
  transfer: "transfer",
  bill: "bill",
  topup: "topup",
  data: "data",
  movie: "movie",
  loan: "pin",
  "travel-finance": "featureDemo",
  gold: "featureDemo",
  paylater: "featureDemo",
  toll: "featureDemo",
  more: "featureDemo",
};

const SERVICE_DEMO_META: Record<string, FeatureDemoMeta> = {
  "travel-finance": { title: "Tài Chính Du Ký", description: "Quản lý tài chính du lịch thông minh sẽ sớm ra mắt." },
  gold: { title: "Túi Thần Tài", description: "Tích lũy vàng và nhận lộc mỗi ngày với Túi Thần Tài." },
  paylater: { title: "Ví Trả Sau", description: "Mua trước, trả sau với hạn mức lên đến 10 triệu đồng." },
  toll: { title: "Thu phí không dừng", description: "Thanh toán phí đường bộ tự động, không cần dừng xe." },
  more: { title: "Xem thêm dịch vụ", description: "Khám phá hơn 50 dịch vụ tiện ích trên MoMo." },
  "chuyen-tien": { title: "Chuyển Tiền" },
  "nap-tien-dien-thoai": { title: "Nạp Tiền Điện Thoại" },
  "thanh-toan-hoa-don": { title: "Thanh Toán Hóa Đơn" },
  "du-lich": { title: "Du Lịch", description: "Đặt vé máy bay, phòng khách sạn và tour du lịch." },
  "internet-4g-5g": { title: "Data 4G/5G" },
};

export default function Home() {
  const [screen, setScreen] = useState<Screen>("home");
  const [activeTab, setActiveTab] = useState("home");
  const [txTime, setTxTime] = useState<Date>(new Date());
  const [txId, setTxId] = useState<string>("");
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [featureMeta, setFeatureMeta] = useState<FeatureDemoMeta>({ title: "" });
  const { markAsPaid } = usePayment();

  const goHome = useCallback(() => {
    setScreen("home");
    setActiveTab("home");
  }, []);

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

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab);
    if (tab === "home") setScreen("home");
    else if (tab === "gift") setScreen("promotions");
    else if (tab === "qr") setScreen("qrcode");
    else if (tab === "history") setScreen("history");
    else if (tab === "user") setScreen("profile");
  }, []);

  const handleServiceClick = useCallback((id: string) => {
    const target = SERVICE_SCREEN_MAP[id];
    if (!target) return;
    if (target === "featureDemo") {
      setFeatureMeta(SERVICE_DEMO_META[id] ?? { title: id });
      setScreen("featureDemo");
    } else {
      setScreen(target);
    }
  }, []);

  const handleSearchServiceClick = useCallback((id: string) => {
    const screenMap: Record<string, Screen> = {
      "chuyen-tien": "transfer",
      "nap-tien-dien-thoai": "topup",
      "thanh-toan-hoa-don": "bill",
      "internet-4g-5g": "data",
      "du-lich": "featureDemo",
    };
    const target = screenMap[id];
    if (target) {
      if (target === "featureDemo") {
        setFeatureMeta(SERVICE_DEMO_META[id] ?? { title: id });
      }
      setScreen(target);
    }
  }, []);

  /* ── Loan auth PIN ── */
  if (screen === "pin")
    return <PinScreen onSuccess={() => setScreen("loading")} onBack={goHome} />;

  if (screen === "loading")
    return <LoadingScreen onComplete={() => setScreen("loan")} />;

  if (screen === "loan")
    return <LoanScreen onBack={goHome} onStart={() => setScreen("loanOverview")} onHome={goHome} />;

  if (screen === "loanOverview")
    return <LoanOverviewScreen onBack={() => setScreen("loan")} onViewDetail={() => setScreen("loanDetail")} onHome={goHome} />;

  if (screen === "loanDetail")
    return <LoanDetailScreen onBack={() => setScreen("loanOverview")} onPayment={() => setScreen("paymentAmount")} onHome={goHome} />;

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

  if (screen === "transactionReceipt" && selectedTx)
    return <TransactionReceiptScreen tx={selectedTx} onBack={() => setScreen("history")} />;

  /* ── Tab screens ── */
  if (screen === "history")
    return (
      <>
        <HistoryScreen onBack={goHome} onViewTransaction={handleViewTransaction} />
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      </>
    );

  if (screen === "promotions")
    return (
      <>
        <PromotionsScreen onBack={goHome} />
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      </>
    );

  if (screen === "profile")
    return (
      <>
        <ProfileScreen onBack={goHome} />
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      </>
    );

  if (screen === "qrcode")
    return (
      <>
        <QRCodeScreen onBack={goHome} />
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      </>
    );

  /* ── Service screens ── */
  if (screen === "transfer")
    return <TransferScreen onBack={goHome} />;

  if (screen === "topup")
    return <TopupScreen onBack={goHome} />;

  if (screen === "data")
    return <TopupScreen onBack={goHome} isData />;

  if (screen === "bill")
    return <BillScreen onBack={goHome} />;

  if (screen === "movie")
    return <MovieScreen onBack={goHome} />;

  if (screen === "featureDemo")
    return <FeatureDemoScreen title={featureMeta.title} description={featureMeta.description} onBack={goHome} />;

  /* ── Home ── */
  return (
    <main className="min-h-screen bg-white pb-[80px]">
      <Header />
      <QuickActions />
      <WalletCard />
      <SearchBar
        onVayNhanhClick={() => setScreen("pin")}
        onServiceClick={handleSearchServiceClick}
      />
      <div className="h-2 bg-[#F5F5F5] my-1" />
      <ServiceGrid onServiceClick={handleServiceClick} />
      <div className="h-2 bg-[#F5F5F5] my-1" />
      <BannerSection />
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </main>
  );
}
