import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { atom, useAtom } from "jotai";
import ChatPopup from "../components/ChatBot/Chatbot";

export const chatPopUpAtom = atom<boolean>(false);
const Main = () => {
  const [isPopupOpen, setIsPopupOpen] = useAtom(chatPopUpAtom);
  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark">
      <Navbar />
      <main className="flex-grow flex flex-col relative">
        <Outlet />
      </main>
      <Footer />
      {/* Chat Popup */}
      <ChatPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </div>
  );
};

export default Main;
