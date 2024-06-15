import { configureStore } from "@reduxjs/toolkit";
import { auth } from "./services/auth";
import LayoutReducer from "./reducers/layoutReducer";
import UserReducer from "./reducers/userReducer";
import { category } from "./services/category";
import { colors } from "./services/color";
import { tags } from "./services/tag";

export const makeStore = () => {
  return configureStore({
    reducer: {
      // Add new reducers here
      layoutReducer: LayoutReducer,
      userReducer: UserReducer,
      [auth.reducerPath]: auth.reducer,
      [category.reducerPath]: category.reducer,
      [colors.reducerPath]: colors.reducer,
      [tags.reducerPath]: tags.reducer,
    },
    middleware: (middleware) => middleware().concat(auth.middleware, category.middleware, colors.middleware, tags.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
