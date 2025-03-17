import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Configuration for redux-persist
const persistConfig = {
  key: "user", // The key in localStorage
  storage,
  version: 1, // Version of the persist storage
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, userReducer);

// Configure store with the persisted reducer
export const store = configureStore({
  reducer: {
    user: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Avoid issues with non-serializable data
    }),
});

// Export the persistor
export const persistor = persistStore(store);