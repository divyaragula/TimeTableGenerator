import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SetupPage from "./pages/SetupPage";
import GeneratePage from "./pages/generatePage";
import AddSubjectPage from "./pages/AddSubjectPage";
import ViewSetupPage from "./pages/ViewSetupPage";
import ManageSubjectsPage from "./pages/ManageSubjactsPage";

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Login />} />
        
        <Route path="/register" element={<Register />} />
        
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/generate" element={<GeneratePage />} />
        <Route path="/add-subject" element={<AddSubjectPage />} />
        <Route path="/view-setup" element={<ViewSetupPage />} />
        <Route path="/manage-subjects" element={<ManageSubjectsPage />} />
        
        {/* ✅ ADD SETUP ROUTE HERE */}
        <Route path="/setup" element={<SetupPage />} />

      </Routes>
    </Router>
  );
}

export default App;
