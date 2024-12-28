import React from "react";
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";
import { FaCommentAlt } from "react-icons/fa";
import * as animationData from "../../assets/lottie/fire.json";
import Lottie from "react-lottie";
export interface ForumItem {
  id: number;
  title: string;
  status: string;
  category: string;
  date: string;
  commentsCount: number;
  upvotes: number;
  fire?: boolean;
}

const ForumItemFc: React.FC<{ item: ForumItem }> = ({ item }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 py-4">
      <div className="flex items-start gap-4">
        <div className="flex flex-col items-center gap-2">
          <div className="relative z-10">
            {item.fire && (
              <Lottie
                options={defaultOptions}
                style={{
                  width: "70px",
                  height: "70px",
                  position: "absolute",
                  left: "-25px",
                  top: "-35px",
                  zIndex: -1,
                }}
              />
            )}
            <span
              className={`text-lg font-bold text-ttext-light dark:text-ttext-dark w-[20px] h-[20px] rounded-full flex items-center justify-center ${
                item.fire ? "bg-white !text-black text-sm" : ""
              }`}
            >
              {item.upvotes}
            </span>
          </div>
          <button className="text-sm text-text-light dark:text-ttext-dark">
            <BiSolidUpArrow />
          </button>
          <button className="text-sm text-text-light dark:text-ttext-dark">
            <BiSolidDownArrow />
          </button>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-text-light dark:text-text-dark hover:underline cursor-pointer">
            {item.title}
          </h3>
          <div className="mt-1 flex items-center gap-2 text-sm text-stext-light dark:text-stext-dark">
            <span
              className={`px-2 py-1 rounded-full text-white ${
                item.category === "Bug"
                  ? "bg-red-500"
                  : item.category === "Readings"
                  ? "bg-blue-500"
                  : "bg-gray-500"
              }`}
            >
              {item.category}
            </span>
            <span>{item.status}</span>
            <span>{item.date}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end justify-between gap-2 text-sm">
        <span className="text-ttext-light dark:text-ttext-dark">Date</span>
        <span className="mt-auto flex items-center gap-2 text-text-light dark:text-text-dark">
          {item.commentsCount} <FaCommentAlt />
        </span>
      </div>
    </div>
  );
};

export default ForumItemFc;
