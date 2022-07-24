import { configureStore } from "@reduxjs/toolkit";
import { InitialValues } from "./modules/Products/types";

import rootReducer from "./reducers";

export type RootState = {
  ProductsReducer: InitialValues;
};

export const store = configureStore({ reducer: rootReducer });
