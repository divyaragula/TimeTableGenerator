import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddSubjectPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    teacher: "",
    room: "",
    type: "theory",
    periodsPerWeek: 3
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "http://localhost:5000/api/subjects",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Subject Added Successfully ✅");
      navigate("/dashboard");

    } catch (err) {
      alert("Error adding subject");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Add Subject</h2>

      <form onSubmit={handleSubmit}>

        <input
          name="name"
          placeholder="Subject Name"
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          name="teacher"
          placeholder="Teacher Name"
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          name="room"
          placeholder="Room Number"
          onChange={handleChange}
          required
        />

        <br /><br />

        <select name="type" onChange={handleChange}>
          <option value="theory">Theory</option>
          <option value="lab">Lab</option>
        </select>

        <br /><br />

        <input
          type="number"
          name="periodsPerWeek"
          placeholder="Periods Per Week"
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">Add Subject</button>
      </form>
    </div>
  );
}