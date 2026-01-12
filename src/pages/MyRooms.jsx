function MyRooms({ rooms, setRooms }) {

  function deleteRoom(id) {
    const confirmDelete = window.confirm('Are you sure you want to delete this room?')
    if (confirmDelete) {
      setRooms(rooms.filter(room => room.id !== id))
    }
  }

  return (
    <div className="container">
      <h2 style={{ marginBottom: '20px' }}>My Rooms</h2>

      {rooms.length === 0 ? (
        <p>No rooms added yet</p>
      ) : (
        <div className="grid">
          {rooms.map(room => (
            <div key={room.id} className="room-card">
              <img src={room.image} alt={room.title} />
              <h3>{room.title}</h3>
              <p>{room.location}</p>
              <p>₹{room.price}</p>
              <p>{room.type} • {room.tenant}</p>
              <p>📞 {room.contact}</p>

              <button
                onClick={() => deleteRoom(room.id)}
                style={{
                  marginTop: '10px',
                  background: '#e53e3e',
                  color: 'white',
                  padding: '8px',
                  borderRadius: '6px',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyRooms
