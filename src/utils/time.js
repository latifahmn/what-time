import moment from "moment/moment";

export const getLocalTime = (offset) => moment.utc().add(offset, "minutes");

export const getTimeDisplay = (time) =>
  moment.isMoment(time) ? time.format("ddd, h:mm a") : "";

export const isDay = (time) =>
  moment.isMoment(time) && time.format("A") === "AM";
