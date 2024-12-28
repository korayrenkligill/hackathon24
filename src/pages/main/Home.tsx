import { useIntl } from "react-intl";
import Header from "../../components/Header/Header";
import BookSection from "../../components/Main/BookSection";
import ForumContainer from "../../components/Main/ForumContainer";
import LastestEvents from "../../components/Main/LastestEvents";
import NavigationPage from "../../components/Main/NavigationPage";
import StartNow from "../../components/Main/StartNow";
import StatisticsSection from "../../components/Main/StatisticsSection";

const Home = () => {
  const intl = useIntl();
  return (
    <div>
      <Header
        title={intl.formatMessage({ id: "main.header.title" })}
        description={intl.formatMessage({ id: "main.header.desc" })}
      />
      <div className="container mx-auto px-3">
        <LastestEvents />
        <ForumContainer />
      </div>
      <StatisticsSection />
      <div className="container mx-auto px-3">
        <StartNow />
      </div>
      <NavigationPage />
    </div>
  );
};

export default Home;
