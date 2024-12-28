import React, { useState } from "react";
import { motion } from "framer-motion";

// Section türü için bir arayüz oluşturuyoruz.
interface Section {
  title: string;
  content: string;
  color: string;
}

// Props için arayüz tanımlıyoruz.
interface BookSectionProps {
  sections: Section[];
}

const BookSection: React.FC<BookSectionProps> = ({ sections }) => {
  const [activeSection, setActiveSection] = useState<number | null>(null);

  const handleSectionClick = (index: number) => {
    setActiveSection(activeSection === index ? null : index);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="relative w-full max-w-6xl h-96 flex overflow-hidden">
        {sections.map((section, index) => (
          <motion.div
            key={index}
            className={`absolute top-0 left-0 h-full w-1/5 ${
              activeSection === index ? "z-10" : "z-0"
            }`}
            style={{
              left: `${index * 20}%`,
            }}
            animate={{
              scale: activeSection === index ? 1.2 : 1,
              x: activeSection === index ? "-5%" : "0%",
            }}
            transition={{ duration: 0.5 }}
          >
            <div
              className={`h-full bg-${section.color}-400 cursor-pointer rounded-lg shadow-md flex items-center justify-center`}
              onClick={() => handleSectionClick(index)}
            >
              <div className="text-white font-bold text-xl">
                {section.title}
              </div>
            </div>
            {activeSection === index && (
              <motion.div
                className="absolute top-0 left-0 w-full h-full bg-white p-4 shadow-lg overflow-auto rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h2 className="text-2xl font-bold text-gray-800">
                  {section.title}
                </h2>
                <p className="text-gray-600 mt-2">{section.content}</p>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BookSection;
