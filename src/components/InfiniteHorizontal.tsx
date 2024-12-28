import React from "react";

interface Image {
  id: string;
  image: string;
}

interface ScrollingImagesProps {
  images: Image[];
  speed: number;
}

const InfiniteHorizontal: React.FC<ScrollingImagesProps> = ({
  images,
  speed,
}) => {
  return (
    <div className="relative w-full overflow-hidden h-20">
      <div className="absolute flex">
        <section
          className="flex gap-2 animate-swipe"
          style={{ "--speed": `${speed}ms` } as React.CSSProperties}
        >
          {images.map(({ id, image }) => (
            <div className="flex-shrink-0" key={id}>
              <img
                src={image}
                alt={id}
                className="w-[150px] h-20 object-cover px-3 last:px-0"
              />
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default InfiniteHorizontal;
