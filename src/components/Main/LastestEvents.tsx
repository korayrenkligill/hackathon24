import { Carousel } from "@mantine/carousel";
import Event from "../Event/Event";
import { EventType } from "../../interfaces/Event";
import axios from "../../utils/axiosConfig";
import { ApiUrls } from "../../api/apiUrls";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";

const LastestEvents = () => {
  const intl = useIntl();
  const [events, setEvents] = useState<EventType[]>([]);
  const getEvents = async () => {
    try {
      await axios.get(ApiUrls.events.events).then((res) => {
        setEvents(res.data);
      });
    } catch (error: any) {
      console.log(error);
    }
  };
  useEffect(() => {
    getEvents();
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
              <Event event={event as EventType} />
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
