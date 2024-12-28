import { useEffect, useState } from "react";
import HeaderShort from "../../components/Header/HeaderShort";
import { DatePickerInput, DatesRangeValue } from "@mantine/dates";
import { Button, Select } from "@mantine/core";
import { FaSortAmountDown, FaSortAmountDownAlt } from "react-icons/fa";
import { MdOutlineSort } from "react-icons/md";
import { FaFilter } from "react-icons/fa6";
import { TfiClose } from "react-icons/tfi";
import { useWindowWidth } from "../../hooks/windowsWidth";
import { motion } from "framer-motion";
import ForumItemFc, { ForumItem } from "../../components/Forum/Forum";
import { useIntl } from "react-intl";
import axios from "axios";
import { ApiUrls } from "../../api/apiUrls";

export const badges = ["Badge 1", "Badge 2", "Badge 3", "Badge 4", "Badge 5"];

const ForumPage = () => {
  const width = useWindowWidth();
  const [value, setValue] = useState<DatesRangeValue | undefined>(undefined);
  const [sortType, setSortType] = useState<"sıradan" | "enyeni" | "eneski">(
    "sıradan"
  );

  const [filterBar, setFilterBar] = useState<boolean>(false);

  const containerVariants = {
    hidden: { opacity: 1 }, // Başlangıçta görünür, ama iç öğeler gizli
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Her bir öğe arasında 0.2 saniye gecikme
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 }, // Yukarıda ve opaklık 0
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }, // Normal konumda ve opaklık 1
  };

  const changeSort = () => {
    if (sortType === "sıradan") {
      setSortType("enyeni");
    } else if (sortType === "enyeni") {
      setSortType("eneski");
    } else {
      setSortType("sıradan");
    }
  };

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

  useEffect(() => {
    if (width < 768) {
      setFilterBar(false);
    } else {
      setFilterBar(true);
    }
  }, [width]);
  return (
    <div>
      <HeaderShort
        title={intl.formatMessage({ id: "forum.header.title" })}
        description={intl.formatMessage({ id: "forum.header.desc" })}
      />
      <div className="container px-2 mx-auto flex relative mb-8">
        <div
          className={`p-0 md:p-2 w-full md:w-[320px] fixed md:relative top-[80px] md:top-auto z-[100] h-full md:h-auto transition-all duration-200`}
          style={{ left: filterBar ? "0%" : "-100%" }}
        >
          <div className="h-full flex flex-col gap-4 rounded-lg overflow-hidden border shadow bg-white border-background-lightAlt1 dark:border-background-darkAlt3 dark:bg-background-darkAlt3 p-3">
            <div className="flex flex-row items-center justify-between">
              <h1 className="text-lg font-semibold">
                {intl.formatMessage({ id: "common.filter" })}
              </h1>
              <Button
                variant="transparent"
                color="gray"
                className="md:hidden"
                onClick={() => setFilterBar(false)}
              >
                <TfiClose />
              </Button>
            </div>
            <DatePickerInput
              label={intl.formatMessage({ id: "common.timeRange" })}
              size="md"
              radius="md"
              type="range"
              value={value}
              onChange={setValue}
            />

            <Select
              size="md"
              radius="md"
              label={intl.formatMessage({ id: "common.category" })}
              data={badges}
              searchable
              classNames={{
                input:
                  "border-gray-300 focus:border-blue-500 focus:ring-blue-500",
              }}
            />
          </div>
        </div>
        <main className="flex-1 p-2">
          <div className="flex justify-between items-center border shadow bg-white border-background-lightAlt1 dark:border-background-darkAlt3 dark:bg-background-darkAlt3 p-3 rounded-xl">
            <div className="flex items-center">
              <Button
                onClick={() => setFilterBar(true)}
                variant="transparent"
                color="gray"
                className="md:hidden"
              >
                <FaFilter />
              </Button>
              <h1 className="text-xl font-bold font-outfit text-indigo-500 dark:text-stext-dark">
                {intl.formatMessage({ id: "forum.title" })}
              </h1>
            </div>
            <Button
              rightSection={
                sortType === "sıradan" ? (
                  <MdOutlineSort />
                ) : sortType === "enyeni" ? (
                  <FaSortAmountDown />
                ) : (
                  <FaSortAmountDownAlt />
                )
              }
              variant="outline"
              color="gray"
              onClick={changeSort}
            >
              {intl.formatMessage({ id: `sort.${sortType}` })}
            </Button>
          </div>
          <motion.div
            className="mt-4 p-4 bg-white dark:bg-background-darkAlt3 shadow-md rounded-lg"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {forumData.map((item) => (
              <motion.div variants={itemVariants}>
                <ForumItemFc key={item._id} item={item} />
              </motion.div>
            ))}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default ForumPage;
