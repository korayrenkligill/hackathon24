import { useIntl } from "react-intl";
import ForumItemFc, { ForumItem } from "../Forum/Forum";
import { useEffect, useState } from "react";
import axios from "axios";
import { ApiUrls } from "../../api/apiUrls";

const ForumContainer = () => {
  const intl = useIntl();
  const [forumData, setForumData] = useState<ForumItem[]>([]);

  const fetchForumData = async () => {
    try {
      await axios.get(ApiUrls.forum.forums).then((res) => {
        setForumData(res.data);
      });
    } catch (error) {
      console.error("Error fetching forum data:", error);
    }
  };

  useEffect(() => {
    fetchForumData();
  }, []);

  return (
    <div className="mb-20">
      <h1 className="flex flex-col text-3xl md:text-5xl font-bold text-blue-500 dark:text-stext-dark mb-8 font-outfit text-center group">
        💭 {intl.formatMessage({ id: "forum.title" })}
        <div className="h-1 w-full bg-gradient-to-r from-indigo-500 to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform"></div>
      </h1>
      <div className="p-4 bg-white dark:bg-background-darkAlt3 shadow-md rounded-lg">
        {forumData.map((item) => (
          <ForumItemFc key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ForumContainer;
