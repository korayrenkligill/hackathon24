import { MantineProvider, MantineThemeOverride } from "@mantine/core";
import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const colorTheme: MantineThemeOverride = {
  colors: {
    cyan: [
      "#ecfeff",
      "#cffafe",
      "#a5f3fc",
      "#67e8f9",
      "#22d3ee",
      "#06b6d4",
      "#0891b2",
      "#0e7490",
      "#155e75",
      "#164e63",
    ],
    blue: [
      "#eff6ff",
      "#dbeafe",
      "#bfdbfe",
      "#93c5fd",
      "#60a5fa",
      "#3b82f6",
      "#2563eb",
      "#1d4ed8",
      "#1e40af",
      "#1e3a8a",
    ],
    error: [
      "#FF8C8C",
      "#FF8C8C",
      "#FF8C8C",
      "#FF8C8C",
      "#FF8C8C",
      "#FF8C8C",
      "#FF8C8C",
      "#FF8C8C",
      "#FF8C8C",
      "#FF8C8C",
    ],
    warn: [
      "#FFCA5D",
      "#FFCA5D",
      "#FFCA5D",
      "#FFCA5D",
      "#FFCA5D",
      "#FFCA5D",
      "#FFCA5D",
      "#FFCA5D",
      "#FFCA5D",
      "#FFCA5D",
    ],
    success: [
      "#8CFFC0",
      "#8CFFC0",
      "#8CFFC0",
      "#8CFFC0",
      "#8CFFC0",
      "#8CFFC0",
      "#8CFFC0",
      "#8CFFC0",
      "#8CFFC0",
      "#8CFFC0",
    ],
    info: [
      "#89C2FF",
      "#89C2FF",
      "#89C2FF",
      "#89C2FF",
      "#89C2FF",
      "#89C2FF",
      "#89C2FF",
      "#89C2FF",
      "#89C2FF",
      "#89C2FF",
    ],
    neutral: [
      "#C9C9C9",
      "#C9C9C9",
      "#C9C9C9",
      "#C9C9C9",
      "#C9C9C9",
      "#C9C9C9",
      "#C9C9C9",
      "#C9C9C9",
      "#C9C9C9",
      "#C9C9C9",
    ],
    highlight: [
      "#fa2b88",
      "#fa2b88",
      "#fa2b88",
      "#fa2b88",
      "#fa2b88",
      "#fa2b88",
      "#fa2b88",
      "#fa2b88",
      "#fa2b88",
      "#fa2b88",
    ],
  },
};
const darkTheme: MantineThemeOverride = {
  colors: {
    background: [
      "#18181b",
      "#18181b",
      "#18181b",
      "#18181b",
      "#18181b",
      "#18181b",
      "#18181b",
      "#18181b",
      "#18181b",
      "#18181b",
    ],
    text: [
      "#f4f4f5",
      "#f4f4f5",
      "#f4f4f5",
      "#f4f4f5",
      "#f4f4f5",
      "#f4f4f5",
      "#f4f4f5",
      "#f4f4f5",
      "#f4f4f5",
      "#f4f4f5",
    ],
  },
};
const lightTheme: MantineThemeOverride = {
  colors: {
    background: [
      "#f4f4f5",
      "#f4f4f5",
      "#f4f4f5",
      "#f4f4f5",
      "#f4f4f5",
      "#f4f4f5",
      "#f4f4f5",
      "#f4f4f5",
      "#f4f4f5",
      "#f4f4f5",
    ],
    text: [
      "#27272a",
      "#27272a",
      "#27272a",
      "#27272a",
      "#27272a",
      "#27272a",
      "#27272a",
      "#27272a",
      "#27272a",
      "#27272a",
    ],
  },
  primaryColor: "indigo",
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme | null>(null); // Başlangıçta null
  const [isLoaded, setIsLoaded] = useState(false); // İlk yükleme kontrolü

  useEffect(() => {
    // Yerel depolamadan temayı al
    const savedTheme = (localStorage.getItem("theme") as Theme) || "light";
    setTheme(savedTheme);
    document.documentElement.className = savedTheme; // HTML'ye sınıf uygula
    setIsLoaded(true); // Yükleme tamamlandı
  }, []);

  const toggleTheme = () => {
    if (theme) {
      const newTheme = theme === "light" ? "dark" : "light";
      setTheme(newTheme);
      localStorage.setItem("theme", newTheme); // Yerel depolamaya kaydet
      document.documentElement.className = newTheme; // HTML'ye sınıf uygula
    }
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme: theme!, toggleTheme }}>
      <MantineProvider
        theme={{
          ...colorTheme,
          ...() => (theme === "light" ? lightTheme : darkTheme),
        }}
        forceColorScheme={theme!}
      >
        {children}
      </MantineProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
