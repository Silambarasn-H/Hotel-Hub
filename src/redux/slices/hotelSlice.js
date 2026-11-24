import { createSlice } from "@reduxjs/toolkit";
import dummyHotels from "../../data/dummyHotels";

const hotelSlice = createSlice({
  name: "hotels",

  initialState: dummyHotels,

  reducers: {
    addHotel: (state, action) => {
      state.push(action.payload);
    },

    updateHotel: (state, action) => {
      const index = state.findIndex(
        (hotel) => hotel.id === action.payload.id
      );

      if (index !== -1) {
        state[index] = action.payload;
      }
    },

    deleteHotel: (state, action) => {
      return state.filter(
        (hotel) => hotel.id !== action.payload
      );
    },
  },
});

export const { addHotel, updateHotel, deleteHotel } =
  hotelSlice.actions;

export default hotelSlice.reducer;
