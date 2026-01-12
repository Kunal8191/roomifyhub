import '../styles/roomCard.css'

function RoomCard({ room }) {
  return (
    <div className="room-card">
      <img src={room.image} alt="room" />

      <div className="room-info">
        <h3>{room.title}</h3>
        <p><b>Location:</b> {room.location}</p>
        <p><b>Rent:</b> ₹{room.price}</p>
        <p><b>Type:</b> {room.type}</p>
        <p><b>Tenant:</b> {room.tenant}</p>
        <p><b>Contact:</b> {room.contact}</p>
      </div>
    </div>
  )
}

export default RoomCard
