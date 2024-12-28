export function formatDateToDayMonthYear(isoString: string) {
  // Tarihi ISO formatından Date nesnesine çevir
  const date = new Date(isoString);

  // Gün, ay ve yılı al
  const day = date.getDate().toString().padStart(2, "0"); // 2 haneli format
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Aylar 0'dan başlıyor
  const year = date.getFullYear();

  // Formatı döndür
  return `${day}.${month}.${year}`;
}
