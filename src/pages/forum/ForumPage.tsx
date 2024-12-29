import { useEffect, useState } from "react";
import HeaderShort from "../../components/Header/HeaderShort";
import { DatePickerInput, DatesRangeValue } from "@mantine/dates";
import {
  Button,
  Input,
  Modal,
  Select,
  Textarea,
  TextInput,
} from "@mantine/core";
import { FaSortAmountDown, FaSortAmountDownAlt } from "react-icons/fa";
import { MdOutlineSort } from "react-icons/md";
import { FaFilter } from "react-icons/fa6";
import { TfiClose } from "react-icons/tfi";
import { useWindowWidth } from "../../hooks/windowsWidth";
import { motion } from "framer-motion";
import ForumItemFc from "../../components/Forum/Forum";
import { useIntl } from "react-intl";
import { addForum, Forum, User } from "../../interfaces/GlobalTypes";
import { useDisclosure } from "@mantine/hooks";
import { v4 as uuidv4 } from "uuid";

export const badges = ["Badge 1", "Badge 2", "Badge 3", "Badge 4", "Badge 5"];

const ForumPage = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const width = useWindowWidth();
  const [value, setValue] = useState<DatesRangeValue | undefined>(undefined);
  const [sortType, setSortType] = useState<"sıradan" | "enyeni" | "eneski">(
    "sıradan"
  );

  const [user, setUser] = useState<User | null>(null);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

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
  const [forumData, setForumData] = useState<Forum[]>([]);

  const getForums = () => {
    const forums: Forum[] = JSON.parse(localStorage.getItem("forums") || "[]");
    setForumData(forums);
  };

  const createForum = () => {
    addForum({
      id: uuidv4(),
      title,
      content,
      author: user!.id,
      comments: [],
      likes: 0,
      dislikes: 0,
      createdAt: new Date().toISOString(),
    });
    close();
  };

  useEffect(() => {
    if (width < 768) {
      setFilterBar(false);
    } else {
      setFilterBar(true);
    }
  }, [width]);

  useEffect(() => {
    getForums();
    const user: User = JSON.parse(localStorage.getItem("lu") || "{}");
    if (user) {
      setUser(user);
    }
  }, []);
  return (
    <>
      <div>
        <HeaderShort
          title={intl.formatMessage({ id: "forum.header.title" })}
          description={intl.formatMessage({ id: "forum.header.desc" })}
        />
        <div className="container px-2 mx-auto flex relative mb-8">
          <main className="flex-1 p-2">
            <div className="flex justify-between items-center border shadow bg-white border-background-lightAlt1 dark:border-background-darkAlt3 dark:bg-background-darkAlt3 p-3 rounded-xl">
              <div className="flex items-center gap-4">
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
                {user && (
                  <Button color="indigo" radius="md" size="md" onClick={open}>
                    Forum Oluştur
                  </Button>
                )}
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
                  <ForumItemFc key={item.id} item={item} />
                </motion.div>
              ))}
            </motion.div>
          </main>
        </div>
      </div>
      <Modal
        opened={opened}
        onClose={close}
        title="Blog Oluştur"
        size="xl"
        centered
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            createForum();
          }}
          className="flex flex-col gap-4"
        >
          <TextInput
            label={intl.formatMessage({ id: "forum.title" })}
            placeholder={intl.formatMessage({ id: "forum.title" })}
            required
            size="md"
            radius="md"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <Textarea
            label={intl.formatMessage({ id: "forum.description" })}
            placeholder={intl.formatMessage({ id: "forum.description" })}
            required
            size="md"
            radius="md"
            value={content}
            onChange={(e: any) => setContent(e.target.value)}
            rows={4}
          />
          <Button
            color="indigo"
            radius="md"
            size="md"
            type="submit"
            className="mt-4"
          >
            Olustur
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default ForumPage;
