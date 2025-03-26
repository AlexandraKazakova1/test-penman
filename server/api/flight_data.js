import { readFileSync } from "fs";
import { join } from "path";

export default defineEventHandler(() => {
  const filePath = join(process.cwd(), "public", "data", "flight_data.json");

  try {
    const fileContent = readFileSync(filePath, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Ошибка при чтении flight_data.json:", error);
    return { error: "Не удалось загрузить данные полета" };
  }
});
