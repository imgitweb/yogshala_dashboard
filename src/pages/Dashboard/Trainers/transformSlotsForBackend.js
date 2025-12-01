const transformSlotsForBackend = (slots) => {
  const dayMap = {};

  slots.forEach(slot => {
    slot.days.forEach(dayShort => {
      const dayFull = {
        Mon: "Monday",
        Tue: "Tuesday",
        Wed: "Wednesday",
        Thu: "Thursday",
        Fri: "Friday",
        Sat: "Saturday",
        Sun: "Sunday"
      }[dayShort];

      if (!dayFull) return;

      if (!dayMap[dayFull]) {
        dayMap[dayFull] = [];
      }

      dayMap[dayFull].push({
        startTime: slot.startTime,
        endTime: slot.endTime,
      });
    });
  });

  return Object.entries(dayMap).map(([day, slots]) => ({ day, slots }));
};

export default transformSlotsForBackend;