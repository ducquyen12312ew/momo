"use client";
import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

export interface Transaction {
  id: string;
  type: string;
  amount: string;
  time: string; // ISO
  icon: string;
  isLoan?: boolean;
  isReceive?: boolean;
}

interface PaymentState {
  isPaid: boolean;
  loanTransactions: Transaction[];
  receivedAmount: number | null;
  receivedTransactions: Transaction[];
}

interface PaymentContextType {
  isPaid: boolean;
  transactions: Transaction[];
  markAsPaid: (txId: string, amount: string, time: Date) => void;
  receivedAmount: number | null;
  markAsReceived: (amount: number, txId: string, time: Date) => void;
}

const STORAGE_KEY = "momo-loan-payment-state";
const DEFAULT_STATE: PaymentState = {
  isPaid: false,
  loanTransactions: [],
  receivedAmount: null,
  receivedTransactions: [],
};

// Fake history — dates in Feb 2026 and earlier, 8-10 days apart
const FAKE_HISTORY: Transaction[] = [
  { id:"h1",  type:"Data 4G/5G",          amount:"-80.000đ",  time:"2026-02-20T10:30:00.000Z", icon:"/image/data4g.png" },
  { id:"h2",  type:"Nạp tiền điện thoại", amount:"-100.000đ", time:"2026-02-11T09:00:00.000Z", icon:"/image/naptiendienthoai.png" },
  { id:"h3",  type:"Data 4G/5G",          amount:"-80.000đ",  time:"2026-02-02T14:20:00.000Z", icon:"/image/data4g.png" },
  { id:"h4",  type:"Nạp tiền điện thoại", amount:"-50.000đ",  time:"2026-01-24T08:45:00.000Z", icon:"/image/naptiendienthoai.png" },
  { id:"h5",  type:"Data 4G/5G",          amount:"-100.000đ", time:"2026-01-15T11:10:00.000Z", icon:"/image/data4g.png" },
  { id:"h6",  type:"Nạp tiền điện thoại", amount:"-100.000đ", time:"2026-01-06T16:30:00.000Z", icon:"/image/naptiendienthoai.png" },
  { id:"h7",  type:"Data 4G/5G",          amount:"-80.000đ",  time:"2025-12-28T09:50:00.000Z", icon:"/image/data4g.png" },
  { id:"h8",  type:"Nạp tiền điện thoại", amount:"-200.000đ", time:"2025-12-18T13:00:00.000Z", icon:"/image/naptiendienthoai.png" },
  { id:"h9",  type:"Data 4G/5G",          amount:"-80.000đ",  time:"2025-12-09T10:20:00.000Z", icon:"/image/data4g.png" },
  { id:"h10", type:"Nạp tiền điện thoại", amount:"-100.000đ", time:"2025-11-30T08:00:00.000Z", icon:"/image/naptiendienthoai.png" },
  { id:"h11", type:"Data 4G/5G",          amount:"-80.000đ",  time:"2025-11-21T15:40:00.000Z", icon:"/image/data4g.png" },
  { id:"h12", type:"Nạp tiền điện thoại", amount:"-50.000đ",  time:"2025-11-12T09:15:00.000Z", icon:"/image/naptiendienthoai.png" },
  { id:"h13", type:"Data 4G/5G",          amount:"-100.000đ", time:"2025-11-03T12:30:00.000Z", icon:"/image/data4g.png" },
  { id:"h14", type:"Nạp tiền điện thoại", amount:"-100.000đ", time:"2025-10-25T10:00:00.000Z", icon:"/image/naptiendienthoai.png" },
  { id:"h15", type:"Data 4G/5G",          amount:"-80.000đ",  time:"2025-10-16T14:50:00.000Z", icon:"/image/data4g.png" },
];

const PaymentContext = createContext<PaymentContextType>({
  isPaid: false,
  transactions: FAKE_HISTORY,
  markAsPaid: () => {},
  receivedAmount: null,
  markAsReceived: () => {},
});

export function PaymentProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PaymentState>(DEFAULT_STATE);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as PaymentState;
        setState({
          isPaid: parsed.isPaid ?? false,
          loanTransactions: Array.isArray(parsed.loanTransactions) ? parsed.loanTransactions : [],
          receivedAmount: parsed.receivedAmount ?? null,
          receivedTransactions: Array.isArray(parsed.receivedTransactions) ? parsed.receivedTransactions : [],
        });
      }
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
      const existing = Array.isArray(prev.loanTransactions) ? prev.loanTransactions : [];
      const next: PaymentState = {
        ...prev,
        isPaid: true,
        loanTransactions: [tx, ...existing],
      };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const markAsReceived = useCallback((amount: number, txId: string, time: Date) => {
    const tx: Transaction = {
      id: txId,
      type: "Nhận tiền từ Techcombank",
      amount: `+${amount.toLocaleString("vi-VN")}đ`,
      time: time.toISOString(),
      icon: "/image/tcb.png",
      isReceive: true,
    };
    setState((prev) => {
      const existing = Array.isArray(prev.receivedTransactions) ? prev.receivedTransactions : [];
      const next: PaymentState = {
        ...prev,
        isPaid: false,        // receiving fresh money resets loan-paid state
        receivedAmount: amount,
        receivedTransactions: [tx, ...existing],
      };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const loanTxs = Array.isArray(state.loanTransactions) ? state.loanTransactions : [];
  const receiveTxs = Array.isArray(state.receivedTransactions) ? state.receivedTransactions : [];
  const allTransactions = [...receiveTxs, ...loanTxs, ...FAKE_HISTORY];

  return (
    <PaymentContext.Provider value={{
      isPaid: state.isPaid,
      transactions: allTransactions,
      markAsPaid,
      receivedAmount: state.receivedAmount,
      markAsReceived,
    }}>
      {children}
    </PaymentContext.Provider>
  );
}

export function usePayment() {
  return useContext(PaymentContext);
}
