import { Button } from "@mantine/core";

const FooterTop = () => {
  return (
    <div className="p-12 md:p-20 flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl md:text-6xl text-center font-bold bg-gradient-to-r from-indigo-400 to-blue-500 inline-block text-transparent bg-clip-text">
        Hemen Başlayın
      </h1>
      <Button
        variant="filled"
        size="md"
        radius="md"
        color="yellow"
        className="z-10"
        onClick={() => alert("Ucretsiz Dene")}
      >
        Ücretsiz Dene
      </Button>
    </div>
  );
};

export default FooterTop;
