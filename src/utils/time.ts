import moment from "moment";

export const formatHours = (time: string) => {
  const string = moment().format("DD/MM/YYYY") + " " + time;
  return moment(string, "DD/MM/YYYY HH:mm:ss").format("h:mma");
};

export const checkOverlap = (timeSegments: string[][]) => {
  timeSegments.sort((timeSegment1, timeSegment2) => timeSegment1[0].localeCompare(timeSegment2[0]));
  let overlap = false;
  timeSegments.map((t, i) => {
    if(!((i + 1) === timeSegments.length)){
      const currentEndTime = timeSegments[i][1];
      const nextStartTime = timeSegments[i + 1][0];
      if (currentEndTime > nextStartTime) overlap = true;
    }
  })
  return overlap;
};

export const getAllTimeSlots = () => {
  const start = moment().set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
  const end = moment()
    .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
    .add(1, "days");
  let slots = [];
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
