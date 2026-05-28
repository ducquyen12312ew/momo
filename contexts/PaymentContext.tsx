"use client";
import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

export interface Transaction {
  id: string;
  type: string;
  amount: string;
  time: string; // ISO string
  icon: string;
}

interface PaymentState {
  isPaid: boolean;
  transactions: Transaction[];
}

interface PaymentContextType {
  isPaid: boolean;
  transactions: Transaction[];
  markAsPaid: (txId: string, amount: string, time: Date) => void;
}

const STORAGE_KEY = "momo-loan-payment-state";
const DEFAULT_STATE: PaymentState = { isPaid: false, transactions: [] };

const PaymentContext = createContext<PaymentContextType>({
  isPaid: false,
  transactions: [],
  markAsPaid: () => {},
});

export function PaymentProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PaymentState>(DEFAULT_STATE);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setState(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);

  const markAsPaid = useCallback((txId: string, amount: string, time: Date) => {
    const tx: Transaction = {
      id: txId,
      type: "Thanh toán vay nhanh",
      amount: `-${amount}`,
      time: time.toISOString(),
      icon: "/image/vay.png",
    };
    setState((prev) => {
      const next: PaymentState = {
        isPaid: true,
        transactions: [tx, ...prev.transactions],
      };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  if (!ready) return <>{children}</>;

  return (
    <PaymentContext.Provider value={{ isPaid: state.isPaid, transactions: state.transactions, markAsPaid }}>
      {children}
    </PaymentContext.Provider>
  );
}

export function usePayment() {
  return useContext(PaymentContext);
}
