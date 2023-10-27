import { format, intervalToDuration, isToday, isYesterday } from 'date-fns';

export function dateFormat(value: Date) {
  const date = new Date(value);
  const dateDistance = intervalToDuration({
    start: date,
    end: new Date(),
  });
  if (
    dateDistance.years ||
    dateDistance.months ||
    (dateDistance.days && dateDistance.days > 7)
  ) {
    return format(date, 'dd-MM-yyyy');
  }
  return isToday(date)
    ? `today at ${format(date, 'HH:mm')}`
    : isYesterday(date)
    ? `yesterday at ${format(date, 'HH:mm')}`
    : `${format(date, 'EEEE').toLowerCase()} at ${format(date, 'HH:mm')}`;
}
