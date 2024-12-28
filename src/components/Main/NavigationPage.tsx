import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import { provides } from "../../store/provides";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";

interface WhatWeProvideContainerProps {
  index: number;
  itemHeight: number;
  scrollY: MotionValue<number>;
  springConfig: { damping: number; stiffness: number };
  provide: any;
}
const WhatWeProvideContainer = ({
  index,
  itemHeight,
  scrollY,
  springConfig,
  provide,
}: WhatWeProvideContainerProps) => {
  const triggerPoint = 650; // Animasyonun başlaması için gerekli scroll offset'i
  const start = triggerPoint + index * itemHeight; // Başlangıç aralığı
  const end = triggerPoint + (index === 0 ? 0 : start + itemHeight); // Bitiş aralığı

  // Transform değerlerini hesapla
  const rawOpacity = useTransform(scrollY, [start, end], [0, 1]);
  const rawTransformY = useTransform(scrollY, [start, end], [300, 0]);

  // Yumuşatılmış (Spring) değerler
  const opacity = useSpring(rawOpacity, springConfig);
  const transformY = useSpring(rawTransformY, springConfig);

  return (
    <motion.div
      key={`provide-${index}`}
      className="sticky flex flex-col items-start"
      style={{
        opacity,
        y: transformY,
        height: itemHeight,
        top: 55 * index + 80,
        zIndex: index,
      }}
    >
      <div className="relative bg-gradient-to-r from-indigo-500 to-blue-500 dark:from-background-darkAlt3 dark:to-background-darkAlt3 min-h-[50px] w-full rounded-t-xl flex items-center justify-center">
        <h2 className="text-xl font-semibold text-text-dark capitalize">
          {provide.name}
        </h2>
      </div>
      <div
        className={`w-full py-8 px-4 md:px-16 rounded-b-xl bg-zinc-50 dark:bg-background-darkAlt1 rounded-t-xl  shadow-lg border-t border-background-light dark:border-background-dark`}
      >
        <p className="md:text-xl text-text-light dark:text-text-dark mt-2">
          {provide.description}
        </p>
        <Link
          to={provide.link}
          className="flex items-center gap-2 text-indigo-800 dark:text-stext-dark mt-4"
        >
          Daha fazla bilgi{" "}
          <span>
            <FaAngleRight />
          </span>
        </Link>
      </div>
    </motion.div>
  );
};

const NavigationPage = () => {
  const { scrollY } = useScroll();

  const ortaNokta = Math.ceil(provides.length / 2);
  const birinciYarim = provides.slice(0, ortaNokta); // İlk yarı
  const ikinciYarim = provides.slice(ortaNokta); // İkinci yarı

  const [pageWidth, setPageWidth] = useState<number>(window.innerWidth);
  const [itemHeight, setItemHeight] = useState<number>(300);

  const springConfig = useMemo(() => ({ damping: 20, stiffness: 100 }), []);

  const updatePageWidth = () => {
    const width = document.documentElement.scrollWidth;
    setPageWidth(width);
    setItemHeight(width < 768 ? 300 : 200);
  };

  useEffect(() => {
    updatePageWidth();
    window.addEventListener("resize", updatePageWidth);
    return () => window.removeEventListener("resize", updatePageWidth);
  }, []);

  return (
    <div className="container mx-auto py-8 px-4 ">
      <h1 className="flex flex-col text-3xl md:text-5xl font-bold text-blue-500 dark:text-stext-dark mb-8 font-outfit text-center group">
        🪁 Sayfalarımız
        <div className="h-1 w-full bg-gradient-to-r from-indigo-500 to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform"></div>
      </h1>
      {pageWidth > 768 ? (
        <div
          className="relative grid grid-cols-2 gap-x-4 items-start justify-start"
          style={{ height: itemHeight * (Math.ceil(provides.length / 2) + 1) }}
        >
          <div>
            {birinciYarim.map((provide, index) => {
              return (
                <WhatWeProvideContainer
                  provide={provide}
                  index={index}
                  itemHeight={itemHeight}
                  key={`provide-${index}`}
                  scrollY={scrollY}
                  springConfig={springConfig}
                />
              );
            })}
          </div>
          <div>
            {ikinciYarim.map((provide, index) => {
              return (
                <WhatWeProvideContainer
                  provide={provide}
                  index={index}
                  itemHeight={itemHeight}
                  key={`provide-${index}`}
                  scrollY={scrollY}
                  springConfig={springConfig}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <div
          className="relative"
          style={{ height: itemHeight * (provides.length + 1) }}
        >
          {provides.map((provide, index) => {
            return (
              <WhatWeProvideContainer
                provide={provide}
                index={index}
                itemHeight={itemHeight}
                key={`provide-${index}`}
                scrollY={scrollY}
                springConfig={springConfig}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default NavigationPage;
