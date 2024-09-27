import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import ApplyEngineer from "./pages/ApplyEngineer";
import NotificationPage from "./pages/NotificationPage";
import Users from "./pages/admin/Users";
import Engineers from "./pages/admin/Engineers";
import Profile from "./pages/engineer/Profile";
import BookingPage from "./pages/BookingPage";
import Appointments from "./pages/Appointments";
import EngineerAppointment from "./pages/engineer/EngineerAppointment";
function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <>
      <BrowserRouter>
        {loading ? (
          <Spinner />
        ) : (
          <Routes>
            <Route
              path="/apply-engineer"
              element={
                <ProtectedRoute>
                  <ApplyEngineer />
                </ProtectedRoute>
              }
            />{" "}
            <Route
              path="/notification"
              element={
                <ProtectedRoute>
                  <NotificationPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute>
                  <Users />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/engineers"
              element={
                <ProtectedRoute>
                  <Engineers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/engineer/profile/:id"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />{" "}
            <Route
              path="/engineer/book-appointment/:engineerId"
              element={
                <ProtectedRoute>
                  <BookingPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />{" "}
            <Route
              path="/appointments"
              element={
                <ProtectedRoute>
                  <Appointments />
                </ProtectedRoute>
              }
            />{" "}
            <Route
              path="/engineer-appointments"
              element={
                <ProtectedRoute>
                  <EngineerAppointment />
                </ProtectedRoute>
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
