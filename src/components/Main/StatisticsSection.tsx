import React, { useEffect, useState, useRef } from "react";

interface CounterProps {
  start: number;
  end: number;
  duration: number; // in milliseconds
  layers: { opacity: number; duration: number }[]; // Shadow layers
}

const Counter: React.FC<CounterProps> = ({ start, end, duration, layers }) => {
  const [value, setValue] = useState(start);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      const stepTime = duration / (end - start);
      const interval = setInterval(() => {
        setValue((prev) => {
          if (prev < end) {
            return prev + 1;
          } else {
            clearInterval(interval);
            return prev;
          }
        });
      }, stepTime);

      return () => clearInterval(interval);
    }
  }, [isVisible, start, end, duration]);

  return (
    <div className="relative text-center mt-8" ref={counterRef}>
      {/* Main Number */}
      <span className="inset-0 text-6xl font-bold text-blue-600">{value}+</span>
      {/* Shadows */}
      {layers.map((layer, index) => (
        <span
          key={index}
          className={`absolute inset-0 text-6xl font-bold text-blue-600`}
          style={{
            opacity: layer.opacity,
            transform: `translateY(${(index + 1) * -25}px)`,
            animation: `fade-in ${layer.duration}ms linear`,
          }}
        >
          {value}+
        </span>
      ))}
    </div>
  );
};

const StatisticsSection = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-background-lightAlt1 dark:bg-background-darkAlt2 py-20 text-center">
      <h1 className="text-3xl font-bold text-blue-800 mb-10">
        We Grow Together
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
        <div>
          <Counter
            start={0}
            end={150}
            duration={500}
            layers={[
              { opacity: 0.2, duration: 5000 },
              { opacity: 0.1, duration: 15000 },
            ]}
          />
          <p className="text-lg text-blue-500 mt-2">Değer 1</p>
        </div>
        <div>
          <Counter
            start={0}
            end={760}
            duration={500}
            layers={[
              { opacity: 0.2, duration: 5000 },
              { opacity: 0.1, duration: 15000 },
            ]}
          />
          <p className="text-lg text-blue-500 mt-2">Değer 2</p>
        </div>
        <div>
          <Counter
            start={0}
            end={100}
            duration={500}
            layers={[
              { opacity: 0.2, duration: 5000 },
              { opacity: 0.1, duration: 15000 },
            ]}
          />
          <p className="text-lg text-blue-500 mt-2">Değer 3</p>
        </div>
        <div>
          <Counter
            start={0}
            end={275}
            duration={500}
            layers={[
              { opacity: 0.2, duration: 5000 },
              { opacity: 0.1, duration: 15000 },
            ]}
          />
          <p className="text-lg text-blue-500 mt-2">Değer 4</p>
        </div>
      </div>
    </div>
  );
};

export default StatisticsSection;
