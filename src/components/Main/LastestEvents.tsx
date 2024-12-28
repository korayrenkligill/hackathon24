import { Carousel } from "@mantine/carousel";
import Event from "../Event/Event";
import events from "../../assets/temp/events.json";
import { EventType } from "../../interfaces/Event";

const LastestEvents = () => {
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
      {/* <h1 className="text-3xl font-bold uppercase text-center text-text-light dark:text-text-dark my-12">
        🎉 Son Etkinlikler
      </h1> */}
    </div>
  );
};

export default LastestEvents;
