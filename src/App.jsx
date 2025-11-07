import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "@/components/LoginPage"
import { Dashboard } from "@/components/Dashboard"

function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
    <Router>
      <Routes>
        <Route
          path="*"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <LoginPage />}
        />
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App
