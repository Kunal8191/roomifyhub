import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddRoom from "./pages/AddRoom";
import MyRooms from "./pages/MyRooms";
import Auth from "./pages/Auth";
import { useState } from "react";
import { useAuth } from "./context/AuthContext";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;

  if (!user) {
    return <Navigate to="/auth" />;
  }

  return children;
}

function App() {
  const [rooms, setRooms] = useState([]);

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home rooms={rooms} setRooms={setRooms} />} />


        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <AddRoom rooms={rooms} setRooms={setRooms} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my"
          element={
            <ProtectedRoute>
              <MyRooms rooms={rooms} setRooms={setRooms} />
            </ProtectedRoute>
          }
        />

        <Route path="/auth" element={<Auth />} />
      </Routes>
    </>
  );
}

export default App;
