import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

export function AuthStatus() {
  const auth = useAuth();
  const navigate = useNavigate();

  if (!auth?.user) {
    return <p>You are not logged in.</p>;
  }

  return (
    <p>
      Welcome {auth.user}!{" "}
      <button
        onClick={() => {
          auth.signout(() => navigate("/"));
        }}
      >
        Sign out
      </button>
    </p>
  );
}