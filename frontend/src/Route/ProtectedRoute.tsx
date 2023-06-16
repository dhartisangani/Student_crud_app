import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
interface ProtectedProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedProps) {
  const navigate = useNavigate();
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("token");
    if (!isLoggedIn) {
      navigate("/signin");
    }
  }, []);

  return <>{children}</>;
}
export default ProtectedRoute;
