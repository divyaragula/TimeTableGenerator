import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ViewSetupPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState(null);

  const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  useEffect(() => {
    fetchSetup();
  }, []);

  const fetchSetup = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/setup",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setForm(res.data);

    } catch (err) {
      alert("No setup found. Please create setup first.");
      navigate("/setup");
    }
  };

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

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        "http://localhost:5000/api/setup",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Setup Updated Successfully ✅");
      navigate("/dashboard");

    } catch (err) {
      alert("Error updating setup");
    }
  };

  if (!form) return <div>Loading...</div>;

  return (
    <div style={{ padding: "30px" }}>
      <h2>View / Edit Setup</h2>

      <form onSubmit={handleUpdate}>

        <label>College Start Time:</label>
        <input
          type="time"
          name="startTime"
          value={form.startTime}
          onChange={handleChange}
          required
        />

        <br /><br />

        <label>College End Time:</label>
        <input
          type="time"
          name="endTime"
          value={form.endTime}
          onChange={handleChange}
          required
        />

        <br /><br />

        <label>Periods Per Day:</label>
        <input
          type="number"
          name="periodsPerDay"
          value={form.periodsPerDay}
          onChange={handleChange}
        />

        <br /><br />

        <label>Period Duration (minutes):</label>
        <input
          type="number"
          name="periodDuration"
          value={form.periodDuration}
          onChange={handleChange}
        />

        <br /><br />

        <label>Lunch After Period:</label>
        <select
          name="lunchAfter"
          value={form.lunchAfter}
          onChange={handleChange}
        >
          <option value="3">After 3rd</option>
          <option value="4">After 4th</option>
        </select>

        <br /><br />

        <h3>Select Working Days</h3>
        {days.map(day => (
          <label key={day} style={{ marginRight: "10px" }}>
            <input
              type="checkbox"
              checked={form.workingDays.includes(day)}
              onChange={() => handleDayToggle(day)}
            />
            {day}
          </label>
        ))}

        <br /><br />

        <h3>Special Training Day</h3>
        <select
          name="specialDay"
          value={form.specialDay}
          onChange={handleChange}
        >
          <option value="">None</option>
          {days.map(day => (
            <option key={day}>{day}</option>
          ))}
        </select>

        <br /><br />

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

        <br /><br />

        <button type="submit">Update Setup</button>
      </form>
    </div>
  );
}