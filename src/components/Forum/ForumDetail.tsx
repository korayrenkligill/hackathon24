import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaCommentAlt } from "react-icons/fa";
import Lottie from "react-lottie";
import * as animationData from "../../assets/lottie/fire.json";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { formatDateToDayMonthYear } from "../../utils/dateConverter";
import { useIntl } from "react-intl";
import { Button } from "@mantine/core";
import {
  addCommentToForum,
  dislikeForum,
  Forum,
  getForumById,
  getUserById,
  likeForum,
  User,
} from "../../interfaces/GlobalTypes";
import { v4 as uuidv4 } from "uuid";

type Props = {};

const ForumDetail = (props: Props) => {
  const { id } = useParams();
  const intl = useIntl();
  const [forum, setForum] = React.useState<Forum | null>(null);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const [user, setUser] = React.useState<User | null>(null);

  const [comment, setComment] = React.useState<string>("");

  useEffect(() => {
    if (id) {
      const resp = getForumById(id);
      if (resp.isOk) {
        setForum(resp.forum!);
      }
      const user = getUserById(resp.forum!.author).user;
      if (user) {
        setUser(user);
      }
    }
  }, [id]);

  if (!forum) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container mx-auto px-3 mb-12">
      <div className="flex justify-between py-4">
        <div className="flex items-start gap-4">
          <div className="flex flex-col items-center gap-2">
            <div className="relative z-10">
              {forum?.likes - forum?.dislikes > 5 && (
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
                  forum.likes - forum.dislikes > 5
                    ? "bg-white !text-black text-base"
                    : ""
                }`}
              >
                {forum.likes - forum.dislikes}
              </span>
            </div>
            <button
              className="text-base text-text-light dark:text-ttext-dark"
              onClick={() => {
                likeForum(id!);
              }}
            >
              <BiSolidUpArrow />
            </button>
            <button
              onClick={() => {
                dislikeForum(id!);
              }}
              className="text-base text-text-light dark:text-ttext-dark"
            >
              <BiSolidDownArrow />
            </button>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-light dark:text-text-dark hover:underline cursor-pointer">
              {forum.title}
            </h3>
            <div className="mt-1 flex items-center gap-2 text-base text-stext-light dark:text-stext-dark">
              {/* {forum.tags.map((tag) => (
                <span
                  className={`px-2 py-1 rounded-full text-white bg-blue-500`}
                >
                  {tag}
                </span>
              ))} */}
              <span>{formatDateToDayMonthYear(forum.createdAt)}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end justify-between gap-2 text-base">
          <span className="mt-auto flex items-center gap-2 text-text-light dark:text-text-dark">
            {forum.comments.length} <FaCommentAlt />
          </span>
        </div>
      </div>
      <div className="p-4 rounded-xl bg-white dark:bg-background-darkAlt3 shadow mb-8">
        {forum.content}
      </div>
      {localStorage.getItem("lu") && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addCommentToForum(id!, {
              id: uuidv4(),
              author: JSON.parse(localStorage.getItem("lu")!).id,
              content: comment,
              createdAt: new Date().toISOString(),
            });
          }}
          className="flex flex-col items-end"
        >
          <textarea
            className="w-full p-4 rounded-lg bg-white dark:bg-background-darkAlt3 outline-none shadow-md mb-4"
            placeholder={intl.formatMessage({ id: "forum.comment" })}
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <Button type="submit" variant="filled" color="yellow">
            {intl.formatMessage({ id: "common.send" })}
          </Button>
        </form>
      )}
      <div className="flex flex-col gap-4 my-8">
        {forum.comments.map((comment) => (
          <div className="p-4 rounded-xl bg-white dark:bg-background-darkAlt3/80 shadow">
            <h3 className="text-lg font-semibold text-text-light dark:text-text-dark">
              {getUserById(comment.author).user?.name ?? "-"}
            </h3>
            <p className="mt-2 text-base text-stext-light dark:text-stext-dark">
              {comment.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForumDetail;
