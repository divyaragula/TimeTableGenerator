import React, { useEffect, useState } from "react";
import axios from "axios";
import generateTimetable from "../utils/timetableGenerator";

// Import your pages
import SetupPage from "./SetupPage";
import SubjectsPage from "./AddSubjectPage";

export default function Dashboard() {

  const [setup, setSetup] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [timetable, setTimetable] = useState([]);
  const [activeModule, setActiveModule] = useState("home");

  useEffect(() => {
    fetchSetup();
    fetchSubjects();
  }, []);

  const fetchSetup = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:5000/api/setup",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSetup(res.data);
    } catch {
      setSetup(null);
    }
  };

  const fetchSubjects = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:5000/api/subjects",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSubjects(res.data);
    } catch {
      console.log("Error fetching subjects");
    }
  };

  const handleGenerate = () => {
    if (!setup) {
      alert("Please create setup first");
      return;
    }

    if (subjects.length === 0) {
      alert("Please add subjects first");
      return;
    }

    const table = generateTimetable(
      setup.workingDays,
      setup.periodsPerDay,
      subjects,
      setup.startTime,
      setup.periodDuration
    );

    setTimetable(table);
    setActiveModule("view");
  };

  const handleDownload = () => {
    window.print();
  };

  return (
    <div style={styles.wrapper}>

      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={{ marginBottom: "20px" }}>TT Generator</h2>

        <div style={styles.menuItem} onClick={() => setActiveModule("setup")}>
          Save Setup
        </div>

        <div style={styles.menuItem} onClick={() => setActiveModule("subjects")}>
          Add Subjects
        </div>

        <div style={styles.menuItem} onClick={handleGenerate}>
          Generate Timetable
        </div>

        <div style={styles.menuItem} onClick={() => setActiveModule("view")}>
          View Timetable
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.content}>

        {activeModule === "home" && (
          <div>
            <h1>Welcome 👋</h1>
            <p>Select a module from the sidebar.</p>
          </div>
        )}

        {activeModule === "setup" && (
          <SetupPage onSaveSuccess={fetchSetup} />
        )}

        {activeModule === "subjects" && (
          <SubjectsPage onAddSuccess={fetchSubjects} />
        )}

       {activeModule === "view" && timetable.length > 0 && (
          <div>
            <h2>Generated Timetable</h2>

            <button style={styles.downloadBtn} onClick={handleDownload}>
              Download PDF
            </button>

            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Day / Time</th>
                  {timetable[0].map((slot, i) => (
                    <th key={i} style={styles.th}>
                      {slot.time}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {timetable.map((day, dayIndex) => (
                  <tr key={dayIndex}>
                    <td style={styles.dayCell}>
                      Day {dayIndex + 1}
                    </td>

                    {day.map((slot, i) => (
                      <td
                        key={i}
                        style={
                          slot?.type === "lab"
                            ? styles.labCell
                            : slot?.subject
                            ? styles.normalCell
                            : styles.freeCell
                        }
                      >
                        {slot?.subject || "Free"}
                        <br />
                        {slot?.teacher}
                        <br />
                        {slot?.room}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "Segoe UI"
  },

  sidebar: {
    width: "250px",
    background: "linear-gradient(180deg,#1e3c72,#2a5298)",
    color: "white",
    padding: "20px"
  },

  content: {
    flex: 1,
    padding: "30px",
    backgroundColor: "#f4f6f9",
    overflowY: "auto"
  },

  menuItem: {
    padding: "12px",
    marginTop: "10px",
    cursor: "pointer",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: "8px"
  },

  downloadBtn: {
    padding: "8px 15px",
    marginBottom: "20px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#27ae60",
    color: "white",
    cursor: "pointer"
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    backgroundColor: "white"
  },

  th: {
    backgroundColor: "#2c3e50",
    color: "white",
    padding: "10px",
    border: "1px solid #ddd"
  },

  dayCell: {
    backgroundColor: "#34495e",
    color: "white",
    fontWeight: "bold",
    padding: "10px",
    textAlign: "center"
  },

  normalCell: {
    padding: "10px",
    border: "1px solid #ddd",
    backgroundColor: "#ecf0f1"
  },

  labCell: {
    padding: "10px",
    border: "1px solid #ddd",
    backgroundColor: "#f39c12",
    color: "white"
  },

  freeCell: {
    padding: "10px",
    border: "1px solid #ddd",
    backgroundColor: "#bdc3c7"
  }
};