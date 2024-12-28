const COLORS = ["teal", "cyan", "sky", "blue", "indigo", "violet", "purple"];

export function getRandomPastelColor(
  value: 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950
): string {
  const randomIndex = Math.floor(Math.random() * COLORS.length);
  // return `${COLORS[randomIndex]}-${value}`;
  return "blue-500";
}
