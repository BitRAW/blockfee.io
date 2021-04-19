import dateFormat from "dateformat";

export const getLabelInterpolationFnc = (length: number) => (value: Date, index: number) => {
  const labelSpace = +(length / 4).toFixed(0);

  if (index % labelSpace === 0) {
    return dateFormat(value, "dd.mm.yyyy HH:MM");
  } else return null;
}