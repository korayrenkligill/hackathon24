import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import map from "../../assets/json/tr-cities.json";
import { useState } from "react";
import { Button } from "@mantine/core";
import Event from "../../components/Event/Event";
import { motion } from "framer-motion";
import events from "../../assets/temp/events.json";
import { EventType } from "../../interfaces/Event";

interface geoMarker {
  name: string;
  coordinates: [number, number];
  eventCount: number;
  isMajor?: boolean;
}

const cities: geoMarker[] = [
  { name: "Adana", coordinates: [35.3213, 37.0025], eventCount: 5 },
  { name: "Adıyaman", coordinates: [38.2792, 37.7648], eventCount: 2 },
  { name: "Afyonkarahisar", coordinates: [30.5537, 38.7638], eventCount: 3 },
  { name: "Ağrı", coordinates: [43.0519, 39.7191], eventCount: 0 },
  { name: "Aksaray", coordinates: [34.0254, 38.3687], eventCount: 1 },
  { name: "Amasya", coordinates: [35.836, 40.6539], eventCount: 0 },
  {
    name: "Ankara",
    coordinates: [32.8597, 39.9334],
    eventCount: 10,
    isMajor: true,
  },
  {
    name: "Antalya",
    coordinates: [30.7133, 36.8969],
    eventCount: 8,
    isMajor: true,
  },
  { name: "Ardahan", coordinates: [42.7022, 41.1105], eventCount: 1 },
  { name: "Artvin", coordinates: [41.8194, 41.1839], eventCount: 0 },
  { name: "Aydın", coordinates: [27.8456, 37.8488], eventCount: 4 },
  { name: "Balıkesir", coordinates: [27.8848, 39.6484], eventCount: 2 },
  { name: "Bartın", coordinates: [32.337, 41.5811], eventCount: 1 },
  { name: "Batman", coordinates: [41.1322, 37.8812], eventCount: 3 },
  { name: "Bayburt", coordinates: [40.2261, 40.2552], eventCount: 1 },
  { name: "Bilecik", coordinates: [29.9793, 40.1423], eventCount: 0 },
  { name: "Bingöl", coordinates: [40.4939, 38.8848], eventCount: 2 },
  { name: "Bitlis", coordinates: [42.1014, 38.3938], eventCount: 1 },
  { name: "Bolu", coordinates: [31.6116, 40.7369], eventCount: 3 },
  { name: "Burdur", coordinates: [30.2889, 37.7186], eventCount: 1 },
  {
    name: "Bursa",
    coordinates: [29.061, 40.1826],
    eventCount: 10,
    isMajor: true,
  },
  { name: "Çanakkale", coordinates: [26.4086, 40.1553], eventCount: 2 },
  { name: "Çankırı", coordinates: [33.6266, 40.6013], eventCount: 1 },
  { name: "Çorum", coordinates: [34.9535, 40.5489], eventCount: 1 },
  { name: "Denizli", coordinates: [29.107, 37.7765], eventCount: 5 },
  { name: "Diyarbakır", coordinates: [40.2262, 37.9246], eventCount: 6 },
  { name: "Düzce", coordinates: [31.1611, 40.8385], eventCount: 1 },
  { name: "Edirne", coordinates: [26.5583, 41.6772], eventCount: 2 },
  { name: "Elazığ", coordinates: [39.221, 38.681], eventCount: 3 },
  { name: "Erzincan", coordinates: [39.75, 39.75], eventCount: 1 },
  { name: "Erzurum", coordinates: [41.2769, 39.9], eventCount: 4 },
  { name: "Eskişehir", coordinates: [30.5256, 39.7767], eventCount: 7 },
  { name: "Gaziantep", coordinates: [37.0662, 37.3833], eventCount: 9 },
  { name: "Giresun", coordinates: [38.3903, 40.9167], eventCount: 1 },
  { name: "Gümüşhane", coordinates: [39.4805, 40.4602], eventCount: 0 },
  { name: "Hakkari", coordinates: [43.7176, 37.583], eventCount: 0 },
  { name: "Hatay", coordinates: [36.4018, 36.5665], eventCount: 6 },
  { name: "Iğdır", coordinates: [44.044, 39.9215], eventCount: 1 },
  { name: "Isparta", coordinates: [30.5545, 37.7648], eventCount: 2 },
  {
    name: "İstanbul",
    coordinates: [28.9784, 41.0082],
    eventCount: 15,
    isMajor: true,
  },
  {
    name: "İzmir",
    coordinates: [27.1384, 38.4192],
    eventCount: 12,
    isMajor: true,
  },
  { name: "Kahramanmaraş", coordinates: [36.9371, 37.5745], eventCount: 5 },
  { name: "Karabük", coordinates: [32.6252, 41.204], eventCount: 1 },
  { name: "Karaman", coordinates: [33.2143, 37.1759], eventCount: 0 },
  { name: "Kars", coordinates: [43.095, 40.6052], eventCount: 1 },
  { name: "Kastamonu", coordinates: [33.7736, 41.3781], eventCount: 1 },
  { name: "Kayseri", coordinates: [35.4853, 38.7335], eventCount: 5 },
  { name: "Kırıkkale", coordinates: [33.5182, 39.8468], eventCount: 1 },
  { name: "Kırklareli", coordinates: [27.2235, 41.7351], eventCount: 1 },
  { name: "Kırşehir", coordinates: [34.1709, 39.1444], eventCount: 0 },
  { name: "Kilis", coordinates: [37.1203, 36.7164], eventCount: 1 },
  { name: "Kocaeli", coordinates: [29.9169, 40.7667], eventCount: 8 },
  { name: "Konya", coordinates: [32.4853, 37.8746], eventCount: 8 },
  { name: "Kütahya", coordinates: [29.9602, 39.4167], eventCount: 3 },
  { name: "Malatya", coordinates: [38.35, 38.3667], eventCount: 5 },
  { name: "Manisa", coordinates: [27.4261, 38.6191], eventCount: 4 },
  { name: "Mardin", coordinates: [40.7312, 37.3212], eventCount: 2 },
  { name: "Mersin", coordinates: [34.638, 36.8121], eventCount: 6 },
  { name: "Muğla", coordinates: [28.3667, 37.2153], eventCount: 7 },
  { name: "Muş", coordinates: [41.508, 38.9472], eventCount: 1 },
  { name: "Nevşehir", coordinates: [34.7139, 38.6244], eventCount: 1 },
  { name: "Niğde", coordinates: [34.6716, 37.9667], eventCount: 1 },
  { name: "Ordu", coordinates: [37.8791, 40.9833], eventCount: 1 },
  { name: "Osmaniye", coordinates: [36.248, 37.0658], eventCount: 3 },
  { name: "Rize", coordinates: [40.5194, 41.0201], eventCount: 1 },
  { name: "Sakarya", coordinates: [30.407, 40.7569], eventCount: 5 },
  { name: "Samsun", coordinates: [36.33, 41.2928], eventCount: 4 },
  { name: "Siirt", coordinates: [41.9323, 37.9333], eventCount: 0 },
  { name: "Sinop", coordinates: [35.1583, 42.0231], eventCount: 1 },
  { name: "Sivas", coordinates: [37.0167, 39.7477], eventCount: 4 },
  { name: "Şanlıurfa", coordinates: [38.7939, 37.1667], eventCount: 10 },
  { name: "Şırnak", coordinates: [42.483, 37.4187], eventCount: 1 },
  { name: "Tekirdağ", coordinates: [27.511, 40.978], eventCount: 3 },
  { name: "Tokat", coordinates: [36.5542, 40.3133], eventCount: 1 },
  { name: "Trabzon", coordinates: [39.7167, 41.0015], eventCount: 8 },
  { name: "Tunceli", coordinates: [39.55, 39.1167], eventCount: 1 },
  { name: "Uşak", coordinates: [29.4057, 38.6823], eventCount: 1 },
  { name: "Van", coordinates: [43.379, 38.4957], eventCount: 4 },
  { name: "Yalova", coordinates: [29.2747, 40.6552], eventCount: 1 },
  { name: "Yozgat", coordinates: [34.8147, 39.82], eventCount: 1 },
  { name: "Zonguldak", coordinates: [31.7943, 41.4564], eventCount: 2 },
];

