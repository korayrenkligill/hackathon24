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

const forumData: ForumItem[] = [
  {
    id: 1,
    title: "How to Create an Effective Design System for Your Team?",
    status: "Completed",
    category: "Bug",
    date: "2 days ago",
    commentsCount: 1,
    upvotes: 7,
    fire: true,
  },
  {
    id: 2,
    title: "Best Practices in UI Design: Tips and Tricks",
    status: "Completed",
    category: "Bug",
    date: "Apr 14",
    commentsCount: 5,
    upvotes: 3,
  },
  {
    id: 3,
    title:
      "The Impact of Design Systems on Brand Identity: Examples and Case Studies",
    status: "Completed",
    category: "Readings",
    date: "Mar 17",
    commentsCount: 3,
    upvotes: 5,
    fire: true,
  },
  {
    id: 4,
    title: "Design Trends 2024: What's the Future Holding?",
    status: "To-do",
    category: "Bug",
    date: "Mar 05",
    commentsCount: 0,
    upvotes: 8,
  },
];

export const badges = ["Badge 1", "Badge 2", "Badge 3", "Badge 4", "Badge 5"];

const ForumPage = () => {
  const width = useWindowWidth();
  const [value, setValue] = useState<DatesRangeValue | undefined>(undefined);
  const [sortType, setSortType] = useState<"sıradan" | "en yeni" | "en eski">(
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
      setSortType("en yeni");
    } else if (sortType === "en yeni") {
      setSortType("en eski");
    } else {
      setSortType("sıradan");
    }
  };

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
        title="Etkinlikleri Keşfet, Yeni Deneyimlere Katıl!"
        description="Yeni şeyler öğren, sosyalleş, ve hayalindeki deneyimleri yaşa."
      />
      <div className="container px-2 mx-auto flex relative mb-8">
        <div
          className={`p-0 md:p-2 w-full md:w-[320px] fixed md:relative top-[60px] md:top-auto z-[100] h-full md:h-auto transition-all duration-200`}
          style={{ left: filterBar ? "0%" : "-100%" }}
        >
          <div className="h-full flex flex-col gap-4 rounded-lg overflow-hidden border shadow bg-white border-background-lightAlt1 dark:border-background-darkAlt3 dark:bg-background-darkAlt3 p-3">
            <div className="flex flex-row items-center justify-between">
              <h1 className="text-lg font-semibold">Filtrele</h1>
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
              label="Zaman Aralığı"
              placeholder="Bir tarih seçiniz"
              size="md"
              radius="md"
              type="range"
              value={value}
              onChange={setValue}
            />

            <Select
              size="md"
              radius="md"
              label="Kategori"
              placeholder="Bir kategori seçin"
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
                Etkinlik Listesi
              </h1>
            </div>
            <Button
              rightSection={
                sortType === "sıradan" ? (
                  <MdOutlineSort />
                ) : sortType === "en yeni" ? (
                  <FaSortAmountDown />
                ) : (
                  <FaSortAmountDownAlt />
                )
              }
              variant="outline"
              color="gray"
              onClick={changeSort}
            >
              {sortType}
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
                <ForumItemFc key={item.id} item={item} />
              </motion.div>
            ))}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default ForumPage;
