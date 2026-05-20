import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import "../styles/toast.css";

const ToastContext = createContext(null);

let toastSeq = 0;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const timersRef = useRef(new Map());

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
  }, []);

  const showToast = useCallback(
    (message, opts = {}) => {
      const id = ++toastSeq;
      const variant = opts.variant ?? "info";
      const duration = opts.duration ?? 3000;
      setToasts((prev) => [...prev, { id, message, variant }]);
      const timer = setTimeout(() => dismissToast(id), duration);
      timersRef.current.set(id, timer);
      return id;
    },
    [dismissToast],
  );

  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach((t) => clearTimeout(t));
      timers.clear();
    };
  }, []);

  const value = useMemo(() => ({ showToast, dismissToast }), [showToast, dismissToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {typeof document !== "undefined" &&
        createPortal(
          <div className="toast-stack" role="region" aria-live="polite">
            {toasts.map((t) => (
              <div key={t.id} className={`toast toast-${t.variant}`}>
                <span className="toast-message">{t.message}</span>
                <button
                  type="button"
                  className="toast-close"
                  onClick={() => dismissToast(t.id)}
                  aria-label="Dismiss notification"
                >
                  ×
                </button>
              </div>
            ))}
          </div>,
          document.body,
        )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
};
