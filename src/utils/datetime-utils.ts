import { DateTime } from "luxon";

export const isNumberDateTextFormat = (str: string): boolean => {
    const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
    return dateRegex.test(str);
};

export const isDateTextFormat = (str: string): boolean => {
    const dateFormatRegex = /^[0-9]{1,2}-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-[0-9]{4}$/;
    return dateFormatRegex.test(str);
};

export const isTimeTextFormat = (str: string): boolean => {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return timeRegex.test(str);
};

export const parseDateText = (str: string, format: string): Date => {
    const luxonDate = DateTime.fromFormat(str, format);
    return luxonDate.toJSDate();
};

export const isDateStringValid = (dateString: string, format: string) => {
    const parsedDate = DateTime.fromFormat(dateString, format, { zone: "utc" });
    return parsedDate.isValid;
};

export const dateTextToISO = (str: string): string => {
    const date = DateTime.fromFormat(str, "d-LLL-yyyy");
    const isoDate = date.toISO();
    console.log(str);
    console.log(isoDate);
    return isoDate!;
};

export const jsDateToDateText = (date: Date): string => {
    const luxonDateTime = DateTime.fromJSDate(date);
    const formattedDate = luxonDateTime.toFormat("dd-LLL-yyyy");
    return formattedDate;
};

export const isoToDateText = (iso: string): string => {
    const luxonDateTime = DateTime.fromISO(iso);
    const formattedDate = luxonDateTime.toFormat("dd-LLL-yyyy");
    return formattedDate;
};

export const timeTextToISO = (str: string): string => {
    const currentTime = DateTime.fromFormat(str, "HH:mm");
    const isoTime = currentTime.toISO();
    return isoTime!;
};

export const jsDateToTimeText = (date: Date, timezone: string): string => {
    const dateTime = DateTime.fromJSDate(date, { zone: timezone });
    const adjustedTime = dateTime.toFormat("HH:mm");
    return adjustedTime;
};

export const isoToTimeText = (iso: string, timezone: string): string => {
    const dateTime = DateTime.fromISO(iso, { zone: timezone });
    const adjustedTime = dateTime.toFormat("HH:mm");
    return adjustedTime;
};

export const fisrtJsDateOfCurrentMonth = () => {
    const currentDate = DateTime.local(); // Get the current date and time
    const firstDayOfMonth = currentDate.startOf("month"); // Get the start of the current month
    return firstDayOfMonth.toJSDate();
};

export const firstJsDateOfNextMonth = () => {
    const currentDate = DateTime.local(); // Get the current date and time
    const firstDayOfNextMonth = currentDate.plus({ months: 1 }).startOf("month"); // Get the start of the next month
    return firstDayOfNextMonth.toJSDate();
};

export const getCurrentFormattedMonth = () => {
    const today = DateTime.local();
    return getFormattedMonth(today).toString().padStart(2, "0");
};

export const getFormattedMonth = (date: DateTime) => {
    const currentMonth = date.month;
    return currentMonth;
};

export const getPast12Months = (): string[] => {
    const months: string[] = [];
    const now = DateTime.local();
    for (let i = 0; i < 12; i++) {
        months.push(now.minus({ months: i }).toFormat("yyyy-MM"));
    }
    return months.reverse();
};

export const getPast12MonthsDateRanges = () => {
    const now = DateTime.utc();
    const startDate = now.minus({ months: 11 }).startOf("month").toJSDate();
    const endDate = now.endOf("month").toJSDate();
    return { startDate, endDate };
};
