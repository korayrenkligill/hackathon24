import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const Main = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark">
      <Navbar />
      <main className="flex-grow flex flex-col relative">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Main;
