import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useIntl } from "react-intl";

const ChatPopup = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const intl = useIntl();
  const [messages, setMessages] = useState<{ user: string; bot: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const apiKey = "AIzaSyDYvhseNa4K_WY3LdVpi3Po2G97QZQtkFc"; // .env dosyasından alınacak
  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "tunedModels/genclink-v3-dw5ywp8xfpv6",
  });

  const generationConfig = {
    temperature: 0.3,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { user: input, bot: "" }]);
    setLoading(true);

    try {
      const chatSession = model.startChat({
        generationConfig,
        // @ts-ignore
        history: messages.map((msg) => ({
          role: "user",
          parts: [msg.user], // Kullanıcı mesajını ekliyoruz
        })),
      });
      // @ts-ignore
      const result = await chatSession.sendMessage(input);
      setMessages((prev) => [
        ...prev,
        { user: input, bot: result.response.text() },
      ]);
    } catch (error) {
      console.error("Hata oluştu:", error);
      setMessages((prev) => [
        ...prev,
        { user: input, bot: "Üzgünüm, şu an yanıt veremiyorum." },
      ]);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  return (
    <div>
      {isOpen && (
        <div className="fixed bottom-0 left-0 w-full md:w-[400px] bg-white shadow-lg rounded-t-lg z-[1000] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-indigo-500 text-white px-4 py-3 flex items-center justify-between">
            <h3 className="text-lg font-semibold">ChatBot</h3>
            <button onClick={onClose} className="text-white">
              {intl.formatMessage({ id: "common.close" })}
            </button>
          </div>

          {/* Chat Content */}
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={index} className="mb-3">
                {msg.user && (
                  <p className="text-right text-blue-600">
                    {intl.formatMessage({ id: "common.user" })}: {msg.user}
                  </p>
                )}
                {msg.bot && (
                  <p className="text-left text-gray-800">Bot: {msg.bot}</p>
                )}
              </div>
            ))}
            {loading && (
              <p className="text-center text-gray-500">
                {intl.formatMessage({ id: "common.loading" })}..
              </p>
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t bg-gray-100 flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Mesaj yaz..."
              className="flex-1 px-3 py-2 border rounded-lg outline-none"
            />
            <button
              onClick={handleSendMessage}
              className="bg-indigo-500 text-white px-4 py-2 rounded-lg"
              disabled={loading}
            >
              {intl.formatMessage({ id: "common.send" })}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPopup;
