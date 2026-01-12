import { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import AddRoom from './pages/AddRoom'
import MyRooms from './pages/MyRooms'
import roomsData from './data/roomsData'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [rooms, setRooms] = useState(roomsData)

  return (
    <>
      <Navbar setCurrentPage={setCurrentPage} />

      {currentPage === 'home' && <Home rooms={rooms} />}
      {currentPage === 'add' && (
        <AddRoom rooms={rooms} setRooms={setRooms} />
      )}
      {currentPage === 'my' && (
  <MyRooms rooms={rooms} setRooms={setRooms} />
)}

    </>
  )
}

export default App
