import { combineReducers, configureStore } from "@reduxjs/toolkit";
import notification from "./notification";

const reducer = combineReducers({
  notification,
});

export default configureStore({
  reducer,
});
