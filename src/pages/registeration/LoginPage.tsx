import { Button, TextInput } from "@mantine/core";
import { useSetAtom } from "jotai";
import { Link, useNavigate } from "react-router-dom";
import { authAtom } from "../../components/AuthContext";
import { useState } from "react";
import { toast } from "react-toastify";
import { useIntl } from "react-intl";
import { User } from "../../interfaces/GlobalTypes";

const LoginPage = () => {
  const intl = useIntl();
  const navigation = useNavigate();
  const setIsAuthenticated = useSetAtom(authAtom);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const Login = () => {
    // LocalStorage'daki kullanıcıları al
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

    // Kullanıcıyı bul
    const user = users.find(
      (user) =>
        userData.email === user.email && userData.password === user.password
    );
    console.log(users, user, userData);
    if (!user) {
      toast.error("error.login");
      return;
    }
    localStorage.setItem("lu", JSON.stringify(user));
    setIsAuthenticated(true);
    navigation("/");
  };

  return (
    <div
      className="flex flex-col items-center justify-center px-4 relative z-10"
      style={{ minHeight: "calc(100vh - 80px)" }}
    >
      <div className=" flex flex-col items-center gap-4 p-4 md:p-8 bg-background-lightAlt1/80 dark:bg-background-darkAlt2/80 rounded-xl backdrop-blur-sm w-full max-w-[800px]">
        <img src="/logo.png" alt="" className="w-20 h-20" />
        <h1 className="text-xl font-bold text-center">
          {intl.formatMessage({ id: "login.title" })}
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
            label={intl.formatMessage({ id: "common.email" })}
            required
            id="login-surname"
            size="md"
            className="w-full"
            autoComplete="email webauthn"
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />
          <TextInput
            type="password"
            label={intl.formatMessage({ id: "common.password" })}
            required
            id="login-password"
            size="md"
            className="w-full"
            autoComplete="password webauthn"
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
          />
          <Button
            size="md"
            radius="md"
            color="blue"
            className="mt-4"
            type="submit"
          >
            {intl.formatMessage({ id: "common.signIn" })}
          </Button>
          <Link
            to="/kayit-ol"
            className="text-base text-text-light dark:text-text-dark text-center"
          >
            {intl.formatMessage({ id: "login.register" })}
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
