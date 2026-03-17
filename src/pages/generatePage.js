import { useEffect, useState } from "react";
import axios from "axios";

function GeneratePage() {
  const [setup, setSetup] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchSetup = async () => {
      const res = await axios.get(
        "http://localhost:5000/api/timetable",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setSetup(res.data[0]);
    };

    fetchSetup();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Generated Timetable</h2>

      {setup ? (
        <pre>{JSON.stringify(setup, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default GeneratePage;
