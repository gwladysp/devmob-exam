import { configureStore } from "@reduxjs/toolkit";
import favoriReducer from "../reducers/favoriReducer";
import Announcement from "../models/Announcement";
import filterReducer from "../reducers/filterReducer";

const globalStore = configureStore({
  reducer: {
    favori: favoriReducer,
    filters: filterReducer,
  },
});

export interface GlobalStoreProps {
  favori: Array<Announcement>;
  filters: any;
}

export default globalStore;
