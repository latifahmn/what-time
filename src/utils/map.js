import { MAP_OPTION } from "../constants/map";
import { AM_STYLES, PM_STYLES } from "../constants/style";

export const getMapProp = (value) => {
  console.log(value.getPlace());
  const lat = value.getPlace().geometry.location.lat();
  const lng = value.getPlace().geometry.location.lng();
  const timeOffset = value.getPlace().utc_offset_minutes;

  return { lat, lng, timeOffset };
};

export const getMapOption = (isAm) => ({
  ...MAP_OPTION,
  styles: isAm ? AM_STYLES : PM_STYLES,
});
