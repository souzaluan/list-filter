import { TypeAction } from "../../types";
import { FilterOption, InitialValues, Product, Types } from "./types";

const initialState: InitialValues = {
  products: [],
  currentFilters: [],
};

export type Action = TypeAction<{
  products?: Product[];
  filters: FilterOption[];
}>;

export const ProductsReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case Types.SET_PRODUCTS:
      return { ...state, products: action.payload.products };

    case Types.SET_CURRENT_FILTERS:
      return { ...state, currentFilters: action.payload.filters };

    default:
      return state;
  }
};

export const ActionsProducts = {
  setProducts(products: Product[]) {
    return {
      type: Types.SET_PRODUCTS,
      payload: { products },
    };
  },
  setCurrentFilters(filters: FilterOption[]) {
    return {
      type: Types.SET_CURRENT_FILTERS,
      payload: { filters },
    };
  },
};
