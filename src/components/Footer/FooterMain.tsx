import { useIntl } from "react-intl";
import { Link } from "react-router-dom";

const FooterMain = () => {
  const intl = useIntl();
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 md:py-20 px-4">
      <div className="flex flex-col gap-4">
        <img src="/logo.png" alt="logo" className="w-16 mx-auto" />
        <p>❤️ {intl.formatMessage({ id: "footer.description" })}</p>
        <p className="bg-background-lightAlt1 dark:bg-background-darkAlt1 p-3 border border-indigo-400/40 rounded-md">
          {intl.formatMessage({ id: "footer.description2" })}
        </p>
        <p className="bg-background-lightAlt1 dark:bg-background-darkAlt1 p-3 border border-indigo-400/40 rounded-md">
          {intl.formatMessage({ id: "footer.description3" })}
        </p>
        <p className="bg-background-lightAlt1 dark:bg-background-darkAlt1 p-3 border border-indigo-400/40 rounded-md">
          {intl.formatMessage({ id: "footer.description4" })}
        </p>
      </div>
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold">
          {intl.formatMessage({ id: "footer.navigation" })}
        </h1>
        <Link to={"/"} className={"text-indigo-600"}>
          Home
        </Link>
        <Link to={"/etkinlik-listesi"}>Etkinlik listesi</Link>
        <Link to={"/etkinlik-haritası"}>Etkinlik Haritası</Link>
        <Link to={"/forum"}>Forum</Link>
        <Link to={"/oduller"}>Ödüller</Link>
      </div>
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold">
          {intl.formatMessage({ id: "footer.followUs" })}
        </h1>
        <p>İnstagram</p>
        <p>Facebook</p>
        <p>Twitter</p>
        <p>Linkedin</p>
        <p>Discord</p>
        <p>TikTok</p>
      </div>
    </div>
  );
};

export default FooterMain;
