import { Button, TextInput } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ApiUrls } from "../../api/apiUrls";
import { useState } from "react";
import { User } from "../../interfaces/User";
import { toast } from "react-toastify";
import { useIntl } from "react-intl";

const RegisterPage = () => {
  const intl = useIntl();
  const navigation = useNavigate();
  const [passAgain, setPassAgain] = useState<string>("");
  const [userData, setUserData] = useState<User>({
    name: "",
    email: "",
    password: "",
    userType: "young",
  });
  const Register = async () => {
    try {
      const response = await axios.post(ApiUrls.users.register, userData);
      navigation("/giris-yap");
      return response.data;
    } catch (error: any) {
      toast.error("Hesap oluşturulamadı!");
      return;
    }
  };
  return (
    <div
      className="flex flex-col items-center justify-center px-4 relative z-10"
      style={{ minHeight: "calc(100vh - 80px)" }}
    >
      <div className=" flex flex-col items-center gap-4 p-4 md:p-8 bg-background-lightAlt1/80 dark:bg-background-darkAlt2/80 rounded-xl backdrop-blur-sm w-full max-w-[800px]">
        <img src="/logo.png" alt="" className="w-20 h-20" />
        <h1 className="text-xl font-bold text-center">
          {intl.formatMessage({ id: "register.title" })}
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (userData.password !== passAgain) {
              toast.warn(intl.formatMessage({ id: "error.passwordNotMatch" }));
              return;
            }
            Register();
          }}
          className="flex flex-col gap-4 w-full"
        >
          <TextInput
            type="text"
            label={intl.formatMessage({ id: "common.nameSurname" })}
            required
            id="register-name"
            size="md"
            className="w-full"
            autoComplete="name webauthn"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          />
          <TextInput
            type="email"
            label={intl.formatMessage({ id: "common.email" })}
            required
            id="register-mail"
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
            id="register-password"
            size="md"
            className="w-full"
            autoComplete="password webauthn"
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
          />
          <TextInput
            type="password"
            label={intl.formatMessage({ id: "common.passwordAgain" })}
            required
            id="register-passwordAgain"
            size="md"
            className="w-full"
            autoComplete="password webauthn"
            value={passAgain}
            onChange={(e) => setPassAgain(e.target.value)}
          />
          <Button
            size="md"
            radius="md"
            color="blue"
            className="mt-4"
            type="submit"
          >
            {intl.formatMessage({ id: "common.signUp" })}
          </Button>
          <Link
            to="/giris-yap"
            className="text-sm text-text-light dark:text-text-dark text-center"
          >
            {intl.formatMessage({ id: "common.haveAccount" })}
          </Link>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
