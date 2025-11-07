import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./components/LoginPage"
import { Dashboard } from "./components/Dashboard"

function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
    <Router>
      <Routes>
        <Route
          path="*"
          element={isLoggedIn ? <Navigate to="https://danielhuangg91.github.io/assessment-tdcx/dashboard" /> : <LoginPage />}
        />
        <Route
          path="https://danielhuangg91.github.io/assessment-tdcx/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="*" />}
        />
      </Routes>
    </Router>
  );
}

export default App
