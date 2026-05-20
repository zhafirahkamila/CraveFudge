import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useAuth } from "./AuthContext";
import { useToast } from "./ToastContext";

const STORAGE_PREFIX = "cravefudge_cart";

const getUserBucket = (user) => {
  if (!user) return "guest";
  return String(user.id ?? user.phone_number ?? user.email ?? "guest");
};

const storageKeyFor = (user) => `${STORAGE_PREFIX}:${getUserBucket(user)}`;

const readStoredItems = (key) => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((row) => row && row.id != null && row.size)
      .map((row) => ({
        id: row.id,
        slug: row.slug ?? "",
        title: row.title ?? "",
        img: row.img ?? "",
        size: String(row.size),
        price: Number(row.price) || 0,
        qty: Math.max(1, Number(row.qty) || 1),
      }));
  } catch {
    return [];
  }
};

const lineKey = (id, size) => `${id}__${size}`;

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const storageKey = storageKeyFor(user);

  const [items, setItems] = useState(() => readStoredItems(storageKey));
  const [isCartOpen, setIsCartOpen] = useState(false);

  const prevKeyRef = useRef(storageKey);
  const skipNextPersistRef = useRef(false);

  useEffect(() => {
    if (prevKeyRef.current === storageKey) return;
    prevKeyRef.current = storageKey;
    skipNextPersistRef.current = true;
    setItems(readStoredItems(storageKey));
  }, [storageKey]);

  useEffect(() => {
    if (skipNextPersistRef.current) {
      skipNextPersistRef.current = false;
      return;
    }
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(items));
    } catch {
      /* storage full or unavailable — ignore */
    }
  }, [items, storageKey]);

  const addItem = useCallback(
    (incoming) => {
      if (!user) {
        showToast("Please sign in to add items to your cart.", { variant: "info" });
        return;
      }
      if (!incoming || incoming.id == null || !incoming.size) return;
      const normalized = {
        id: incoming.id,
        slug: incoming.slug ?? "",
        title: incoming.title ?? "",
        img: incoming.img ?? "",
        size: String(incoming.size),
        price: Number(incoming.price) || 0,
        qty: Math.max(1, Number(incoming.qty) || 1),
      };
      setItems((prev) => {
        const key = lineKey(normalized.id, normalized.size);
        const idx = prev.findIndex((row) => lineKey(row.id, row.size) === key);
        if (idx === -1) return [...prev, normalized];
        const next = prev.slice();
        next[idx] = { ...next[idx], qty: next[idx].qty + normalized.qty };
        return next;
      });
    },
    [user, showToast],
  );

  const removeItem = useCallback((id, size) => {
    const key = lineKey(id, size);
    setItems((prev) => prev.filter((row) => lineKey(row.id, row.size) !== key));
  }, []);

  const updateQty = useCallback((id, size, qty) => {
    const key = lineKey(id, size);
    setItems((prev) => {
      if (qty <= 0) return prev.filter((row) => lineKey(row.id, row.size) !== key);
      return prev.map((row) => (lineKey(row.id, row.size) === key ? { ...row, qty } : row));
    });
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const toggleCart = useCallback(() => setIsCartOpen((v) => !v), []);

  const totals = useMemo(() => {
    let totalItems = 0;
    let totalPrice = 0;
    for (const row of items) {
      totalItems += row.qty;
      totalPrice += row.qty * row.price;
    }
    return { totalItems, totalPrice };
  }, [items]);

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateQty,
      clear,
      totalItems: totals.totalItems,
      totalPrice: totals.totalPrice,
      isCartOpen,
      openCart,
      closeCart,
      toggleCart,
    }),
    [items, addItem, removeItem, updateQty, clear, totals, isCartOpen, openCart, closeCart, toggleCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
};
