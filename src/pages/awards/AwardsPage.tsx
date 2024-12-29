import React, { useEffect } from "react";
import HeaderShort from "../../components/Header/HeaderShort";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Badge } from "../../interfaces/GlobalTypes";
import { formatDateToDayMonthYear } from "../../utils/dateConverter";

const Award = ({ award }: { award: Badge }) => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <div>
      <div
        className="cursor-pointer flex flex-col items-center justify-center p-4 border shadow border-background-lightAlt1 dark:border-background-darkAlt3 dark:bg-background-darkAlt3 rounded-xl"
        onClick={open}
      >
        <p className="text-5xl">{award.emoji}</p>
        <p className="text-base text-text-light dark:text-text-dark">
          {award.name}
        </p>
      </div>
      <Modal
        opened={opened}
        onClose={close}
        centered
        title={`${award.point}puan`}
      >
        <div className="flex flex-col items-center text-text-light dark:text-text-dark">
          <p className="text-5xl text-text-light dark:text-text-dark">
            {award.emoji}
          </p>
          <p className="text-text-light dark:text-text-dark">{award.name}</p>
          <p className="text-text-light dark:text-text-dark">{award.details}</p>
          {award.eventType && (
            <p className="text-ttext-light dark:text-ttext-dark">
              {award.eventType}
            </p>
          )}
          {award.createdAt && (
            <p className=" text-ttext-light dark:text-ttext-dark">
              {formatDateToDayMonthYear(award.createdAt)}
            </p>
          )}
        </div>
      </Modal>
    </div>
  );
};

const AwardsPage = () => {
  const [awards, setAwards] = React.useState<[]>([]);

  useEffect(() => {
    const resp = JSON.parse(localStorage.getItem("badges") || "[]");
    setAwards(resp);
  }, []);

  return (
    <div className="relative">
      <HeaderShort
        title="Awards title text"
        description="Lorem ipsum dolor sit amet."
      />
      <div className="flex flex-col md:flex-row gap-2 container mx-auto px-4 my-4">
        <div className="flex-1 p-2">
          <h1 className="text-3xl font-bold font-outfit text-text-light dark:text-text-dark mb-8">
            Ödüller <span>🚩</span>
          </h1>
          <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-2">
            {awards.map((award, index) => (
              <Award award={award} key={index} />
            ))}
          </div>
        </div>
        <div className="md:w-[400px] p-2 pb-0 grid grid-cols-3 relative">
          <div className="flex flex-col items-center justify-end">
            <img
              src="https://placehold.co/60x60/263da5/1a2a72"
              alt="image"
              className="w-[60px] h-[60px] rounded-full"
            />
            <p className="text-base mb-4 text-center">Okan Alageyik</p>
            <div className="w-[60px] bg-indigo-400 h-[100px] rounded-t-xl"></div>
          </div>
          <div className="flex flex-col items-center justify-end">
            <img
              src="https://placehold.co/60x60/263da5/1a2a72"
              alt="image"
              className="w-[60px] h-[60px] rounded-full"
            />
            <p className="text-base mb-4 text-center">Koray Renkligil</p>
            <div className="w-[60px] bg-yellow-400 h-[160px] rounded-t-xl"></div>
          </div>
          <div className="flex flex-col items-center justify-end">
            <img
              src="https://placehold.co/60x60/263da5/1a2a72"
              alt="image"
              className="w-[60px] h-[60px] rounded-full"
            />
            <p className="text-base mb-4 text-center">Murat Han Kocaman</p>
            <div className="w-[60px] bg-red-400 h-[130px] rounded-t-xl"></div>
          </div>
          <div className="absolute top-full left-0 h-1 w-full bg-gradient-to-r from-indigo-500 to-blue-500 dark:from-background-darkAlt3 dark:to-background-darkAlt2"></div>
        </div>
      </div>
    </div>
  );
};

export default AwardsPage;
