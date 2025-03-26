import path from "path";
import fs from "fs";

export default defineEventHandler(() => {
  const filePath = path.join(
    process.cwd(),
    "server",
    "data",
    "flight_data.json"
  );
  const fileContent = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(fileContent);
});
