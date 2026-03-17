import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Timetable</h2>

      <Link to="/dashboard">Dashboard</Link>
      <Link to="/setup">Setup</Link>
      <Link to="/subjects">Subjects</Link>
    </div>
  );
}

export default Sidebar;
