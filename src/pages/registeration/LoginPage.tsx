import { Button, TextInput } from "@mantine/core";
import { useSetAtom } from "jotai";
import { Link, useNavigate } from "react-router-dom";
import { authAtom } from "../../components/AuthContext";
import { useState } from "react";
import { ApiUrls } from "../../api/apiUrls";
import axios from "axios";
import { toast } from "react-toastify";

const LoginPage = () => {
  const navigation = useNavigate();
  const setIsAuthenticated = useSetAtom(authAtom);
  const [user, setUser] = useState<any>({
    email: "",
    password: "",
  });

  const Login = async () => {
    try {
      const response = await axios.post(ApiUrls.users.login, user);
      const token = response.data.token;
      localStorage.setItem("token", token);
      setIsAuthenticated(true);
      navigation("/");
      return response.data;
    } catch (error: any) {
      toast.error("Giriş Yapılamadı!");
      return;
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center px-4 relative z-10"
      style={{ minHeight: "calc(100vh - 60px)" }}
    >
      <div className=" flex flex-col items-center gap-4 p-4 md:p-8 bg-background-lightAlt1/80 dark:bg-background-darkAlt2/80 rounded-xl backdrop-blur-sm w-full max-w-[800px]">
        <img src="/logo.png" alt="" className="w-20 h-20" />
        <h1 className="text-xl font-bold text-center">
          HESABINIZA GİRİŞ YAPIN
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            Login();
          }}
          className="flex flex-col gap-4 w-full"
        >
          <TextInput
            type="email"
            label="E-posta"
            required
            id="login-surname"
            size="md"
            className="w-full"
            autoComplete="email webauthn"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <TextInput
            type="password"
            label="Şifre"
            required
            id="login-password"
            size="md"
            className="w-full"
            autoComplete="password webauthn"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <Button
            size="md"
            radius="md"
            color="blue"
            className="mt-4"
            type="submit"
          >
            Giriş Yap
          </Button>
          <Link
            to="/kayit-ol"
            className="text-sm text-text-light dark:text-text-dark text-center"
          >
            Hesabınız yok mu?
          </Link>
        </form>
      </div>
      <div
        className="w-full h-full absolute top-0 left-0 overflowX-hidden opacity-25"
        style={{ zIndex: -1 }}
      >
        <img src="/shapes/line.png" alt="line" className="w-full" />
      </div>
    </div>
  );
};

export default LoginPage;
