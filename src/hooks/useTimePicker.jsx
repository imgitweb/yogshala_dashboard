import { useState } from "react";
import { to24HourFormat } from "../utils/formateTime";


export default function useTimePicker(initialTime = "") {
  const [selectedTime, setSelectedTime] = useState(initialTime);

  const confirmTime = (time) => {
    console.log("Selected time:", time);
 const convertedTime = to24HourFormat(time);
console.log("Converted to 24-hour format:", convertedTime);
    setSelectedTime(time);
  };

  return { selectedTime, confirmTime };
}
