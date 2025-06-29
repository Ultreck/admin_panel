import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
// import { useAuthUser } from "../hooks/useAuthUser";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();
  

  if (loading) return <p>Loading...</p>;

  return user ? children : <Navigate to="/" />;
};
