import moment from "moment";

export const formatHours = (time: string) => {
  const string = moment().format("DD/MM/YYYY") + " " + time;
  return moment(string, "DD/MM/YYYY HH:mm:ss").format("HH:mm");
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
      label: start.format("HH:mm"),
      hour: start.hour(),
      minute: start.minute(),
      moment: start.clone(),
    });
    start.add(30, "minutes");
  }

  return slots;
};
