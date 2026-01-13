import "../styles/roomCard.css";

function RoomCard({ room }) {
  return (
    <div className="room-card">
      <img
        src={room.image_url || "https://via.placeholder.com/300x180?text=No+Image"}
        alt="room"
        className="room-image"
      />


      <div className="room-info">
        <h3>{room.title}</h3>
        <p><strong>Location:</strong> {room.location}</p>
        <p><strong>Rent:</strong> ₹{room.price}</p>
        <p><strong>Type:</strong> {room.type}</p>
        <p><strong>Tenant:</strong> {room.tenant}</p>
        <p><strong>Contact:</strong> {room.contact}</p>
      </div>
    </div>
  );
}

export default RoomCard;
