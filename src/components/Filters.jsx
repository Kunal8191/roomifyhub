function Filters({ setFilters }) {
  function handleChange(e) {
    setFilters(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="filters">
      <select name="type" onChange={handleChange}>
        <option value="">Property Type</option>
        <option value="1 BHK">1 BHK</option>
        <option value="2 BHK">2 BHK</option>
        <option value="1 Bed">1 Bed</option>
      </select>

      <select name="tenant" onChange={handleChange}>
        <option value="">Tenant Preference</option>
        <option value="Bachelor">Bachelor</option>
        <option value="Family">Family</option>
        <option value="Girls">Girls</option>
      </select>

      <select name="price" onChange={handleChange}>
        <option value="">Max Price</option>
        <option value="5000">₹5000</option>
        <option value="10000">₹10000</option>
        <option value="15000">₹15000</option>
      </select>
    </div>
  )
}

export default Filters
