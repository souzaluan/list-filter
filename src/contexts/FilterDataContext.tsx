import { createContext, ReactNode, useEffect, useState } from "react";

import { FilterData, Types } from "../components/Filter";

import { removeRepeatedValue } from "../utils/removeRepeatedValue";
import { api } from "../services/api";

export type Product = {
  id: string;
  name: string;
  color: string;
  category: string;
};

export type FilterDataContextData = {
  filterData: FilterData[];
};

type FilterDataContextProviderProps = {
  children: ReactNode;
};

export const FilterDataContext = createContext({} as FilterDataContextData);

export const FilterDataContextProvider = ({
  children,
}: FilterDataContextProviderProps) => {
  const [initialProducts, setInitialProducts] = useState<Product[]>([]);
  const [filterData, setFilterData] = useState<FilterData[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await api.get("product");

      return setInitialProducts(data.products);
    })();
  }, []);

  useEffect(() => {
    const types: Types[] = ["category", "color"];

    const data = types.map((type) => {
      return {
        title: type,
        options: initialProducts.map((product: Product) => ({
          value: product[type],
          label: product[type],
          type,
        })),
      };
    });
    const formatted = data.map((item) => {
      return {
        ...item,
        options: removeRepeatedValue(item.options, "value"),
      };
    });

    return setFilterData(formatted);
  }, [initialProducts]);

  return (
    <FilterDataContext.Provider value={{ filterData }}>
      {children}
    </FilterDataContext.Provider>
  );
};
