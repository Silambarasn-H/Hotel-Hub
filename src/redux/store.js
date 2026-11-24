import { configureStore } from "@reduxjs/toolkit";
import hotelReducer from "../features/hotels/hotelSlice";

const store = configureStore({
  reducer: {
    hotels: hotelReducer
  }
});

store.subscribe(() => {
  const hotels = store.getState().hotels;

  localStorage.setItem(
    "hotels",
    JSON.stringify(hotels)
  );
});

export default store;
