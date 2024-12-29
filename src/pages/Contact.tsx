import React from "react";
import { motion } from "framer-motion";

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <motion.div
        className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          İletişim
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Bizimle iletişime geçmek için aşağıdaki formu doldurun.
        </p>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-1">
            <label className="block text-gray-700 font-medium mb-2">
              Adınız
            </label>
            <input
              type="text"
              placeholder="Adınızı girin"
              className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="col-span-1">
            <label className="block text-gray-700 font-medium mb-2">
              E-posta
            </label>
            <input
              type="email"
              placeholder="E-posta adresinizi girin"
              className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-gray-700 font-medium mb-2">
              Mesajınız
            </label>
            <textarea
              placeholder="Mesajınızı yazın"
              className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
              rows={5}
            ></textarea>
          </div>
          <div className="col-span-2 text-center">
            <motion.button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Gönder
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ContactPage;
