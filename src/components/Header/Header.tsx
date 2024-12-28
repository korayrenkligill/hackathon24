import RandomIconGrid from "./RandomIconGrid";
import { LuSearch } from "react-icons/lu";
import { TypeAnimation } from "react-type-animation";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

type Props = {
  title: string;
  description: string;
};

export const texts = [
  "Hafta sonu yakınlarda bir etkinlik var mı?",
  1000,
  "Bugün İstanbul'da hangi etkinlikler düzenleniyor?",
  1000,
  "Spor etkinlikleri nasıl bulabilirim?",
  1000,
  "Ücretsiz eğitim etkinlikleri var mı?",
  1000,
  "Katıldığım etkinliklerden nasıl rozet kazanırım?",
  1000,
  "Yakındaki üniversite toplulukları hangi etkinlikleri düzenliyor?",
  1000,
];

export const greetings = [
  "Merhaba! Size nasıl yardımcı olabilirim?",
  "Selam! Bir sorunuz mu var? Hemen yanıtlayabilirim.",
  "Merhaba! Burada olduğuma sevindim. :)",
  "Selamlar! Bugün size nasıl yardımcı olabilirim?",
  "Hey! Beni çağırdınız mı?",
  "Merhaba! İhtiyacınız olan bir şey varsa buradayım.",
  "Selam! Size yardımcı olmak için buradayım.",
  "Merhaba! Nasılsınız? Sorularınızı bekliyorum.",
  "Selam! Hadi başlayalım, size nasıl yardımcı olabilirim?",
  "Merhaba! Bugün size rehberlik etmek için buradayım.",
];

const Header = ({ title, description }: Props) => {
  const location = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);

  const [showBot, setShowBot] = useState(false);
  const [greeting, setGreeting] = useState("");

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      inputRef.current.focus();
    }
  };

  // Scroll işlemini takip et
  useEffect(() => {
    const handleScroll = () => {
      const pow = window.innerWidth > 768 ? 0.6 : 0.8;
      const headerHeight = window.innerHeight * pow;
      if (location.pathname !== "/") {
        setShowBot(true);
        return;
      }
      setShowBot(window.scrollY > headerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  useEffect(() => {
    const randomGreeting =
      greetings[Math.floor(Math.random() * greetings.length)];
    setGreeting(randomGreeting);
  }, [showBot]);
  return (
    <div className="h-[90vh] md:h-[70vh] flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-indigo-500 to-blue-500 dark:from-background-darkAlt3 dark:to-background-darkAlt2 relative px-4">
      <div className="flex flex-col items-center order-2 md:order-1 z-20 max-w-[700px]">
        <h1 className="text-2xl md:text-5xl text-center font-bold text-white z-10 font-outfit">
          {title}
        </h1>
        <p className="text-sm md:text-base text-center text-white mt-1 z-10 ">
          {description}
        </p>
        <div className="w-full relative mt-6 mb-2 text-white">
          <LuSearch className="absolute top-1/2 -translate-y-1/2 left-3 text-3xl" />
          <input
            ref={inputRef}
            type="text"
            className="w-full py-3 px-3 pl-12 outline-none rounded-full border bg-white/20"
          />
        </div>
        <TypeAnimation
          sequence={texts}
          speed={50}
          style={{ fontSize: ".9rem" }}
          repeat={Infinity}
          className="px-3 py-1 border border-background-light/40 bg-background-light/20 text-white rounded-full"
        />
      </div>
      <motion.div
        initial={{ x: 500, opacity: 0 }}
        animate={{
          x: 0,
          opacity: 1,
          y: [0, -10, 0], // Yukarı-aşağı hareket
          transition: {
            type: "spring",
            stiffness: 50,
            damping: 10,
            y: {
              duration: 4,
              repeat: Infinity, // Sürekli tekrar
              repeatType: "mirror", // Aşağı yukarı yansıtmalı hareket
            },
          },
        }}
        className="relative z-10 order-1 md:order-2 w-[200px] md:w-[18%] max-w-[400px]"
      >
        <img
          src="/images/runningBot.png"
          alt="running bot"
          className="w-full object-center"
        />
      </motion.div>
      <RandomIconGrid />
      <AnimatePresence>
        {showBot && (
          <>
            <motion.div
              onClick={handleFocus}
              initial={{ opacity: 0, rotateZ: 0, scale: 0 }}
              animate={{
                scale: [0, 0.5, 0.5, 1],
                opacity: [0, 1, 1, 1],
                y: [0, -10, 0], // Yukarı-aşağı hareket
                rotateZ: [0, -20, 10, 0],
                transition: {
                  type: "spring",
                  stiffness: 50,
                  damping: 10,
                  rotateZ: {
                    duration: 1,
                    ease: "easeInOut",
                    times: [0, 0.3, 0.5, 1],
                    repeatDelay: 1,
                  },
                  y: {
                    duration: 4,
                    repeat: Infinity, // Sürekli tekrar
                    repeatType: "mirror", // Aşağı yukarı yansıtmalı hareket
                  },
                },
              }}
              exit={{
                scale: [1, 1.1, 1, 1],
                x: [0, 0, 0, 500],
                y: [0, 0, 0, 500],
              }}
              transition={{
                duration: 1,
                ease: "easeInOut",
                times: [0, 0.1, 0.2, 1],
                repeatDelay: 1,
              }}
              className="fixed bottom-6 right-6 z-[999] w-[70px] h-[70px] "
            >
              <img
                src="./images/botHead.png"
                className="w-full h-full object-contain"
                alt=""
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 1, 1, 0],
                transition: {
                  stiffness: 50,
                  damping: 10,
                  opacity: {
                    duration: 5,
                    times: [0, 0.1, 0.9, 1],
                  },
                },
              }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              className="fixed bottom-[70px] right-[92px] z-[1000] rounded-full rounded-br-none px-4 py-1 text-white bg-indigo-500 ml-8"
            >
              {greeting}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;
