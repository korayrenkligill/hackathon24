import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

type SideType = "lt" | "rt" | "lb" | "rb";
type PositionType = number | string;
interface Position {
  left: PositionType;
  top: PositionType;
  right: PositionType;
  bottom: PositionType;
}

interface FeatureProps {
  title: string;
  description: string;
  side: SideType;
  backgroundColor: string;
}
const Feature = ({
  title,
  description,
  side,
  backgroundColor,
}: FeatureProps) => {
  const [position, setPosition] = useState<Position>({
    left: "auto",
    top: "auto",
    right: "auto",
    bottom: "auto",
  });
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  useEffect(() => {
    switch (side) {
      case "lt":
        setPosition({
          left: "auto",
          top: 0,
          right: "calc(50% + 100px)",
          bottom: "auto",
        });
        break;
      case "rt":
        setPosition({
          left: "calc(50% + 100px)",
          top: 0,
          right: "auto",
          bottom: "auto",
        });
        break;
      case "lb":
        setPosition({
          left: "auto",
          top: "auto",
          right: "calc(50% + 100px)",
          bottom: 0,
        });
        break;
      case "rb":
        setPosition({
          left: "calc(50% + 100px)",
          top: "auto",
          right: "auto",
          bottom: 0,
        });
        break;
    }
  }, [side]);
  return (
    <div
      className="lg:absolute lg:w-[400px]"
      style={{
        ...position,
      }}
      key={title}
    >
      <div className="relative">
        <div
          className="text-text-dark p-8 rounded-xl relative z-20"
          style={{
            backgroundColor: backgroundColor,
          }}
        >
          <h1 className="uppercase font-semibold text-xl lg:text-2xl">
            {title}
          </h1>
          <p className="mt-2">{description}</p>
        </div>
        {["lt", "rt", "lb", "rb"].includes(side) &&
          [20, 40].map((offset, index) => (
            <motion.div
              key={index}
              ref={ref}
              initial={{
                [side.includes("l") ? "left" : "right"]: 0,
                [side.includes("t") ? "top" : "bottom"]: 0,
              }}
              animate={
                inView
                  ? {
                      [side.includes("l") ? "left" : "right"]: -offset,
                      [side.includes("t") ? "top" : "bottom"]: -offset,
                    }
                  : {}
              }
              transition={{ duration: 0.5 }}
              className="absolute hidden lg:block w-full h-full rounded-xl"
              style={{
                [side.includes("l") ? "left" : "right"]: -offset,
                [side.includes("t") ? "top" : "bottom"]: -offset,
                backgroundColor: backgroundColor,
                opacity: index === 0 ? 0.5 : 0.3,
                zIndex: 8,
              }}
            ></motion.div>
          ))}
        {["lt", "rt", "lb", "rb"].includes(side) && (
          <div
            className="absolute hidden lg:block w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[40px]"
            style={{
              [side.includes("l") ? "right" : "left"]: -16,
              [side.includes("t") ? "bottom" : "top"]: -16,
              borderBottomColor: backgroundColor,
              rotate: `${
                side === "lt"
                  ? 135
                  : side === "rt"
                  ? -135
                  : side === "lb"
                  ? 45
                  : -45
              }deg`,
            }}
          ></div>
        )}
      </div>
    </div>
  );
};

const OurFeatures = () => {
  return (
    <div className="container mx-auto mb-16 px-4">
      <div className="flex flex-col items-center justify-center gap-8 lg:gap-0 min-h-[500px] relative">
        <Feature
          title="özgünlük"
          description="nda elektronik dizgiye geçişi de atlatmış ve temelde değişmeden kalmıştır. 1960'larda Lorem Ipsum pasajlarını... "
          side="lt"
          backgroundColor="#0c9797"
        />
        <Feature
          title="kolaylık"
          description="nda elektronik dizgiye geçişi de atlatmış ve temelde değişmeden kalmıştır. 1960'larda Lorem Ipsum pasajlarını... "
          side="rt"
          backgroundColor="#8037db"
        />
        <img src="/logo.png" alt="" />
        <Feature
          title="farklılaşma"
          description="nda elektronik dizgiye geçişi de atlatmış ve temelde değişmeden kalmıştır. 1960'larda Lorem Ipsum pasajlarını... "
          side="lb"
          backgroundColor="#7c7acc"
        />
        <Feature
          title="çoğaltma"
          description="nda elektronik dizgiye geçişi de atlatmış ve temelde değişmeden kalmıştır. 1960'larda Lorem Ipsum pasajlarını... "
          side="rb"
          backgroundColor="#3592e9"
        />
      </div>
    </div>
  );
};

export default OurFeatures;
