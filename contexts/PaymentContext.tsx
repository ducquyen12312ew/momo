"use client";
import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

export interface Transaction {
  id: string;
  type: string;
  amount: string;
  time: string; // ISO
  icon: string;
  isLoan?: boolean;
}

interface PaymentState {
  isPaid: boolean;
  loanTransactions: Transaction[]; // real loan payments
}

interface PaymentContextType {
  isPaid: boolean;
  transactions: Transaction[]; // all = loanTransactions + FAKE_HISTORY
  markAsPaid: (txId: string, amount: string, time: Date) => void;
}

const STORAGE_KEY = "momo-loan-payment-state";
const DEFAULT_STATE: PaymentState = { isPaid: false, loanTransactions: [] };

// 15 fake pre-existing transactions — 8-10 days apart, Data 4G & Nạp tiền
const FAKE_HISTORY: Transaction[] = [
  { id:"h1",  type:"Data 4G/5G",             amount:"-80.000đ",  time:"2026-04-20T10:30:00.000Z", icon:"/image/data4g.png" },
  { id:"h2",  type:"Nạp tiền điện thoại",    amount:"-100.000đ", time:"2026-04-10T09:00:00.000Z", icon:"/image/naptiendienthoai.png" },
  { id:"h3",  type:"Data 4G/5G",             amount:"-80.000đ",  time:"2026-04-01T14:20:00.000Z", icon:"/image/data4g.png" },
  { id:"h4",  type:"Nạp tiền điện thoại",    amount:"-50.000đ",  time:"2026-03-23T08:45:00.000Z", icon:"/image/naptiendienthoai.png" },
  { id:"h5",  type:"Data 4G/5G",             amount:"-100.000đ", time:"2026-03-13T11:10:00.000Z", icon:"/image/data4g.png" },
  { id:"h6",  type:"Nạp tiền điện thoại",    amount:"-100.000đ", time:"2026-03-04T16:30:00.000Z", icon:"/image/naptiendienthoai.png" },
  { id:"h7",  type:"Data 4G/5G",             amount:"-80.000đ",  time:"2026-02-23T09:50:00.000Z", icon:"/image/data4g.png" },
  { id:"h8",  type:"Nạp tiền điện thoại",    amount:"-200.000đ", time:"2026-02-14T13:00:00.000Z", icon:"/image/naptiendienthoai.png" },
  { id:"h9",  type:"Data 4G/5G",             amount:"-80.000đ",  time:"2026-02-05T10:20:00.000Z", icon:"/image/data4g.png" },
  { id:"h10", type:"Nạp tiền điện thoại",    amount:"-100.000đ", time:"2026-01-26T08:00:00.000Z", icon:"/image/naptiendienthoai.png" },
  { id:"h11", type:"Data 4G/5G",             amount:"-80.000đ",  time:"2026-01-17T15:40:00.000Z", icon:"/image/data4g.png" },
  { id:"h12", type:"Nạp tiền điện thoại",    amount:"-50.000đ",  time:"2026-01-08T09:15:00.000Z", icon:"/image/naptiendienthoai.png" },
  { id:"h13", type:"Data 4G/5G",             amount:"-100.000đ", time:"2025-12-29T12:30:00.000Z", icon:"/image/data4g.png" },
  { id:"h14", type:"Nạp tiền điện thoại",    amount:"-100.000đ", time:"2025-12-19T10:00:00.000Z", icon:"/image/naptiendienthoai.png" },
  { id:"h15", type:"Data 4G/5G",             amount:"-80.000đ",  time:"2025-12-10T14:50:00.000Z", icon:"/image/data4g.png" },
];

const PaymentContext = createContext<PaymentContextType>({
  isPaid: false,
  transactions: FAKE_HISTORY,
  markAsPaid: () => {},
});

export function PaymentProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PaymentState>(DEFAULT_STATE);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setState(JSON.parse(raw) as PaymentState);
    } catch {}
  }, []);

  const markAsPaid = useCallback((txId: string, amount: string, time: Date) => {
    const tx: Transaction = {
      id: txId,
      type: "Thanh toán vay nhanh",
      amount: `-${amount}`,
      time: time.toISOString(),
      icon: "/image/vay.png",
      isLoan: true,
    };
    setState((prev) => {
      const next: PaymentState = {
        isPaid: true,
        loanTransactions: [tx, ...prev.loanTransactions],
      };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  // Expose: real loan payments first, then fake history
  const allTransactions = [...state.loanTransactions, ...FAKE_HISTORY];

  return (
    <PaymentContext.Provider value={{ isPaid: state.isPaid, transactions: allTransactions, markAsPaid }}>
      {children}
    </PaymentContext.Provider>
  );
}

export function usePayment() {
  return useContext(PaymentContext);
}
