import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isBootstrapping } = useAuth();
  const location = useLocation();

  if (isBootstrapping) {
    return (
      <div className="route-loading" role="status" aria-live="polite">
        <span className="route-loading-spinner" aria-hidden="true" />
        <span>Loading your account…</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    const from = location.pathname + location.search;
    return <Navigate to="/signin" replace state={{ from, intent: "protected" }} />;
  }

  return children;
}
