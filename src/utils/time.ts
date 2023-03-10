import moment from "moment";

interface Day {
  label: string;
  fullLabel: string;
  number: number;
}

export const formatHours = (time: string): string => {
  const string = moment().format("DD/MM/YYYY") + " " + time;
  const splitted = time.split(":");
  const format = splitted[1] === "00" ? "ha" : "h:mma";
  return moment(string, "DD/MM/YYYY HH:mm:ss").format(format);
};

export const checkStartBeforeEnd = (
  startTimeRaw: string,
  endTimeRaw: string
): boolean => {
  const startTime = moment(startTimeRaw, "hh:mm:ss");
  const endTime = moment(endTimeRaw, "hh:mm:ss");
  if (endTime.isBefore(startTime)) {
    return false;
  }
  return true;
};

export const checkOverlap = (timeSegments: string[][]): boolean => {
  timeSegments.sort((timeSegment1, timeSegment2) =>
    timeSegment1[0].localeCompare(timeSegment2[0])
  );
  let overlap = false;
  timeSegments.map((t, i) => {
    if (!(i + 1 === timeSegments.length)) {
      const currentEndTime = timeSegments[i][1];
      const nextStartTime = timeSegments[i + 1][0];
      if (currentEndTime > nextStartTime) overlap = true;
    }
  });
  return overlap;
};

export const getAllTimeSlots = () => {
  const start = moment().set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
  const end = moment()
    .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
    .add(1, "days");
  const slots = [];
  while (start.isBefore(end)) {
    slots.push({
      value: start.format("HH:mm:ss"),
      label: start.format("h:mma"),
      hour: start.hour(),
      minute: start.minute(),
      moment: start.clone(),
    });
    start.add(30, "minutes");
  }

  return slots;
};

export const daysInWeek = (): Day[] => {
  let days: number[] | Day[] = [1, 2, 3, 4, 5, 6, 7];
  days = days.map((d) => {
    return {
      fullLabel: moment().isoWeekday(d).format("dddd"),
      label: moment().isoWeekday(d).format("ddd"),
      number: d,
    };
  });
  return days;
};
