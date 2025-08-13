import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import LikePage from "./pages/LikePage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/like" element={<LikePage />} />
      </Routes>
    </Router>
  );
}

