import React from "react";
import { useTheme } from "./ThemeContext";
import { IoMdMoon, IoIosSunny } from "react-icons/io";
import { Switch } from "@mantine/core";

const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Switch
      checked={theme === "dark"}
      onChange={toggleTheme}
      size="lg"
      color="dark.4"
      onLabel={<IoIosSunny className="text-lg text-text-dark" />}
      offLabel={<IoMdMoon className="text-lg text-text-light" />}
    />
  );
};

export default ThemeToggleButton;
