import { useState, useEffect } from "react";
import RoomCard from "../components/RoomCard";
import Filters from "../components/Filters";
import { supabase } from "../supabaseClient";

function Home({ rooms, setRooms }) {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    type: "",
    tenant: "",
    price: ""
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("rooms")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching rooms:", error.message);
    } else {
      setRooms(data);
    }

    setLoading(false);
  };

  const filteredRooms = rooms.filter((room) => {
    return (
      room.location.toLowerCase().includes(search.toLowerCase()) &&
      (filters.type ? room.type === filters.type : true) &&
      (filters.tenant ? room.tenant === filters.tenant : true) &&
      (filters.price ? room.price <= Number(filters.price) : true)
    );
  });

  if (loading) {
    return <p style={{ textAlign: "center", marginTop: "40px" }}>Loading rooms...</p>;
  }

  return (
    <div className="container">
      {/* Search */}
      <input
        type="text"
        placeholder="Search by location"
        className="search-input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Filters */}
      <Filters setFilters={setFilters} />

      {/* Rooms */}
      <div className="grid">
        {filteredRooms.length > 0 ? (
          filteredRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))
        ) : (
          <p style={{ textAlign: "center", marginTop: "30px" }}>
            No rooms found
          </p>
        )}
      </div>
    </div>
  );
}

export default Home;
