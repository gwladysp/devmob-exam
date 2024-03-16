import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  year?: number;
  minPrice?: number;
  maxPrice?: number;
  searchQuery?: string;
  city?: string;
  country?: string;
}

const initialState: FilterState = {};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setYearFilter(state, action: PayloadAction<number | undefined>) {
      state.year = action.payload;
    },

    setPriceFilter(
      state,
      action: PayloadAction<{ minPrice?: number; maxPrice?: number }>
    ) {
      const { minPrice, maxPrice } = action.payload;
      state.minPrice = minPrice;
      state.maxPrice = maxPrice;
    },

    setSearchQuery(state, action: PayloadAction<string | undefined>) {
      state.searchQuery = action.payload;
    },

    setCityFilter(state, action: PayloadAction<string | undefined>) {
      state.city = action.payload;
    },

    setCountryFilter(state, action: PayloadAction<string | undefined>) {
      state.country = action.payload;
    },
    clearFilters() {
      return initialState;
    },
  },
});

export const {
  setYearFilter,
  setPriceFilter,
  clearFilters,
  setSearchQuery,
  setCityFilter,
  setCountryFilter,
} = filterSlice.actions;

export default filterSlice.reducer;
