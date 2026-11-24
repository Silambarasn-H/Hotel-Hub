import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  addHotel,
  updateHotel
} from "../features/hotels/hotelSlice";

import SEO from "../components/SEO";

function AddHotel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const hotels = useSelector((state) => state.hotels);

  const existingHotel = hotels.find(
    (hotel) => String(hotel.id) === id
  );

  const [title, setTitle] = useState(
    existingHotel ? existingHotel.title : ""
  );

  const [description, setDescription] = useState(
    existingHotel ? existingHotel.description : ""
  );

  const [price, setPrice] = useState(
    existingHotel ? String(existingHotel.price) : ""
  );

  const [latitude, setLatitude] = useState(
    existingHotel ? String(existingHotel.latitude) : ""
  );

  const [longitude, setLongitude] = useState(
    existingHotel ? String(existingHotel.longitude) : ""
  );

  const [image, setImage] = useState(
    existingHotel ? existingHotel.image : ""
  );

  const [errors, setErrors] = useState({});

  function handleImageChange(e) {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setErrors({
        ...errors,
        image: "Please select an image file"
      });
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors({
        ...errors,
        image: "Image size must be less than 5 MB"
      });
      e.target.value = "";
      return;
    }

    setImage(URL.createObjectURL(file));

    setErrors({
      ...errors,
      image: ""
    });
  }

  function validateForm() {
    const newErrors = {};

    if (title.trim().length < 3) {
      newErrors.title =
        "Hotel name must contain at least 3 characters";
    }

    if (description.trim().length < 10) {
      newErrors.description =
        "Description must contain at least 10 characters";
    }

    if (price === "" || Number(price) <= 0) {
      newErrors.price =
        "Price must be greater than 0";
    }

    if (
      latitude === "" ||
      Number(latitude) < -90 ||
      Number(latitude) > 90
    ) {
      newErrors.latitude =
        "Latitude must be between -90 and 90";
    }

    if (
      longitude === "" ||
      Number(longitude) < -180 ||
      Number(longitude) > 180
    ) {
      newErrors.longitude =
        "Longitude must be between -180 and 180";
    }

    if (!image) {
      newErrors.image = "Please upload a hotel image";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    const hotelData = {
      id: existingHotel ? existingHotel.id : Date.now(),
      title: title.trim(),
      description: description.trim(),
      price: Number(price),
      latitude: Number(latitude),
      longitude: Number(longitude),
      image
    };

    if (existingHotel) {
      dispatch(updateHotel(hotelData));
      alert("Hotel updated successfully!");
    } else {
      dispatch(addHotel(hotelData));
      alert("Hotel added successfully!");
    }

    navigate("/");
  }

  if (id && !existingHotel) {
    return <h2>Hotel not found</h2>;
  }

  return (
    <div className="form-container">
      <SEO
        title={existingHotel ? "Edit Hotel | HotelHub" : "Add Hotel | HotelHub"}
        description="Add or update hotel details."
      />

      <h1>
        {existingHotel ? "Edit Hotel" : "Add New Hotel"}
      </h1>

      <form onSubmit={handleSubmit} noValidate>
        <label>Hotel Name</label>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter hotel name"
        />

        {errors.title && (
          <p className="error-message">{errors.title}</p>
        )}

        <label>Description</label>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter hotel description"
        />

        {errors.description && (
          <p className="error-message">{errors.description}</p>
        )}

        <label>Price</label>

        <input
          type="number"
          min="0"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter price"
        />

        {errors.price && (
          <p className="error-message">{errors.price}</p>
        )}

        <label>Latitude</label>

        <input
          type="number"
          step="any"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          placeholder="Enter latitude"
        />

        {errors.latitude && (
          <p className="error-message">{errors.latitude}</p>
        )}

        <label>Longitude</label>

        <input
          type="number"
          step="any"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          placeholder="Enter longitude"
        />

        {errors.longitude && (
          <p className="error-message">{errors.longitude}</p>
        )}

        <label>Upload Hotel Image</label>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />

        {errors.image && (
          <p className="error-message">{errors.image}</p>
        )}

        {image && (
          <img
            src={image}
            alt="Hotel Preview"
            className="image-preview"
          />
        )}

        <button type="submit" className="primary-btn">
          {existingHotel ? "Update Hotel" : "Add Hotel"}
        </button>
      </form>
    </div>
  );
}

export default AddHotel;
