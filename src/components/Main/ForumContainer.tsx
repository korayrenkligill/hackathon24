import { useIntl } from "react-intl";
import ForumItemFc from "../Forum/Forum";
import { useEffect, useState } from "react";
import { Forum } from "../../interfaces/GlobalTypes";

const ForumContainer = () => {
  const intl = useIntl();
  const [forumData, setForumData] = useState<Forum[]>([]);
  const getForums = () => {
    const forum: Forum[] = JSON.parse(localStorage.getItem("forums") || "[]");
    if (forum.length > 10) {
      forum.slice(0, 10);
      setForumData(forum);
    } else {
      setForumData(forum);
    }
  };

  useEffect(() => {
    getForums();
  }, []);

  return (
    <div className="mb-20">
      <h1 className="flex flex-col text-3xl md:text-5xl font-bold text-blue-500 dark:text-stext-dark mb-8 font-outfit text-center group">
        💭 {intl.formatMessage({ id: "forum.title" })}
        <div className="h-1 w-full bg-gradient-to-r from-indigo-500 to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform"></div>
      </h1>
      <div className="p-4 bg-white dark:bg-background-darkAlt3 shadow-md rounded-lg">
        {forumData.map((item) => (
          <ForumItemFc key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ForumContainer;
