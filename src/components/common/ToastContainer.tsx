import React from 'react';
import { useAutomation } from '../../context/AutomationContext';
import { CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts } = useAutomation();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2 pointer-events-none select-none">
      {toasts.map(toast => {
        return (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-center gap-2.5 px-4 py-3 bg-white dark:bg-[#18181b] text-slate-900 dark:text-slate-200 rounded-lg border border-slate-200 dark:border-slate-700/50 shadow-2xl text-sm font-medium animate-in fade-in slide-in-from-bottom-2 duration-150"
          >
            {toast.type === 'success' && (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            )}
            {toast.type === 'info' && (
              <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
            )}
            {toast.type === 'warning' && (
              <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            )}
            <span className="text-sm font-medium">{toast.message}</span>
          </div>
        );
      })}
    </div>
  );
};
