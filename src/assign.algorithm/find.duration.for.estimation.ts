import { Task } from "../modules/task/interfaces/task";
import { Estimation } from "../modules/task/interfaces/estimation";
import { DateRange } from "../utils/date.range";
import moment from "moment";
import "moment-business-time";
import { easter, EasterDate } from "date-easter";
import { findCorpusChristi, findEasterMonday, HOLIDAYS, WORKING_HOURS } from "../config/buisness.days.config";
import { median } from "../utils/calc.median";

export const findDurationForEstimation = (closedTasks: Task[]): { [estimation: string]: number } => {
  const estimations: string[] = Object.values(Estimation);

  const durationsForEstimations = estimations.reduce((obj, key: string) => {
    obj[key] = [];
    return obj;
  }, {});

  for (let task of closedTasks) { //TODO handle no date range
    durationsForEstimations[task.credentials.estimation].push(calculateDuration(task.dateRange as DateRange));
  }

  for (let estimation of estimations) {
    durationsForEstimations[estimation] = median(durationsForEstimations[estimation]);
  }

  return durationsForEstimations;
};

const calculateDuration = (dateRange: DateRange): number => {
  const calculateBusinessHours = dateRange => {
    const start = moment(dateRange.start * 1000);
    const end = moment(dateRange.end * 1000);
    let year = start.year();

    const findAndAddMoveableHolidays = () => {
      let annualHolidays;

      while (year <= end.year()) {
        const easterSunday: EasterDate = easter(year);
        annualHolidays = HOLIDAYS.concat(
          [moment(easterSunday).format("MM-DD"),
            findEasterMonday(easterSunday),
            findCorpusChristi(easterSunday)]
        );
        year++;
      }

      moment.updateLocale("pl", { workinghours: WORKING_HOURS, holidays: annualHolidays });
    };

    findAndAddMoveableHolidays();

    //@ts-ignore
    return end.workingDiff(start, "hours");
  };

  return calculateBusinessHours(dateRange);
};
