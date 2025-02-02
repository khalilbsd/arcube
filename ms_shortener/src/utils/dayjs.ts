import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import isBetween from "dayjs/plugin/isBetween";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/fr"; // Example: Importing French locale
import { IDayjs } from "types/IDayjs.interface.js";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);
dayjs.extend(isBetween);

// Set a default timezone globally
const defaultTimezone = "Africa/Tunis";
dayjs.locale("fr"); // Set default locale globally, change to desired locale
// Override the default `dayjs` function to use the default timezone and format
const dayjsWithTimezone = (date?: dayjs.ConfigType, format?: string) => {
  const parsedDate = format ? dayjs(date, format) : dayjs(date);
  return parsedDate.tz(defaultTimezone);
};





function toDayjs(date: string | Date): IDayjs {
  return dayjs(date, "DD/MM/YYYY")
}

function dayjsToString(date: Date) {
  return dayjs(date).format('DD/MM/YYYY')
}
export { dayjsWithTimezone as dayjs, toDayjs ,dayjsToString };