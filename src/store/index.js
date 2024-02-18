// import { applyMiddleware, combineReducers, compose, createStore } from "redux";
// import counterReducer from "./reducers/counterReducer";
// import dogReducer from "./reducers/dogReducer";
import authReducer from "./reducers/authReducer";
import { configureStore } from "@reduxjs/toolkit";
import { ENV } from "../constants/environments";
import cartReducer from "./reducers/cartReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
  devTools: ENV === "development",
});

export default store;
