import Lottie from "react-lottie";
import * as animationData from "../../assets/lottie/error/404.json";
import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const Error404 = () => {
  const navigate = useNavigate();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div
      className="flex flex-col items-center justify-center px-4"
      style={{ minHeight: "calc(100vh - 80px)" }}
    >
      <Lottie
        options={defaultOptions}
        style={{ width: "100%", maxWidth: "400px" }}
      />
      <p className="text-lg text-ttext-light dark:text-ttext-dark mt-2">
        Sayfa Bulunamadı :(
      </p>
      <Button
        variant="gradient"
        gradient={{ from: "indigo", to: "blue" }}
        className="mt-6"
        onClick={() => navigate("/")}
      >
        Ana Sayfaya Dön
      </Button>
    </div>
  );
};

export default Error404;
