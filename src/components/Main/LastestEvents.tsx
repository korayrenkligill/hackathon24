import { Carousel } from "@mantine/carousel";
import Event from "../Event/Event";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import {
  Event as EventType,
  getLastAddedEvents,
} from "../../interfaces/GlobalTypes";

const LastestEvents = () => {
  const intl = useIntl();
  const [events, setEvents] = useState<EventType[]>([]);

  useEffect(() => {
    const storedEvents = getLastAddedEvents();
    setEvents(storedEvents);
  }, []);

  return (
    <div className="my-12">
      <Carousel
        withIndicators
        slideSize={{ base: "100%", sm: "50%", md: "30%" }}
        loop
        align="start"
        slidesToScroll={3}
        dragFree
        withControls={false}
      >
        {events.map((event, index) => (
          <Carousel.Slide key={index}>
            <div className="p-2">
              <Event event={event} />
            </div>
          </Carousel.Slide>
        ))}
      </Carousel>
      <Link
        to="/etkinlik-listesi"
        className="block text-2xl font-bold font-outfit uppercase text-center text-text-light dark:text-text-dark my-12"
      >
        🎉 {intl.formatMessage({ id: "common.forMore" })}{" "}
        <span className="inline-block -rotate-45">☝️</span>
      </Link>
    </div>
  );
};

export default LastestEvents;
