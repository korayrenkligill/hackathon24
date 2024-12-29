import FooterBottom from "./FooterBottom";
import FooterMain from "./FooterMain";

const Footer = () => {
  return (
    <footer className="bg-background-light border-t border-background-lightAlt2 dark:border-background-darkAlt3 dark:bg-background-darkAlt2">
      <div className="container mx-auto flex flex-col">
        <FooterMain />
        <div className="border-t border-indigo-400 dark:border-indigo-400/40 mx-12" />
        <FooterBottom />
      </div>
    </footer>
  );
};

export default Footer;
