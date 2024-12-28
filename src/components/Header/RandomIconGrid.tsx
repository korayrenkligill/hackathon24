import React from "react";
import { motion } from "framer-motion"; // Framer Motion'u ekle
import {
  BsStar,
  BsStarFill,
  BsHeart,
  BsHeartFill,
  BsLightningFill,
  BsMoonStars,
  BsSun,
  BsCloud,
  BsCheckCircle,
  BsExclamationCircle,
  BsInfoCircle,
  BsFillGearFill,
  BsFillBellFill,
  BsFillShieldFill,
  BsFillArrowUpCircleFill,
  BsFillArrowDownCircleFill,
  BsChatDots,
  BsFillCameraFill,
} from "react-icons/bs";

// İkon tipi
type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

// İkon listesi
const icons: IconType[] = [
  BsStar,
  BsStarFill,
  BsHeart,
  BsHeartFill,
  BsLightningFill,
  BsMoonStars,
  BsSun,
  BsCloud,
  BsCheckCircle,
  BsExclamationCircle,
  BsInfoCircle,
  BsFillGearFill,
  BsFillBellFill,
  BsFillShieldFill,
  BsFillArrowUpCircleFill,
  BsFillArrowDownCircleFill,
  BsChatDots,
  BsFillCameraFill,
];

// Rastgele ikon ve opaklık seçimi
const getRandomIconAndOpacity = (): {
  IconComponent: IconType;
  maxOpacity: number;
  duration: number;
} => {
  const IconComponent = icons[Math.floor(Math.random() * icons.length)];
  const maxOpacity = Math.random() * (25 - 5) + 5; // Rastgele maksimum opaklık (5-25 arası)
  const duration = Math.random() * (3 - 1) + 1; // Rastgele süre (1-3 saniye arası)
  return { IconComponent, maxOpacity, duration };
};

// Grid düzeni
const gridPattern: (string | null)[][] = [
  ["icon", null, "icon"],
  [null, "icon", null],
  ["icon", null, "icon"],
  [null, "icon", null],
  ["icon", null, "icon"],
  [null, "icon", null],
  ["icon", null, "icon"],
  [null, "icon", null],
];

const RandomIconGrid: React.FC = () => {
  // Bir satırı render eden fonksiyon
  const renderRow = (row: (string | null)[], rowIndex: number) =>
    row.map((cell, colIndex) => {
      if (cell === "icon") {
        const { IconComponent, maxOpacity, duration } =
          getRandomIconAndOpacity();
        return (
          <motion.div
            key={`${rowIndex}-${colIndex}`}
            className="flex items-center justify-center text-shadow-md"
            animate={{
              opacity: [0.1, maxOpacity / 100, 0.1],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <IconComponent />
          </motion.div>
        );
      }
      return (
        <div
          key={`${rowIndex}-${colIndex}`}
          className="flex items-center justify-center"
        ></div>
      );
    });

  return (
    <div className="absolute top-0 left-0 h-full w-full flex text-2xl md:text-3xl lg:text-4xl text-white">
      {/* Sol Grid */}
      <div className="flex-1 h-full grid grid-rows-3 grid-cols-3 gap-4">
        {gridPattern.map((row, rowIndex) => renderRow(row, rowIndex))}
      </div>

      {/* Sağ Grid */}
      <div className="flex-1 h-full grid grid-rows-3 grid-cols-3 gap-4">
        {gridPattern.map((row, rowIndex) => renderRow(row, rowIndex))}
      </div>
    </div>
  );
};

export default RandomIconGrid;
