import { useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useAuth } from "../context/AuthContext";

function MyRooms({ rooms, setRooms }) {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (user) {
      fetchMyRooms();
    }
  }, [user]);

  const fetchMyRooms = async () => {
    const { data, error } = await supabase
      .from("rooms")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error.message);
    } else {
      setRooms(data);
    }
  };

  async function deleteRoom(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this room?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("rooms")
      .delete()
      .eq("id", id);

    if (!error) {
      fetchMyRooms();
    }
  }

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading...</p>;
  }

  return (
    <div className="container">
      <h2 style={{ marginBottom: "20px" }}>My Rooms</h2>

      {rooms.length === 0 ? (
        <p>No rooms added yet</p>
      ) : (
        <div className="grid">
          {rooms.map((room) => (
            <div key={room.id} className="room-card">
              <img src={room.image_url} alt={room.title} />
              <h3>{room.title}</h3>
              <p>{room.location}</p>
              <p>₹{room.price}</p>
              <p>
                {room.type} • {room.tenant}
              </p>
              <p>📞 {room.contact}</p>

              <button
                onClick={() => deleteRoom(room.id)}
                style={{
                  marginTop: "10px",
                  background: "#e53e3e",
                  color: "white",
                  padding: "8px",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer"
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyRooms;
