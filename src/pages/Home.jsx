import { useState } from 'react'
import RoomCard from '../components/RoomCard'
import Filters from '../components/Filters'

function Home({ rooms }) {
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({
    type: '',
    tenant: '',
    price: ''
  })

  const filteredRooms = rooms.filter(room => {
    return (
      room.location.toLowerCase().includes(search.toLowerCase()) &&
      (filters.type ? room.type === filters.type : true) &&
      (filters.tenant ? room.tenant === filters.tenant : true) &&
      (filters.price ? room.price <= Number(filters.price) : true)
    )
  })

  return (
    <div className="container">
      {/* Location Search */}
      <input
        type="text"
        placeholder="Search by location"
        className="search-input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Filters */}
      <Filters setFilters={setFilters} />

      {/* Room Cards */}
      <div className="grid">
        {filteredRooms.length > 0 ? (
          filteredRooms.map(room => (
            <RoomCard key={room.id} room={room} />
          ))
        ) : (
          <p style={{ textAlign: 'center', marginTop: '30px' }}>
            No rooms found
          </p>
        )}
      </div>
    </div>
  )
}

export default Home
