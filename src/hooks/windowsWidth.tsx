import { useEffect, useState } from "react";

export const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // İlk render sırasında ekran boyutunu ayarla
    handleResize();

    // Resize event listener ekle
    window.addEventListener("resize", handleResize);

    // Cleanup: Event listener'ı kaldır
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowWidth;
};
