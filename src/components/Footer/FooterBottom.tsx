import { useIntl } from "react-intl";

const FooterBottom = () => {
  const intl = useIntl();
  return (
    <div className="flex justify-between p-4">
      <p>© 2023 GençLink. {intl.formatMessage({ id: "allRightsReserved" })}</p>
      <div className="flex gap-4">
        <p>{intl.formatMessage({ id: "privacyPolicy" })}</p>
        <p>{intl.formatMessage({ id: "termsAndConditions" })}</p>
      </div>
    </div>
  );
};

export default FooterBottom;