const EventMap = () => {
  const containerVariants = {
    hidden: { opacity: 1 }, // Başlangıçta görünür, ama iç öğeler gizli
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4, // Her bir öğe arasında 0.2 saniye gecikme
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 }, // Yukarıda ve opaklık 0
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }, // Normal konumda ve opaklık 1
  };

  const [selectedCity, setSelectedCity] = useState<string | null>(null); // Tıklanan şehir

  const handleCityClick = (cityName: string) => {
    setSelectedCity(cityName); // Şehri state'e ata
    console.log(`Tıklanan şehir: ${cityName}`); // Konsola yazdır
  };
  return (
    <div>
      <div className="max-w-screen max-h-screen overflow-auto bg-gradient-to-r from-indigo-500 to-blue-500 dark:from-background-darkAlt3 dark:to-background-darkAlt2">
        <div className="h-[500px] w-[1100px] overflow-auto flex items-center justify-center mx-auto">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 3800,
              center: [35, 39],
            }}
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <Geographies geography={map}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const cityName = geo.properties.name; // Şehir adı
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onClick={() => handleCityClick(cityName)}
                      style={{
                        default: { fill: "#D6D6DA", outline: "none" },
                        hover: { fill: "#d65243", outline: "none" },
                        pressed: { fill: "#a33e33", outline: "none" },
                      }}
                    />
                  );
                })
              }
            </Geographies>

            {/* Marker ile şehirlerin koordinatlarına etkinlik sayıları ekle */}
            {cities.map(({ name, coordinates, eventCount, isMajor }) => (
              <Marker key={name} coordinates={coordinates}>
                <circle r={13} fill={"#FF0000"} stroke="#FFF" strokeWidth={1} />
                <text
                  textAnchor="middle"
                  y={5}
                  style={{
                    fontFamily: "Arial",
                    fontSize: "16px",
                    fill: "#FFF",
                    pointerEvents: "none", // Text hover edilemesin
                  }}
                >
                  {eventCount}
                </text>
                {/* Hover edildiğinde diğer şehirlerde göster */}
                {!isMajor && <title>{`${name}: ${eventCount} etkinlik`}</title>}
              </Marker>
            ))}
          </ComposableMap>
        </div>
        <div className=" px-4 py-2 text-white font-bold">
          Toplam {cities.reduce((total, city) => total + city.eventCount, 0)}{" "}
          etkinlik
        </div>
      </div>
      <div className="mx-auto container px-4">
        <div className="flex items-center justify-between gap-2 py-2">
          <h1 className="text-3xl font-semibold font-outfit">
            {selectedCity
              ? `Seçtiğiniz şehir ${selectedCity}`
              : "Şehir seciniz"}
          </h1>
          {selectedCity && (
            <Button
              variant="filled"
              color="red"
              className="text-white"
              onClick={() => setSelectedCity(null)}
            >
              Temizle
            </Button>
          )}
        </div>
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {selectedCity &&
            events.map((event, index) => (
              <motion.div variants={itemVariants} key={index}>
                <Event event={event as EventType} />
              </motion.div>
            ))}
        </motion.div>
      </div>
    </div>
  );
};

export default EventMap;
