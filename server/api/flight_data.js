import { readFileSync } from "fs";
import { join } from "path";

export default defineEventHandler(() => {
  const filePath = join(process.cwd(), "public/flight_data.json");
  const fileContent = readFileSync(filePath, "utf-8");
  return JSON.parse(fileContent);
});
