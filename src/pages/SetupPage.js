import { useState } from "react";
import axios from "axios";


function SetupPage() {
  const [form, setForm] = useState({
    startTime: "",
    endTime: "",
    periodsPerDay: 7,
    periodDuration: 45,
    lunchAfter: 3,
    workingDays: [],
    specialDay: "",
    oneLabPerDay: true
  });

  const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDayToggle = (day) => {
    if (form.workingDays.includes(day)) {
      setForm({
        ...form,
        workingDays: form.workingDays.filter(d => d !== day)
      });
    } else {
      setForm({
        ...form,
        workingDays: [...form.workingDays, day]
      });
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token");

  try {
    await axios.post(
      "http://localhost:5000/api/setup",
      form,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    alert("Setup saved to database ✅");

  } catch (error) {
    console.log(error);
    alert("Error saving setup");
  }
};


  return (
    <div style={{padding:"20px"}}>
      <h2>Timetable Setup</h2>

      <form onSubmit={handleSubmit}>

        <label>College Start Time:</label>
        <input type="time" name="startTime" onChange={handleChange} required/>

        <br/><br/>

        <label>College End Time:</label>
        <input type="time" name="endTime" onChange={handleChange} required/>

        <br/><br/>

        <label>Periods Per Day:</label>
        <input type="number" name="periodsPerDay" value={form.periodsPerDay} onChange={handleChange}/>

        <br/><br/>

        <label>Period Duration (minutes):</label>
        <input type="number" name="periodDuration" value={form.periodDuration} onChange={handleChange}/>

        <br/><br/>

        <label>Lunch After Period:</label>
        <select name="lunchAfter" onChange={handleChange}>
          <option value="3">After 3rd</option>
          <option value="4">After 4th</option>
        </select>

        <br/><br/>

        <h3>Select Working Days</h3>
        {days.map(day => (
          <label key={day}>
            <input
              type="checkbox"
              checked={form.workingDays.includes(day)}
              onChange={() => handleDayToggle(day)}
            />
            {day}
          </label>
        ))}

        <br/><br/>

        <h3>Special Training Day</h3>
        <select name="specialDay" onChange={handleChange}>
          <option value="">None</option>
          {days.map(day => (
            <option key={day}>{day}</option>
          ))}
        </select>

        <br/><br/>

        <label>
          <input
            type="checkbox"
            checked={form.oneLabPerDay}
            onChange={() =>
              setForm({ ...form, oneLabPerDay: !form.oneLabPerDay })
            }
          />
          Only One Lab Per Day
        </label>

        <br/><br/>

        <button type="submit">Save Setup</button>

      </form>
    </div>
  );
}

export default SetupPage;
