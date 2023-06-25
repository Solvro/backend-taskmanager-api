import { EasterDate } from "date-easter";
import moment from "moment/moment";

const WEEKDAY_WORKING_HOURS = ["06:00:00", "20:00:00"];
export const WORKING_HOURS = {
  0: null,
  1: WEEKDAY_WORKING_HOURS,
  2: WEEKDAY_WORKING_HOURS,
  3: WEEKDAY_WORKING_HOURS,
  4: WEEKDAY_WORKING_HOURS,
  5: WEEKDAY_WORKING_HOURS,
  6: null
};

export const HOLIDAYS = [
  "*-01-01", // New Year's Day
  "*-01-06", // Epiphany
  "*-05-01", // Labour Day
  "*-05-03", // Constitution Day
  "*-08-15", // Assumption Day, Army Day
  "*-11-01", // All Saints' Day
  "*-11-11", // Independence Day
  "*-12-25", // Christmas
  "*-12-26"  // Christmas
];

const findDayOff = (difference: number, after: EasterDate) =>
  moment(after).add(difference, "days").format("MM-DD");

export const findEasterMonday = (easter: EasterDate) => findDayOff(1, easter);

export const findCorpusChristi = (easter: EasterDate) => findDayOff(60, easter);

