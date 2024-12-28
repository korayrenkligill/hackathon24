import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../components/AuthContext";

const AuthProtectedRoutes = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Kullanıcı giriş yapmamışsa giriş sayfasına yönlendir
    return <Navigate to="/giris-yap" replace />;
  }

  // Alt rotaları render et
  return <Outlet />;
};

export default AuthProtectedRoutes;
