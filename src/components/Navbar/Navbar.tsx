import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggleButton from "../ThemeToggleButton";
import {
  NavbarButtonType,
  NavbarDropdownType,
  NavbarItemType,
  NavbarLinkType,
} from "../../interfaces/Navbar";
import { IoClose, IoMenu } from "react-icons/io5";
import { atom, useAtom, useSetAtom } from "jotai";
import { authAtom, useAuth } from "../AuthContext";
import userAtom from "../../store/User";
import axios from "../../utils/axiosConfig";
import { ApiUrls } from "../../api/apiUrls";

const menuIsOpenAtom = atom<boolean>(false);

const links: NavbarItemType[] = [
  {
    type: "link",
    name: "Ana Sayfa",
    path: "/",
  },
  {
    type: "dropdown",
    name: "Etkinlikler",
    links: [
      {
        name: "Etkinlik Listesi",
        path: "/etkinlik-listesi",
      },
      {
        name: "Etkinlik Haritası",
        path: "/etkinlik-haritası",
      },
    ],
  },
  {
    type: "link",
    name: "Forum",
    path: "/forum",
  },
  {
    type: "link",
    name: "Ödüller",
    path: "/oduller",
  },
];

const menuTimeout = 100;

const Link = ({ name, path, disabled }: NavbarLinkType) => {
  const setIsMenuOpen = useSetAtom(menuIsOpenAtom);

  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `block py-4 md:py-0 ${isActive ? "font-semibold" : ""}`
      }
      style={{
        pointerEvents: disabled ? "none" : "auto",
        opacity: disabled ? 0.5 : 1,
      }}
      onClick={() =>
        setTimeout(() => {
          setIsMenuOpen(false);
        }, menuTimeout)
      }
    >
      {name}
    </NavLink>
  );
};

const Dropdown = ({ name, links }: NavbarDropdownType) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const setIsMenuOpen = useSetAtom(menuIsOpenAtom);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="relative w-full md:w-auto" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-between gap-1 w-full md:w-auto py-4 md:py-0 text-left md:text-center"
      >
        <span>{name}</span>
        <IoIosArrowDown />
      </button>
      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            className="bg-background-light dark:bg-background-dark md:absolute md:top-full md:left-0 w-full md:w-auto md:mt-3 md:border md:shadow-lg border-background-dark/10 dark:border-background-light/10 rounded-md overflow-hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {links.map((link) => (
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `block px-4 py-2 hover:bg-background-dark/5 dark:hover:bg-background-light/5 ${
                    isActive ? "font-semibold" : ""
                  }`
                }
                style={{
                  pointerEvents: link.disabled ? "none" : "auto",
                  opacity: link.disabled ? 0.5 : 1,
                }}
                onClick={() =>
                  setTimeout(() => {
                    setIsMenuOpen(false);
                  }, menuTimeout)
                }
              >
                {link.name}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ButtonLink = ({ name, path, disabled }: NavbarButtonType) => {
  const setIsMenuOpen = useSetAtom(menuIsOpenAtom);

  return (
    <NavLink
      to={path}
      className={
        "block py-4 px-3 md:py-2 md:px-4 bg-blue-500 rounded-md text-white"
      }
      style={{
        pointerEvents: disabled ? "none" : "auto",
        opacity: disabled ? 0.5 : 1,
      }}
      onClick={() =>
        setTimeout(() => {
          setIsMenuOpen(false);
        }, menuTimeout)
      }
    >
      {name}
    </NavLink>
  );
};

const Navbar = () => {
  const navigation = useNavigate();
  const { isAuthenticated } = useAuth();
  const setIsAuthenticated = useSetAtom(authAtom);
  const [isMenuOpen, setIsMenuOpen] = useAtom(menuIsOpenAtom);

  const [user, setUser] = useAtom(userAtom);
  const getMe = async () => {
    try {
      await axios.get(ApiUrls.users.profile).then((res) => {
        setIsAuthenticated(true);
        setUser(res.data);
      });
    } catch (error: any) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMe();
  }, []);
  return (
    <nav
      className={`flex flex-col md:flex-row gap-4 md:items-center md:backdrop-blur-sm ${
        isMenuOpen ? "h-screen" : "h-[60px]"
      } sticky top-0 left-0 px-6 z-[50] py-4 bg-background-light dark:bg-background-dark md:bg-background-light/50 md:dark:bg-background-dark/80 border-b border-background-dark/20 dark:border-background-light/10 text-nowrap md:h-[60px]`}
    >
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-4">
          <img src="/logo.png" className="w-10 h-10" alt="logo" />
          <ThemeToggleButton />
        </div>
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="md:hidden text-2xl text-text-light dark:text-text-dark"
        >
          {isMenuOpen ? <IoClose /> : <IoMenu />}
        </button>
      </div>
      <div
        className={`${
          isMenuOpen ? "flex" : "hidden md:flex"
        } flex-col md:flex-row md:items-center md:gap-8 md:ml-auto w-full md:w-auto text-text-light dark:text-text-dark`}
      >
        {links.map((link, index) => {
          if (link.type === "link") {
            return (
              <Link key={index} type="link" name={link.name} path={link.path} />
            );
          } else if (link.type === "dropdown") {
            return <Dropdown key={index} {...link} />;
          } else {
            return (
              <ButtonLink
                key={index}
                type="button"
                name={link.name}
                path={link.path}
              />
            );
          }
        })}

        {isAuthenticated && user ? (
          <div
            className="flex items-center justify-center cursor-pointer"
            onClick={() => navigation("/profil")}
          >
            <span className="mr-2">{user.name}</span>
            <img
              src="https://placehold.co/600x400"
              alt="profil resmi"
              className="w-10 h-10 object-cover rounded-full"
            />
          </div>
        ) : (
          <ButtonLink
            type="button"
            name="Giriş Yap / Kayıt Ol"
            path="/giris-yap"
            disabled={isAuthenticated}
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
