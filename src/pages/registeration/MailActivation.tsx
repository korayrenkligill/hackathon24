import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa6";
const MailActivation = () => {
  return (
    <div
      className="flex flex-col items-center justify-center px-4 relative z-10"
      style={{ minHeight: "calc(100vh - 60px)" }}
    >
      <div className=" flex flex-col items-center gap-4 p-4 md:p-8 bg-background-lightAlt1/80 dark:bg-background-darkAlt2/80 rounded-xl backdrop-blur-sm w-full max-w-[800px]">
        <img src="/logo.png" alt="" className="w-20 h-20" />
        <h1 className="text-xl font-bold text-center flex items-center gap-2">
          MAİL HESABINIZ ONAYLANDI <FaCheck className="text-green-500" />
        </h1>
        <Link
          to="/giris-yap"
          className="flex items-center gap-2 text-indigo-600 dark:text-text-dark mt-2"
        >
          Giriş Yap
        </Link>
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

export default MailActivation;
