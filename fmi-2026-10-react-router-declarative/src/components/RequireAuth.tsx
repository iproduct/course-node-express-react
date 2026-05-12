import { Navigate, useLocation } from "react-router";
import { useAuth } from "../hooks/useAuth";
import type { ReactNode } from "react";

export function RequireAuth({ children }: { children: ReactNode }) {
  const auth = useAuth();
  const location = useLocation();
  // const navigate = useNavigate()

  if (!auth?.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} />;
    // navigate("/login", {state: { from: location } })
  }

  return children;
}