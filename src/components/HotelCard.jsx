import { Link } from "react-router-dom";

function HotelCard({ hotel, onDelete }) {

  function handleDelete() {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${hotel.title}?`
    );

    if (confirmDelete) {
      onDelete(hotel.id);
    }
  }

  return (
    <div className="hotel-card">

      <Link
        to={`/hotel/${hotel.id}`}
        className="hotel-image-link"
      >
        <img
          src={hotel.image}
          alt={hotel.title}
          className="hotel-image"
        />
      </Link>

      <div className="hotel-info">

        <Link
          to={`/hotel/${hotel.id}`}
          className="hotel-title-link"
        >
          <h3 className="hotel-title">
            {hotel.title}
          </h3>
        </Link>

        <p>{hotel.description}</p>

        <h3>₹{hotel.price}</h3>

        <div className="card-actions">

          <Link
            to={`/edit-hotel/${hotel.id}`}
            className="edit-btn"
          >
            Edit
          </Link>

          <button
            className="delete-btn"
            onClick={handleDelete}
          >
            Delete
          </button>

        </div>
      </div>
    </div>
  );
}

export default HotelCard;
