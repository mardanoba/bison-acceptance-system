// src/App.jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import logo from "./assets/b.webp"; 

// Admin Pages
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

// User Pages
import WelcomePage from "./pages/WelcomePage";
import CongratulationPage from "./pages/CongratulationPage";
import DigitalIdPage from "./pages/DigitalIdPage";

// 404 Page
function NotFound() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <p><a href="/admin/login">Go to Admin Login</a></p>
    </div>
  );
}

// ---------------------- ROUTES ----------------------
const router = createBrowserRouter([
  // Admin Routes
  { path: "/", element: <AdminLogin /> },
  { path: "/admin/login", element: <AdminLogin /> },
  { path: "/admin/dashboard", element: <AdminDashboard /> },

  // User Routes
  { path: "/welcome/:uuid", element: <WelcomePage /> },
  { path: "/congratulations/:passportId", element: <CongratulationPage /> },
  { path: "/digital-id/:workId", element: <DigitalIdPage /> },

  // Catch-all 404
  { path: "*", element: <NotFound /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
