import { useEffect, useState } from "react";
import HeaderShort from "../../components/Header/HeaderShort";
import { DatePickerInput, DatesRangeValue } from "@mantine/dates";
import { Button, Select } from "@mantine/core";
import { FaSortAmountDown, FaSortAmountDownAlt } from "react-icons/fa";
import { MdOutlineSort } from "react-icons/md";
import Event from "../../components/Event/Event";
import { FaFilter } from "react-icons/fa6";
import { TfiClose } from "react-icons/tfi";
import { useWindowWidth } from "../../hooks/windowsWidth";
import { motion } from "framer-motion";
import { EventType } from "../../interfaces/Event";
import axios from "../../utils/axiosConfig";
import { ApiUrls } from "../../api/apiUrls";
import { useAtomValue } from "jotai";
import userAtom from "../../store/User";
import { useNavigate } from "react-router-dom";

export const cities = [
  "Adana",
  "Adıyaman",
  "Afyonkarahisar",
  "Ağrı",
  "Aksaray",
  "Amasya",
  "Ankara",
  "Antalya",
  "Ardahan",
  "Artvin",
  "Aydın",
  "Balıkesir",
  "Bartın",
  "Batman",
  "Bayburt",
  "Bilecik",
  "Bingöl",
  "Bitlis",
  "Bolu",
  "Burdur",
  "Bursa",
  "Çanakkale",
  "Çankırı",
  "Çorum",
  "Denizli",
  "Diyarbakır",
  "Düzce",
  "Edirne",
  "Elazığ",
  "Erzincan",
  "Erzurum",
  "Eskişehir",
  "Gaziantep",
  "Giresun",
  "Gümüşhane",
  "Hakkari",
  "Hatay",
  "Iğdır",
  "Isparta",
  "İstanbul",
  "İzmir",
  "Kahramanmaraş",
  "Karabük",
  "Karaman",
  "Kars",
  "Kastamonu",
  "Kayseri",
  "Kırıkkale",
  "Kırklareli",
  "Kırşehir",
  "Kilis",
  "Kocaeli",
  "Konya",
  "Kütahya",
  "Malatya",
  "Manisa",
  "Mardin",
  "Mersin",
  "Muğla",
  "Muş",
  "Nevşehir",
  "Niğde",
  "Ordu",
  "Osmaniye",
  "Rize",
  "Sakarya",
  "Samsun",
  "Siirt",
  "Sinop",
  "Sivas",
  "Şanlıurfa",
  "Şırnak",
  "Tekirdağ",
  "Tokat",
  "Trabzon",
  "Tunceli",
  "Uşak",
  "Van",
  "Yalova",
  "Yozgat",
  "Zonguldak",
];
export const badges = ["Badge 1", "Badge 2", "Badge 3", "Badge 4", "Badge 5"];

const EventListPage = () => {
  const width = useWindowWidth();
  const user = useAtomValue(userAtom);
  const navigation = useNavigate();

  const [value, setValue] = useState<DatesRangeValue | undefined>(undefined);
  const [sortType, setSortType] = useState<"sıradan" | "en yeni" | "en eski">(
    "sıradan"
  );

  const [filterBar, setFilterBar] = useState<boolean>(false);

  const containerVariants = {
    hidden: { opacity: 1 }, // Başlangıçta görünür, ama iç öğeler gizli
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Her bir öğe arasında 0.2 saniye gecikme
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 }, // Yukarıda ve opaklık 0
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }, // Normal konumda ve opaklık 1
  };

  const changeSort = () => {
    if (sortType === "sıradan") {
      setSortType("en yeni");
    } else if (sortType === "en yeni") {
      setSortType("en eski");
    } else {
      setSortType("sıradan");
    }
  };

  useEffect(() => {
    if (width < 768) {
      setFilterBar(false);
    } else {
      setFilterBar(true);
    }
  }, [width]);

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
    <div>
      <HeaderShort
        title="Etkinlikleri Keşfet, Yeni Deneyimlere Katıl!"
        description="Yeni şeyler öğren, sosyalleş, ve hayalindeki deneyimleri yaşa."
      />
      <div className="container px-2 mx-auto flex relative mb-8">
        <div
          className={`p-0 md:p-2 w-full md:w-[320px] fixed md:relative top-[80px] md:top-auto z-[100] h-full md:h-auto transition-all duration-200`}
          style={{ left: filterBar ? "0%" : "-100%" }}
        >
          <div className="h-full flex flex-col gap-4 rounded-lg overflow-hidden border shadow bg-white border-background-lightAlt1 dark:border-background-darkAlt3 dark:bg-background-darkAlt3 p-3">
            <div className="flex flex-row items-center justify-between">
              <h1 className="text-lg font-semibold">Filtrele</h1>
              <Button
                variant="transparent"
                color="gray"
                className="md:hidden"
                onClick={() => setFilterBar(false)}
              >
                <TfiClose />
              </Button>
            </div>
            {user && user.userType !== "young" && (
              <Button
                color="indigo"
                radius="md"
                size="md"
                onClick={() => {
                  navigation("/etkinlik-olustur");
                }}
              >
                Etkinlik Oluştur
              </Button>
            )}
            <DatePickerInput
              label="Zaman Aralığı"
              placeholder="Bir tarih seçiniz"
              size="md"
              radius="md"
              type="range"
              value={value}
              onChange={setValue}
            />
            <Select
              size="md"
              radius="md"
              label="Şehir"
              placeholder="Bir şehir seçin"
              data={cities}
              searchable
              classNames={{
                input:
                  "border-gray-300 focus:border-blue-500 focus:ring-blue-500",
              }}
            />
            <Select
              size="md"
              radius="md"
              label="Kategori"
              placeholder="Bir kategori seçin"
              data={badges}
              searchable
              classNames={{
                input:
                  "border-gray-300 focus:border-blue-500 focus:ring-blue-500",
              }}
            />
          </div>
        </div>
        <main className="flex-1 p-2">
          <div className="flex justify-between items-center border shadow bg-white border-background-lightAlt1 dark:border-background-darkAlt3 dark:bg-background-darkAlt3 p-3 rounded-xl">
            <div className="flex items-center">
              <Button
                onClick={() => setFilterBar(true)}
                variant="transparent"
                color="gray"
                className="md:hidden"
              >
                <FaFilter />
              </Button>
              <h1 className="text-xl font-bold font-outfit text-indigo-500 dark:text-stext-dark">
                Etkinlik Listesi
              </h1>
            </div>
            <Button
              rightSection={
                sortType === "sıradan" ? (
                  <MdOutlineSort />
                ) : sortType === "en yeni" ? (
                  <FaSortAmountDown />
                ) : (
                  <FaSortAmountDownAlt />
                )
              }
              variant="outline"
              color="gray"
              onClick={changeSort}
            >
              {sortType}
            </Button>
          </div>
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {events.map((event, index) => (
              <motion.div variants={itemVariants}>
                <Event event={event as EventType} />
              </motion.div>
            ))}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default EventListPage;
