import React from "react";
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";
import { FaCommentAlt } from "react-icons/fa";
import * as animationData from "../../assets/lottie/fire.json";
import Lottie from "react-lottie";
import { useNavigate } from "react-router-dom";
import { formatDateToDayMonthYear } from "../../utils/dateConverter";
import axios from "../../utils/axiosConfig";
import { ApiUrls } from "../../api/apiUrls";

export interface ForumItem {
  _id: string;
  title: string;
  content: string;
  author: string;
  likes: string[];
  disslikes: string[];
  tags: string[];
  comments: [
    {
      content: string;
      createdAt: string;
      user: {
        name: string;
        _id: string;
      };
      _id: string;
    }
  ];
  createdAt: string;
}

const ForumItemFc: React.FC<{ item: ForumItem }> = ({ item }) => {
  const navigation = useNavigate();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const likeComment = async (id: string) => {
    try {
      await axios.post(`${ApiUrls.forum.forums}/${id}/likes`).then((res) => {
        console.log(res.data);
      });
    } catch (error) {}
  };
  const DisslikeComment = async (id: string) => {
    try {
      await axios
        .post(`${ApiUrls.forum.forums}/${id}/disslikes`)
        .then((res) => {
          console.log(res.data);
        });
    } catch (error) {}
  };
  return (
    <div
      className="flex justify-between border-b border-gray-200 dark:border-gray-700 py-4"
      onClick={() => navigation(`/forum/${item._id}`)}
    >
      <div className="flex items-start gap-4">
        <div className="flex flex-col items-center gap-2">
          <div className="relative z-10">
            {item.likes.length - item.disslikes.length > 5 && (
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
                item.likes.length - item.disslikes.length > 5
                  ? "bg-white !text-black text-base"
                  : ""
              }`}
            >
              {item.likes.length - item.disslikes.length}
            </span>
          </div>
          <button
            className="text-base text-text-light dark:text-ttext-dark"
            onClick={(e) => {
              e.stopPropagation();
              likeComment(item._id);
            }}
          >
            <BiSolidUpArrow />
          </button>
          <button
            className="text-base text-text-light dark:text-ttext-dark"
            onClick={(e) => {
              e.stopPropagation();
              DisslikeComment(item._id);
            }}
          >
            <BiSolidDownArrow />
          </button>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-text-light dark:text-text-dark hover:underline cursor-pointer">
            {item.title}
          </h3>
          <div className="mt-1 flex items-center gap-2 text-base text-stext-light dark:text-stext-dark">
            {item.tags.map((tag) => (
              <span className={`px-2 py-1 rounded-full text-white bg-blue-500`}>
                {tag}
              </span>
            ))}
            <span>{formatDateToDayMonthYear(item.createdAt)}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end justify-between gap-2 text-base">
        <span className="mt-auto flex items-center gap-2 text-text-light dark:text-text-dark">
          {item.comments.length} <FaCommentAlt />
        </span>
      </div>
    </div>
  );
};

export default ForumItemFc;
