"use client";

import { createContext, useState, useCallback, ReactNode } from "react";

type ToastType = "success" | "error";

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType, duration?: number) => void;
  hideToast: (id: number) => void;
  toasts: Toast[];
}

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined,
);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback(
    (message: string, type: ToastType = "success", duration = 5000) => {
      const id = Date.now();
      const newToast = { id, message, type, duration };
      setToasts(prev => [...prev, newToast]);

      setTimeout(() => hideToast(id), duration);
    },
    [],
  );

  const hideToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, hideToast, toasts }}>
      {children}
    </ToastContext.Provider>
  );
};
