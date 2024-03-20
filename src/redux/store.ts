import { configureStore } from "@reduxjs/toolkit";
import { auth } from "./services/auth";
import LayoutReducer from "./reducers/layoutReducer";

export const makeStore = () => {
  return configureStore({
    reducer: {
      // Add new reducers here
      layoutReducer: LayoutReducer,
      [auth.reducerPath]: auth.reducer,
    },
    middleware: (middleware) => middleware().concat(auth.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
