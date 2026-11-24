import { createSlice } from "@reduxjs/toolkit";
import dummyHotels from "../../data/dummyHotels";

function loadHotels() {
  try {
    const savedHotels = localStorage.getItem("hotels");

    if (savedHotels) {
      return JSON.parse(savedHotels);
    }

    return dummyHotels;
  } catch (error) {
    console.error("Unable to load hotels:", error);
    return dummyHotels;
  }
}

const hotelSlice = createSlice({
  name: "hotels",

  initialState: loadHotels(),

  reducers: {
    addHotel: (state, action) => {
      state.push(action.payload);
    },

    updateHotel: (state, action) => {
      const index = state.findIndex(
        (hotel) => String(hotel.id) === String(action.payload.id)
      );

      if (index !== -1) {
        state[index] = action.payload;
      }
    },

    deleteHotel: (state, action) => {
      return state.filter(
        (hotel) => String(hotel.id) !== String(action.payload)
      );
    }
  }
});

export const {
  addHotel,
  updateHotel,
  deleteHotel
} = hotelSlice.actions;

export default hotelSlice.reducer;
