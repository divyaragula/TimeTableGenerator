function generateTimetable(
  workingDays,
  periodsPerDay,
  subjects,
  startTime,
  periodDuration
) {

  // ===== CREATE TIME SLOTS =====
  const timeSlots = [];

  let [hour, minute] = startTime.split(":").map(Number);

  for (let i = 0; i < periodsPerDay; i++) {

    const start = `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}`;

    minute += periodDuration;

    while (minute >= 60) {
      hour++;
      minute -= 60;
    }

    const end = `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}`;

    timeSlots.push(`${start} - ${end}`);
  }

  // ===== EMPTY TIMETABLE =====
  const timetable = workingDays.map(() =>
    Array(periodsPerDay).fill(null)
  );

  // ===== SEPARATE LABS & THEORY =====
  const labs = subjects.filter(s => s.type === "lab");
  const theory = subjects.filter(s => s.type !== "lab");

  // ===== PLACE LABS (3 continuous periods) =====
 // ===== PLACE LABS (1 per day, 3 continuous periods) =====
// ===== PLACE LABS (1 lab per day, once per week, continuous) =====

const usedDays = new Set();     // to track which day already has a lab
const placedLabs = new Set();   // to track which lab already placed

labs.forEach((lab) => {

  if (placedLabs.has(lab.name)) return; // prevent same lab twice

  for (let d = 0; d < workingDays.length; d++) {

    // skip day if already has lab
    if (usedDays.has(d)) continue;

    for (let p = 0; p <= periodsPerDay - 3; p++) {

      if (
        !timetable[d][p] &&
        !timetable[d][p + 1] &&
        !timetable[d][p + 2]
      ) {

        // place lab in 3 continuous slots
        for (let k = 0; k < 3; k++) {
          timetable[d][p + k] = {
            ...lab,
            type: "lab"
          };
        }

        usedDays.add(d);              // mark day as used
        placedLabs.add(lab.name);     // mark lab as placed
        break;
      }
    }

    if (placedLabs.has(lab.name)) break;
  }
});
  // ===== THEORY SUBJECT POOL =====
  const pool = [];

  theory.forEach(sub => {
    for (let i = 0; i < sub.periodsPerWeek; i++) {
      pool.push(sub);
    }
  });

  // SHUFFLE
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  let index = 0;

  // ===== FILL REMAINING =====
  for (let d = 0; d < workingDays.length; d++) {
    for (let p = 0; p < periodsPerDay; p++) {

      if (!timetable[d][p] && index < pool.length) {
        timetable[d][p] = pool[index++];
      }
    }
  }

  // ===== FORMAT OUTPUT WITH TIMES (OBJECT FORMAT) =====
const finalTable = timetable.map((day) =>
  day.map((sub, pIndex) => {

    if (!sub) {
      return {
        time: timeSlots[pIndex],
        subject: "Free",
        teacher: "",
        room: "",
        type: "free"
      };
    }

    return {
      time: timeSlots[pIndex],
      subject: sub.name,
      teacher: sub.teacher,
      room: sub.room,
      type: sub.type
    };
  })
);

return finalTable;
}
export default generateTimetable;