import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useAuth } from "../context/AuthContext";

function AddRoom() {
  const { user } = useAuth();
  const [imageFile, setImageFile] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: "",
    type: "",
    tenant: "",
    contact: ""
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!user) {
      alert("Please login");
      return;
    }

    if (!imageFile) {
      alert("Please upload an image");
      return;
    }

    // 1️⃣ Upload image to Supabase Storage
    const fileName = `${Date.now()}-${imageFile.name}`;

    const { error: uploadError } = await supabase.storage
      .from("room-images")
      .upload(fileName, imageFile);

    if (uploadError) {
      alert(uploadError.message);
      return;
    }

    // 2️⃣ Get public image URL
    const { data: imageData } = supabase.storage
      .from("room-images")
      .getPublicUrl(fileName);

    const imageUrl = imageData.publicUrl;

    // 3️⃣ Insert room into database
    const { error } = await supabase.from("rooms").insert([
      {
        title: formData.title,
        location: formData.location,
        price: Number(formData.price),
        type: formData.type,
        tenant: formData.tenant,
        contact: formData.contact,
        image_url: imageUrl,
        user_id: user.id
      }
    ]);

    if (error) {
      alert(error.message);
    } else {
      alert("Room added successfully!");

      setFormData({
        title: "",
        location: "",
        price: "",
        type: "",
        tenant: "",
        contact: ""
      });
      setImageFile(null);
    }
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

        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          required
        />

        <button type="submit">Add Room</button>
      </form>
    </div>
  );
}

export default AddRoom;
