import { differenceInDays, startOfDay } from "date-fns";

export const calculateDueDate = (date) => {
  let calculatedDate = differenceInDays(date, startOfDay(new Date()));
  return calculatedDate;
};