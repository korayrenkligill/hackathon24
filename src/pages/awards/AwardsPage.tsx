import React from "react";
import HeaderShort from "../../components/Header/HeaderShort";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

type Props = {};

interface AwardType {
  id: number;
  title: string;
  image: string;
  has?: boolean;
}

const awards: AwardType[] = [
  {
    id: 1,
    title: "Awards title text 0",
    image: "https://placehold.co/60x60",
    has: true,
  },
  {
    id: 2,
    title: "Awards title text",
    image: "https://placehold.co/60x60",
    has: true,
  },
  { id: 3, title: "Awards title text 1", image: "https://placehold.co/60x60" },
  { id: 4, title: "Awards title text 2", image: "https://placehold.co/60x60" },
  { id: 5, title: "Awards title text 3", image: "https://placehold.co/60x60" },
  { id: 6, title: "Awards title text 4", image: "https://placehold.co/60x60" },
  { id: 7, title: "Awards title text 5", image: "https://placehold.co/60x60" },
  { id: 8, title: "Awards title text 6", image: "https://placehold.co/60x60" },
  { id: 9, title: "Awards title text 7", image: "https://placehold.co/60x60" },
  { id: 10, title: "Awards title text 8", image: "https://placehold.co/60x60" },
  { id: 11, title: "Awards title text 9", image: "https://placehold.co/60x60" },
  {
    id: 12,
    title: "Awards title text 10",
    image: "https://placehold.co/60x60",
  },
];

const Award = ({ award }: { award: AwardType }) => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <div>
      <div
        className="cursor-pointer flex flex-col items-center justify-center p-4 border shadow border-background-lightAlt1 dark:border-background-darkAlt3 dark:bg-background-darkAlt3 rounded-xl"
        style={award.has ? {} : { opacity: 0.5 }}
        onClick={open}
      >
        <img
          src={award.image}
          alt="award image"
          className="w-[60px] h-[60px] rounded-full"
        />
        <p className="text-base text-text-light dark:text-text-dark">
          {award.title}
        </p>
      </div>
      <Modal opened={opened} onClose={close} title={award.title}>
        <p>Ödülü almak için gerekenler</p>
        <ul className="mt-4 flex flex-col gap-2">
          <li>1. Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
          <li>2. Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
          <li>3. Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
          <li>4. Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
        </ul>
      </Modal>
    </div>
  );
};

const AwardsPage = (props: Props) => {
  return (
    <div className="relative">
      <HeaderShort
        title="Awards title text"
        description="Lorem ipsum dolor sit amet."
      />
      <div className="flex flex-col md:flex-row gap-2 container mx-auto px-4 my-4">
        <div className="flex-1 p-2">
          <h1 className="text-3xl font-bold font-outfit text-text-light dark:text-text-dark">
            Ödüller <span>🚩</span>
          </h1>
          <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-2">
            {awards.map((award) => (
              <Award award={award} key={award.id} />
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
            <p className="text-base mb-4">name surname</p>
            <div className="w-[60px] bg-indigo-400 h-[100px] rounded-t-xl"></div>
          </div>
          <div className="flex flex-col items-center justify-end">
            <img
              src="https://placehold.co/60x60/263da5/1a2a72"
              alt="image"
              className="w-[60px] h-[60px] rounded-full"
            />
            <p className="text-base mb-4">name surname</p>
            <div className="w-[60px] bg-yellow-400 h-[160px] rounded-t-xl"></div>
          </div>
          <div className="flex flex-col items-center justify-end">
            <img
              src="https://placehold.co/60x60/263da5/1a2a72"
              alt="image"
              className="w-[60px] h-[60px] rounded-full"
            />
            <p className="text-base mb-4">name surname</p>
            <div className="w-[60px] bg-red-400 h-[130px] rounded-t-xl"></div>
          </div>
          <div className="absolute top-full left-0 h-1 w-full bg-gradient-to-r from-indigo-500 to-blue-500 dark:from-background-darkAlt3 dark:to-background-darkAlt2"></div>
        </div>
      </div>
    </div>
  );
};

export default AwardsPage;
