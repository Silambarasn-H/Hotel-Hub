import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

import SEO from "../components/SEO";

function HotelDetails() {
  const { id } = useParams();

  const hotels = useSelector((state) => state.hotels);

  const hotel = hotels.find(
    (item) => String(item.id) === id
  );

  const [userLocation, setUserLocation] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function getUserLocation() {
    setError("");

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setUserLocation({
          latitude,
          longitude
        });

        setLoading(false);
      },

      (error) => {
        setLoading(false);

        if (error.code === 1) {
          setError("Location permission denied. Please allow location access.");
        } else if (error.code === 2) {
          setError("Your current location is unavailable.");
        } else if (error.code === 3) {
          setError("Location request timed out. Please try again.");
        } else {
          setError("Unable to get your location.");
        }
      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  }

  if (!hotel) {
    return (
      <div className="details-container">
        <h2>Hotel not found</h2>
        <Link to="/">Back to Hotels</Link>
      </div>
    );
  }

  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${hotel.longitude - 0.01}%2C${hotel.latitude - 0.01}%2C${hotel.longitude + 0.01}%2C${hotel.latitude + 0.01}&layer=mapnik&marker=${hotel.latitude}%2C${hotel.longitude}`;

  return (
    <div className="details-container">

      <SEO
        title={`${hotel.title} | HotelHub`}
        description={hotel.description}
      />

      <Link to="/" className="back-link">
        ← Back to Hotels
      </Link>

      <h1>{hotel.title}</h1>

      <img
        src={hotel.image}
        alt={hotel.title}
        className="details-image"
      />

      <div className="details-info">
        <h2>Hotel Information</h2>

        <p>
          <strong>Hotel Name:</strong> {hotel.title}
        </p>

        <p>
          <strong>Description:</strong> {hotel.description}
        </p>

        <p>
          <strong>Price:</strong> ₹{hotel.price}
        </p>

        <p>
          <strong>Latitude:</strong> {hotel.latitude}
        </p>

        <p>
          <strong>Longitude:</strong> {hotel.longitude}
        </p>
      </div>

      <div className="map-section">
        <h2>Hotel Location</h2>

        <iframe
          title="Hotel Location Map"
          src={mapUrl}
          width="100%"
          height="350"
          style={{ border: 0 }}
          loading="lazy"
        ></iframe>

        <div className="location-section">
          <h3>Your Current Location</h3>

          <button
            type="button"
            className="primary-btn"
            onClick={getUserLocation}
            disabled={loading}
          >
            {loading ? "Getting Location..." : "Get My Location"}
          </button>

          {error && (
            <p className="error-message">
              {error}
            </p>
          )}

          {userLocation && (
            <div className="user-location-info">
              <p>
                <strong>Your Latitude:</strong>{" "}
                {userLocation.latitude}
              </p>

              <p>
                <strong>Your Longitude:</strong>{" "}
                {userLocation.longitude}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HotelDetails;
