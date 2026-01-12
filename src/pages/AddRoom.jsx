import { useState } from 'react'

function AddRoom({ rooms, setRooms }) {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    type: '',
    tenant: '',
    contact: ''
  })

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit(e) {
    e.preventDefault()

    const newRoom = {
      id: Date.now(),
      ...formData,
      price: Number(formData.price),
      image: 'https://via.placeholder.com/300x180'
    }

    setRooms([...rooms, newRoom])

    alert('Room added successfully!')

    setFormData({
      title: '',
      location: '',
      price: '',
      type: '',
      tenant: '',
      contact: ''
    })
  }

  return (
    <div className="form-container">
      <h2>Add New Room</h2>

      <form onSubmit={handleSubmit} className="add-room-form">
        <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
        <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
        <input name="price" type="number" placeholder="Rent Price" value={formData.price} onChange={handleChange} required />

        <select name="type" value={formData.type} onChange={handleChange} required>
          <option value="">Property Type</option>
          <option value="1 BHK">1 BHK</option>
          <option value="2 BHK">2 BHK</option>
          <option value="1 Bed">1 Bed</option>
        </select>

        <select name="tenant" value={formData.tenant} onChange={handleChange} required>
          <option value="">Tenant Preference</option>
          <option value="Bachelor">Bachelor</option>
          <option value="Family">Family</option>
          <option value="Girls">Girls</option>
        </select>

        <input name="contact" placeholder="Contact Number" value={formData.contact} onChange={handleChange} required />

        <button type="submit">Add Room</button>
      </form>
    </div>
  )
}

export default AddRoom
