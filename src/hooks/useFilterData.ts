import { useContext } from "react";
import {
  FilterDataContext,
  FilterDataContextData,
} from "../contexts/FilterDataContext";

export const useFilterData = (): FilterDataContextData => {
  const context = useContext(FilterDataContext);
  return context;
};
