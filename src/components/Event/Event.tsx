import { CiCalendarDate } from "react-icons/ci";
import { Link } from "react-router-dom";
import { FaUserFriends } from "react-icons/fa";
import { formatDateToDayMonthYear } from "../../utils/dateConverter";
import { useDisclosure } from "@mantine/hooks";
import { Button, Modal } from "@mantine/core";
import QRCode from "react-qr-code";
import {
  addParticipantToEvent,
  Event as EventType,
  getUserById,
  User,
} from "../../interfaces/GlobalTypes";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useIntl } from "react-intl";
const Event = ({ event }: { event: EventType }) => {
  const [report, setRerport] = useState(false);
  const intl = useIntl();
  const [opened, { open, close }] = useDisclosure(false);
  const [organizer, setOrganizer] = useState<User>();

  useEffect(() => {
    const users = localStorage.getItem("users");
    if (users) {
      JSON.parse(users).forEach((user: User) => {
        if (user.id === event.organizer) {
          setOrganizer(user);
        }
      });
    }
  }, []);
  const qrRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div
        className="relative cursor-pointer rounded-lg overflow-hidden border shadow border-background-lightAlt1 dark:border-background-darkAlt3 dark:bg-background-darkAlt3"
        onClick={open}
      >
        <img
          src={event.image}
          alt={event.title}
          className="h-[180px] w-full object-cover object-center"
        />
        <div className="p-3 flex flex-col gap-1 relative border-t border-background-lightAlt2 dark:border-background-darkAlt2">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-start">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600  to-indigo-600 dark:from-blue-400 dark:to-indigo-400 inline-block text-transparent bg-clip-text max-w-[200px]">
                <p className="line-clamp-1">{event.title}</p>
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <img
                  src={
                    organizer?.profile ??
                    "https://png.pngtree.com/png-vector/20221203/ourmid/pngtree-cartoon-style-male-user-profile-icon-vector-illustraton-png-image_6489287.png"
                  }
                  className="w-[40px] h-[40px] relative rounded-full bg-indigo-700 p-1 border border-background-lightAlt2 dark:border-background-darkAlt2"
                  alt=""
                  style={{ zIndex: 2 }}
                />
                <p className="text-base text-text-light dark:text-text-dark line-clamp-1">
                  {organizer?.name ?? "-"}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end justify-center">
              <div className="flex items-center gap-1 text-base text-text-light dark:text-text-dark">
                <p>{formatDateToDayMonthYear(event.date)}</p>
                <CiCalendarDate />
              </div>
              <div className="flex items-center gap-1 text-base text-text-light dark:text-text-dark mt-auto">
                <p>{intl.formatMessage({ id: "event.report" })}</p>
              </div>
            </div>
          </div>
          <div className="flex gap-2 items-center justify-between mt-2">
            {/* <p className="text-base text-text-light dark:text-text-dark line-clamp-2">
              {stripHtmlTags(event.description)}
            </p> */}
            <div className="flex gap-1 flex-wrap">
              {event.categories.map((category, index) => (
                <p
                  key={index}
                  className="text-xs text-white line-clamp-1 bg-indigo-500 p-1 rounded-full"
                >
                  {category}
                </p>
              ))}
            </div>
          </div>
        </div>
        {event.type === "katılım" && (
          <p className="absolute top-2 right-2 bg-black/50 py-1 px-2 rounded-full flex items-center gap-1 text-base text-text-light dark:text-text-dark">
            {event.participants?.length}
            <FaUserFriends />
          </p>
        )}
      </div>
      <Modal
        opened={opened}
        onClose={close}
        title={event.title}
        centered
        size="xl"
      >
        <div
          className="relative cursor-pointer rounded-lg overflow-hidden border shadow border-background-lightAlt1 dark:border-background-darkAlt3 dark:bg-background-darkAlt3"
          onClick={open}
        >
          <img
            src={event.image}
            alt={event.title}
            className="h-[180px] w-full object-cover object-center"
          />
          <div className="p-3 flex flex-col gap-1 relative border-t border-background-lightAlt2 dark:border-background-darkAlt2">
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-start">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600  to-indigo-600 dark:from-blue-400 dark:to-indigo-400 inline-block text-transparent bg-clip-text max-w-[200px]">
                  <p className="line-clamp-1">{event.title}</p>
                </h1>
                <div className="flex items-center gap-2 mt-2">
                  <img
                    src={
                      organizer?.profile ??
                      "https://png.pngtree.com/png-vector/20221203/ourmid/pngtree-cartoon-style-male-user-profile-icon-vector-illustraton-png-image_6489287.png"
                    }
                    className="w-[40px] h-[40px] relative rounded-full bg-indigo-700 p-1 border border-background-lightAlt2 dark:border-background-darkAlt2"
                    alt=""
                    style={{ zIndex: 2 }}
                  />
                  <p className="text-base text-text-light dark:text-text-dark line-clamp-1">
                    {organizer?.name ?? "-"}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end justify-center">
                <div className="flex items-center gap-1 text-base text-text-light dark:text-text-dark">
                  <p>{formatDateToDayMonthYear(event.date)}</p>
                  <CiCalendarDate />
                </div>
                <div
                  onClick={() => setRerport(true)}
                  className="flex items-center gap-1 text-base text-text-light dark:text-text-dark mt-auto"
                >
                  <p>
                    {report
                      ? intl.formatMessage({ id: "event.reported" })
                      : intl.formatMessage({ id: "event.report" })}
                  </p>
                </div>
              </div>
            </div>
            <p
              className="text-base text-text-light dark:text-text-dark my-4"
              dangerouslySetInnerHTML={{ __html: event.description }}
            ></p>
            <div className="flex gap-2 items-center justify-between mt-2">
              <div className="flex gap-1 flex-wrap">
                {event.categories.map((category, index) => (
                  <p
                    key={index}
                    className="text-xs text-white line-clamp-1 bg-indigo-500 p-1 rounded-full"
                  >
                    {category}
                  </p>
                ))}
              </div>
            </div>
          </div>
          {event.type === "katılım" && (
            <p className="absolute top-2 right-2 bg-black/50 py-1 px-2 rounded-full flex items-center gap-1 text-base text-text-light dark:text-text-dark">
              {event.participants?.length}
              <FaUserFriends />
            </p>
          )}
        </div>
        {event.organizer === JSON.parse(localStorage.getItem("lu")!).id && (
          <>
            <div ref={qrRef} className="p-4">
              <QRCode value={`https://www.instagram.com/dpubbt/`} size={128} />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex align-center gap-2 mt-2">
                <p>Katılımcılar</p>
                <p>
                  {event.participants?.length}{" "}
                  {intl.formatMessage({ id: "event.participants" })}
                </p>
              </div>
              <div className="p-2 rounded-xl bg-background-lightAlt1 dark:bg-background-darkAlt1">
                {event.participants?.map((participant) => {
                  let partici = getUserById(participant).user;
                  return (
                    <div className="flex items-center gap-2">
                      <img
                        src={
                          partici?.profile ??
                          "https://png.pngtree.com/png-vector/20221203/ourmid/pngtree-cartoon-style-male-user-profile-icon-vector-illustraton-png-image_6489287.png"
                        }
                        className="w-[40px] h-[40px] relative rounded-full bg-indigo-700 p-1 border border-background-lightAlt2 dark:border-background-darkAlt2"
                        alt=""
                        style={{ zIndex: 2 }}
                      />
                      <p className="text-base text-text-light dark:text-text-dark line-clamp-1">
                        {partici?.name}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
        {event.organizer !== JSON.parse(localStorage.getItem("lu")!).id &&
          event.type === "katılım" &&
          localStorage.getItem("lu") && (
            <Button
              variant="filled"
              color="indigo"
              onClick={() => {
                if (
                  event.participants?.includes(
                    JSON.parse(localStorage.getItem("lu")!).id
                  )
                ) {
                  toast.warn("Zaten katılımınız var");
                } else {
                  const resp = addParticipantToEvent(
                    event.id,
                    JSON.parse(localStorage.getItem("lu")!).id
                  );
                  if (resp.isOk) toast.success("Etkinliğe katıldınız!");
                }
              }}
              className="mt-5 w-full"
            >
              {intl.formatMessage({ id: "event.participate" })}
            </Button>
          )}
        {event.organizer !== JSON.parse(localStorage.getItem("lu")!).id &&
          event.type === "bağlantı" && (
            <Button
              variant="filled"
              color="indigo"
              onClick={() => {
                window.open(event.url, "_blank");
              }}
              className="mt-5 w-full"
            >
              {intl.formatMessage({ id: "event.goLink" })}
            </Button>
          )}
      </Modal>
    </>
  );
};

export default Event;
