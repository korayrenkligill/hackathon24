import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../components/AuthContext";

const GuestProtectedRoutes = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    // Kullanıcı giriş yaptıysa ana sayfaya yönlendir
    return <Navigate to="/" replace />;
  }

  // Alt rotaları render et
  return <Outlet />;
};

export default GuestProtectedRoutes;
