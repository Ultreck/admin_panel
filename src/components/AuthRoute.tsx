import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

export const AuthRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/login" replace />;
};