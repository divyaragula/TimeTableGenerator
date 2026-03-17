import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ManageSubjectsPage() {

  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/subjects",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setSubjects(res.data);

    } catch (err) {
      console.log("Error fetching subjects");
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/subjects/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Subject deleted ✅");
      fetchSubjects(); // refresh list

    } catch (err) {
      alert("Error deleting subject");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Manage Subjects</h2>

      {subjects.length === 0 && <p>No subjects added.</p>}

      {subjects.map((sub) => (
        <div key={sub._id} style={{
          border: "1px solid #ccc",
          padding: "10px",
          marginBottom: "10px"
        }}>
          <h4>{sub.name}</h4>
          <p>Teacher: {sub.teacher}</p>
          <p>Room: {sub.room}</p>
          <p>Type: {sub.type}</p>
          <p>Periods/Week: {sub.periodsPerWeek}</p>

          <button
            onClick={() => handleDelete(sub._id)}
            style={{ background: "red", color: "white" }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}