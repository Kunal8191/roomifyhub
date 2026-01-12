import '../styles/navbar.css'

function Navbar({ setCurrentPage }) {
  return (
    <nav className="navbar">
      <h2 className="logo" onClick={() => setCurrentPage('home')}>
        RoomFinder
      </h2>

      <ul className="nav-links">
        <li onClick={() => setCurrentPage('home')}>Home</li>
        <li onClick={() => setCurrentPage('add')}>Add Room</li>
        <li onClick={() => setCurrentPage('my')}>My Rooms</li>
      </ul>
    </nav>
  )
}

export default Navbar
