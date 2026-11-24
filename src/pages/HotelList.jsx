import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { deleteHotel } from "../features/hotels/hotelSlice";

import Sidebar from "../components/Sidebar";
import HotelCard from "../components/HotelCard";
import Pagination from "../components/Pagination";
import SEO from "../components/SEO";

function HotelList() {
  const hotels = useSelector((state) => state.hotels);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const hotelsPerPage = 3;

  const filteredHotels = hotels.filter((hotel) => {
    const matchesTitle = hotel.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesMinPrice =
      minPrice === "" || hotel.price >= Number(minPrice);

    const matchesMaxPrice =
      maxPrice === "" || hotel.price <= Number(maxPrice);

    return (
      matchesTitle &&
      matchesMinPrice &&
      matchesMaxPrice
    );
  });

  const totalPages = Math.ceil(
    filteredHotels.length / hotelsPerPage
  );

  const startIndex = (currentPage - 1) * hotelsPerPage;

  const currentHotels = filteredHotels.slice(
    startIndex,
    startIndex + hotelsPerPage
  );

  function handleSearch(e) {
    e.preventDefault();
    setSearchTerm(searchInput.trim());
    setCurrentPage(1);
  }

  function handleClearFilters() {
    setSearchInput("");
    setSearchTerm("");
    setMinPrice("");
    setMaxPrice("");
    setCurrentPage(1);
  }

  function handleDelete(id) {
    dispatch(deleteHotel(id));
    alert("Hotel deleted successfully!");

    if (currentHotels.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function handlePriceChange(type, value) {
    if (type === "min") {
      setMinPrice(value);
    } else {
      setMaxPrice(value);
    }

    setCurrentPage(1);
  }

  function handleNext() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  function handlePrevious() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  return (
    <div className="page-container">

      <SEO
        title="Explore Hotels | HotelHub"
        description="Explore and find hotels based on your preferred location and price."
      />

      <div className="page-heading">
        <div>
          <h1>Explore Hotels</h1>
          <p>Find the perfect place for your stay</p>
        </div>
      </div>

      <form className="search-section" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search hotels by name..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />

        <button type="submit" className="primary-btn">
          Search
        </button>
      </form>

      <div className="hotel-layout">
        <Sidebar
          minPrice={minPrice}
          maxPrice={maxPrice}
          onPriceChange={handlePriceChange}
        />

        <main className="hotel-content">

          <div className="hotel-heading-row">
            <h2>Available Hotels</h2>

            <button
              className="clear-filter-btn"
              onClick={handleClearFilters}
            >
              Clear Filters
            </button>
          </div>

          <div className="hotel-list">
            {currentHotels.map((hotel) => (
              <HotelCard
                key={hotel.id}
                hotel={hotel}
                onDelete={handleDelete}
              />
            ))}
          </div>

          {filteredHotels.length === 0 && (
            <p>No hotels found. Try clearing your filters.</p>
          )}

          {filteredHotels.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onNext={handleNext}
              onPrevious={handlePrevious}
              onPageChange={setCurrentPage}
            />
          )}

        </main>
      </div>
    </div>
  );
}

export default HotelList;
