export const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    // Dosya yüklendiğinde Base64 formatını al
    reader.onload = () => {
      resolve(reader.result as string);
    };

    // Hata durumunda reject çağır
    reader.onerror = (error) => {
      reject(error);
    };

    // Dosyayı oku ve Base64 olarak çevir
    reader.readAsDataURL(file);
  });
};
