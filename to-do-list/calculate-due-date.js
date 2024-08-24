import { differenceInDays, startOfDay } from "date-fns";

export const calculateDueDate = (date) => {
  let calculatedDate = differenceInDays(date, startOfDay(new Date()));
  if (!date || date == 'Invalid Date') {
    return '';
  } else if (calculatedDate === 0) {
    return `<p class="yellow-highlight">Due Today!</p>`;
  } else if (calculatedDate < 0) {
    calculatedDate = calculatedDate * -1;
    return `<p class="yellow-highlight">Due ${calculatedDate} day(s) ago!</p>`;
  } else {
    return `Due in ${calculatedDate} day(s)`;
  }
};