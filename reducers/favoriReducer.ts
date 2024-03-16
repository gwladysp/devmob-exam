import { createSlice } from "@reduxjs/toolkit";
import Announcement from "../models/Announcement";

interface ActionType {
  payload: Announcement;
  type: string;
}

const favoriSlice = createSlice({
  name: "favori",
  initialState: [] as Array<Announcement>,
  reducers: {
    addFavori: (state, { payload }: ActionType) => {
      state.push(payload);
      return state;
    },
    removeFavori: (state, { payload }: ActionType) => {
      state = state.filter((m) => m.id !== payload.id);
      return state;
    },
  },
});

export const { addFavori, removeFavori } = favoriSlice.actions;

export default favoriSlice.reducer;
