import { CiCalendarDate } from "react-icons/ci";
import { Link } from "react-router-dom";
import { FaUserFriends } from "react-icons/fa";
import { EventType } from "../../interfaces/Event";
import { formatDateToDayMonthYear } from "../../utils/dateConverter";
const Event = ({ event }: { event: EventType }) => {
  return (
    <div className="rounded-lg overflow-hidden border shadow border-background-lightAlt1 dark:border-background-darkAlt3 dark:bg-background-darkAlt3">
      <img
        src="https://placehold.co/300x150"
        alt=""
        className="h-[150px] w-full object-cover object-center"
      />
      <div className="p-4 flex flex-col gap-1 pt-6 relative border-t border-background-lightAlt2 dark:border-background-darkAlt2">
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-start">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600  to-indigo-600 dark:from-blue-400 dark:to-indigo-400 inline-block text-transparent bg-clip-text max-w-[200px]">
              <p className="line-clamp-1">{event.title}</p>
            </h1>
            <p className="text-sm text-text-light dark:text-text-dark line-clamp-1">
              {event.organizer.name}
            </p>
          </div>
          <div className="flex flex-col items-end justify-center">
            <div className="flex items-center gap-1 text-sm text-text-light dark:text-text-dark">
              <p>{formatDateToDayMonthYear(event.date)}</p>
              <CiCalendarDate />
            </div>
            {/* <div className="flex items-center gap-1 text-sm text-text-light dark:text-text-dark">
              <p>{event.location}</p>
              <MdOutlineLocationOn />
            </div> */}
          </div>
        </div>
        <p className="text-sm text-text-light dark:text-text-dark line-clamp-2">
          {event.description}
        </p>
        <div className="flex gap-2 items-center justify-between mt-2">
          <Link
            to={`/etkinlik-listesi`}
            className={`bg-indigo-500 text-white text-xs px-2 py-1 rounded-full hover:bg-indigo-600 transition-colors`}
          >
            Event tipi
          </Link>
          <p className="flex items-center gap-1 text-sm text-text-light dark:text-text-dark">
            {event.participants?.length}
            <FaUserFriends />
          </p>
        </div>
        <div className="absolute top-0 -translate-y-1/2 left-0 w-full flex items-center justify-center">
          <div className="flex items-center text-sm text-text-light dark:text-text-dark ">
            <img
              src="https://placehold.co/50x50/818cf8/4f46e5"
              className="w-[70px] h-[70px] relative rounded-full bg-background-lightAlt1 dark:bg-background-darkAlt3 p-1 border border-background-lightAlt2 dark:border-background-darkAlt2"
              alt=""
              style={{ zIndex: 2 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;
