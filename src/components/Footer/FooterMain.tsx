const FooterMain = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 md:py-20 px-4">
      <div className="flex flex-col gap-4">
        <img src="/logo.png" alt="logo" className="w-16 mx-auto" />
        <p>
          ❤️ Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat,
          quaerat!
        </p>
        <p className="bg-background-lightAlt1 dark:bg-background-darkAlt1 p-3 border border-indigo-400/40 rounded-md">
          Özellik 1
        </p>
        <p className="bg-background-lightAlt1 dark:bg-background-darkAlt1 p-3 border border-indigo-400/40 rounded-md">
          Özellik 2
        </p>
        <p className="bg-background-lightAlt1 dark:bg-background-darkAlt1 p-3 border border-indigo-400/40 rounded-md">
          Özellik 3
        </p>
      </div>
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold">Navigasyonlar</h1>
        <p>Navigasyon 1</p>
        <p>Navigasyon 2</p>
        <p>Navigasyon 3</p>
        <p>Navigasyon 4</p>
        <p>Navigasyon 5</p>
        <p>Navigasyon 6</p>
      </div>
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold">Bizi Takip Edin</h1>
        <p>İnstagram</p>
        <p>Facebook</p>
        <p>Twitter</p>
        <p>Linkedin</p>
        <p>Discord</p>
        <p>TikTok</p>
      </div>
    </div>
  );
};

export default FooterMain;
