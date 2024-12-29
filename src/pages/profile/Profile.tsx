import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import userAtom from "../../store/User";
import {
  addBlogToUser,
  Event as EventType,
  Forum,
  getEventsByOrganizer,
  getEventsByParticipant,
  getForumsByAuthor,
  removeEventById,
  removeForumById,
  updateUserProfile,
} from "../../interfaces/GlobalTypes";
import ForumItemFc from "../../components/Forum/Forum";
import Event from "../../components/Event/Event";
import { FaTrash, FaPen } from "react-icons/fa";
import { Button, FileButton, Modal, Textarea, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MdFileUpload } from "react-icons/md";
import { convertFileToBase64 } from "../../utils/imageToBase64";
const Profile: React.FC = ({}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const resetRef = useRef<() => void>(null);

  const [blog, setBlog] = useState<string>("");

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

  const [user, setUser] = useAtom(userAtom);
  const [myEvents, setMyEvents] = useState<EventType[]>([]);
  const [myParticipatedEvents, setMyParticipatedEvents] =
    useState<EventType[]>();
  const [myBlogs, setMyBlogs] = useState<string[]>([]);
  const [myForums, seyMyForums] = useState<Forum[]>([]);
  const [password, setPassword] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const formattedDate = new Date(user?.createdAt ?? "").toLocaleDateString(
    "tr-TR",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const UpdateUser = async () => {
    const image = file ? await convertFileToBase64(file) : "";

    const resp = updateUserProfile(user?.id ?? "", {
      profile: image,
      password: password,
    });

    if (!resp.isOk) {
      alert(resp.message);
      return;
    }
    close();
  };

  useEffect(() => {
    const _user = JSON.parse(localStorage.getItem("lu") || "{}");
    if (_user) {
      setUser(_user);
    }
    const forums = getForumsByAuthor(_user?.id ?? "").forums ?? [];
    seyMyForums(forums);
    const event = getEventsByOrganizer(_user?.id ?? "").events ?? [];
    setMyEvents(event);
    const event2 = getEventsByParticipant(_user?.id ?? "").events ?? [];
    setMyParticipatedEvents(event2);
    const blogs = getEventsByOrganizer(_user?.id ?? "").events ?? [];
    setMyBlogs(blogs);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="overflow-hidden"
    >
      <div className="h-[25vh] bg-gradient-to-r from-indigo-500 to-blue-500 dark:from-background-darkAlt3 dark:to-background-darkAlt2 relative px-4">
        <button
          className="absolute top-3 right-3 text-yellow-500 dark:text-yellow-400 z-10"
          onClick={open}
        >
          <FaPen />
        </button>
      </div>
      <div className="p-6 bg-gradient-to-r from-indigo-500 to-blue-500 dark:from-background-darkAlt3 dark:to-background-darkAlt2">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="relative -mt-28 w-48 h-48 mx-auto rounded-full border-4 border-white bg-gray-300 flex items-center justify-center text-2xl font-bold"
        >
          <img
            src={user?.profile}
            alt="profile"
            className="w-full h-full object-cover rounded-full"
          />
        </motion.div>
        <h2 className="text-center text-2xl font-semibold mt-4 text-text-dark">
          {user?.name}
        </h2>
        {/* <p className="text-center text-gray-600">{user?.toUpperCase()}</p> */}
        <p className="text-center text-sm text-stext-dark">
          Katılım Tarihi: {formattedDate}
        </p>

        <div className="flex items-center justify-center gap-4 mt-6 text-center">
          <div>
            <h3 className="text-lg font-medium text-stext-dark">Email:</h3>
            <p className="text-white break-words ">{user?.email}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col p-6 gap-6 justify-center items-center">
        <div className="w-full flex flex-col items-center gap-4">
          <Textarea
            placeholder="Hakkında"
            value={blog}
            className="w-full max-w-[600px]"
            rows={6}
            onChange={(e) => {
              setBlog(e.target.value);
            }}
          />
          <button
            onClick={() => {
              addBlogToUser(user?.id ?? "", blog);
            }}
          >
            Blog Ekle
          </button>
        </div>
        <div>
          <h3 className="text-lg font-medium text-center">Bloglar: </h3>
          {user?.blogs && user?.blogs.length > 0 ? (
            <div className="flex flex-wrap gap-2 mt-2">
              {user?.blogs.map((blog, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm shadow-md"
                >
                  {blog}
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Henüz blog yok.</p>
          )}
        </div>
        <div className="w-full">
          <h3 className="text-lg font-medium text-center">Eventler:</h3>
          {user?.userType !== "genc" && myEvents && myEvents.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-4">
              {myEvents.map((event, index) => (
                <div key={index} className="relative">
                  <button
                    className="absolute top-3 left-3 text-red-500 dark:text-red-400 z-10"
                    onClick={() => {
                      removeEventById(event.id);
                    }}
                  >
                    <FaTrash />
                  </button>
                  <Event event={event} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Henüz Event yok.</p>
          )}
        </div>
        <div className="w-full">
          <h3 className="text-lg font-medium text-center">
            Katılınan Eventler:
          </h3>
          {myParticipatedEvents && myParticipatedEvents.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-4">
              {myParticipatedEvents.map((event, index) => (
                <div key={index} className="relative">
                  <Event event={event} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Henüz Event yok.</p>
          )}
        </div>
        <div className="w-full">
          <h3 className="text-lg font-medium text-center">Forumlar:</h3>
          {myForums && myForums.length > 0 ? (
            <motion.div
              className="mt-4 p-4 bg-white dark:bg-background-darkAlt3 shadow-md rounded-lg"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {myForums.map((item) => (
                <motion.div className="relative" variants={itemVariants}>
                  <button
                    className="absolute top-2 right-2 text-red-500 dark:text-red-400"
                    onClick={() => {
                      removeForumById(item.id);
                    }}
                  >
                    <FaTrash />
                  </button>
                  <ForumItemFc key={item.id} item={item} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <p className="text-gray-500">Henüz forum yok.</p>
          )}
        </div>
        <div>
          <h3 className="text-lg font-medium text-center">Rozetler:</h3>
          {user?.badges && user?.badges.length > 0 ? (
            <div className="flex flex-wrap gap-2 mt-2">
              {user?.badges.map((badge, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm shadow-md"
                >
                  {badge.name}
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Henüz rozet yok.</p>
          )}
        </div>
      </div>
      <Modal
        opened={opened}
        onClose={close}
        title="Authentication"
        centered
        size={"xl"}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            UpdateUser();
          }}
        >
          <TextInput
            label="Şifre"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            size="md"
            radius="md"
          />
          <div>
            <FileButton
              resetRef={resetRef}
              onChange={setFile}
              accept="image/png,image/jpeg"
            >
              {(props) => (
                <Button
                  leftSection={<MdFileUpload />}
                  size="md"
                  radius="md"
                  {...props}
                  className="mt-4"
                >
                  Upload image
                </Button>
              )}
            </FileButton>
            {file && <p>Picked file: {file.name}</p>}
            <Button
              variant="filled"
              color="green"
              type="submit"
              size="md"
              radius="md"
              className="mt-4 w-full"
            >
              Kaydet
            </Button>
          </div>
        </form>
      </Modal>
    </motion.div>
  );
};

export default Profile;

// Kullanım örneği:
// <Profile
//   name="community"
//   email="community@gmail.com"
//   userType="community"
//   badges={[]}
//   createdAt="2024-12-28T06:25:14.482Z"
// />
