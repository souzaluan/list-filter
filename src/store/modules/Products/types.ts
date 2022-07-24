export enum Types {
  SET_PRODUCTS = "products/SET_PRODUCTS",
  SET_CURRENT_FILTERS = "products/SET_CURRENT_FILTERS",
}
export type FilterOption = {
  label: string;
  value: string;
  type: string;
};

export type Product = {
  id: string;
  name: string;
  color: string;
  category: string;
};

export type InitialValues = {
  currentFilters: FilterOption[];
  products: Product[];
};
