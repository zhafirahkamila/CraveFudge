import { useEffect } from "react";
import { FaTimes, FaPlus, FaMinus, FaTrash, FaShoppingBag } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { formatIDR } from "../lib/formatCurrency";
import "../styles/cartDrawer.css";

const CartDrawer = () => {
  const { items, isCartOpen, closeCart, updateQty, removeItem, totalItems, totalPrice } = useCart();
  const { requireAuth } = useAuth();
  const { showToast } = useToast();

  const handleCheckout = () => {
    requireAuth(
      () => {
        closeCart();
        showToast("Checkout flow coming soon!", { variant: "info" });
      },
      { intent: "checkout", message: "Please sign in to complete your order." },
    );
  };

  useEffect(() => {
    if (!isCartOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isCartOpen, closeCart]);

  useEffect(() => {
    if (!isCartOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isCartOpen]);

  return (
    <div
      className={`cart-overlay ${isCartOpen ? "open" : ""}`}
      onClick={closeCart}
      aria-hidden={!isCartOpen}
    >
      <aside
        className="cart-panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        <header className="cart-header">
          <div>
            <h2>
              Your Cart
              {totalItems > 0 && <span className="cart-count">({totalItems})</span>}
            </h2>
          </div>
          <button
            type="button"
            className="cart-close"
            onClick={closeCart}
            aria-label="Close cart"
          >
            <FaTimes />
          </button>
        </header>

        <div className="cart-body">
          {items.length === 0 ? (
            <div className="cart-empty">
              <FaShoppingBag className="cart-empty-icon" />
              <p>Your cart is empty.</p>
              <span className="cart-empty-hint">Browse our menu and add a treat.</span>
            </div>
          ) : (
            items.map((line) => (
              <div className="cart-line" key={`${line.id}__${line.size}`}>
                <img className="cart-line-img" src={line.img} alt={line.title} />
                <div className="cart-line-body">
                  <span className="cart-line-title">{line.title}</span>
                  <span className="cart-line-size">Size: {line.size}</span>
                  <div className="cart-line-controls">
                    <div className="qty-stepper" role="group" aria-label={`Quantity for ${line.title}`}>
                      <button
                        type="button"
                        onClick={() => updateQty(line.id, line.size, line.qty - 1)}
                        aria-label="Decrease quantity"
                      >
                        <FaMinus />
                      </button>
                      <span className="qty-stepper-value">{line.qty}</span>
                      <button
                        type="button"
                        onClick={() => updateQty(line.id, line.size, line.qty + 1)}
                        aria-label="Increase quantity"
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="cart-line-side">
                  <button
                    type="button"
                    className="cart-line-remove"
                    onClick={() => removeItem(line.id, line.size)}
                    aria-label={`Remove ${line.title} from cart`}
                  >
                    <FaTrash />
                  </button>
                  <span className="cart-line-price">{formatIDR(line.price * line.qty)}</span>
                </div>
              </div>
            ))
          )}
        </div>

        <footer className="cart-footer">
          <div className="cart-subtotal">
            <span className="cart-subtotal-label">Subtotal</span>
            <span className="cart-subtotal-value">{formatIDR(totalPrice)}</span>
          </div>
          <button
            type="button"
            className="cart-checkout"
            disabled={items.length === 0}
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </footer>
      </aside>
    </div>
  );
};

export default CartDrawer;
