import { TfiWorld } from "react-icons/tfi";
import { BsCalendar2DateFill } from "react-icons/bs";
import { FaCircleUser } from "react-icons/fa6";
import { FaMoneyCheckAlt, FaChartLine } from "react-icons/fa";
import { IoMdCube } from "react-icons/io";

export const provides = [
  {
    name: "Etkinlik Listesi",
    icon: <TfiWorld />,
    description:
      " Etkinlik Listesi, kullanıcıların yaklaşan etkinliklere kolayca göz atmasını ve katılım sağlamasını mümkün kılar",
    link: "/etkinlikler",
  },
  {
    name: "Etkinlik Haritası",
    icon: <BsCalendar2DateFill />,
    description:
      "Etkinlik Harita sayfası, kullanıcıların etkinliklerin konumlarını bir harita üzerinden görerek katılım detaylarına kolayca erişmesini sağlar.",
    link: "/etkinlikler",
  },
  {
    name: "Kullanıcı Forumu",
    icon: <FaCircleUser />,
    description:
      "Forum bölümü, kullanıcıların sorularını paylaşabileceği, fikir alışverişinde bulunabileceği ve sosyalleşebileceği bir alan sunar.",
    link: "/etkinlikler",
  },
  {
    name: "Ödüller",
    icon: <FaChartLine />,
    description:
      "Ödüller sayfası, etkinliklerde kazanılan rozetlerin ve ödüllerin detaylarını görüntülemek ve kullanıcıları platformda aktif olmaya teşvik etmek amacıyla tasarlanmıştır.",
    link: "/etkinlikler",
  },
  {
    name: "Hakkımızda",
    icon: <FaMoneyCheckAlt />,
    description:
      " İletişim sayfası, kullanıcıların platformla ilgili sorularını yöneltebileceği ve geri bildirim sağlayabileceği bir destek kanalı görevi görür",
    link: "/etkinlikler",
  },
  {
    name: "İletişim",
    icon: <IoMdCube />,
    description:
      " İletişim sayfası, kullanıcıların platformla ilgili sorularını yöneltebileceği ve geri bildirim sağlayabileceği bir destek kanalı görevi görür",
    link: "/etkinlikler",
  },
];
