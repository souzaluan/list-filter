import React, { ReactNode } from "react";
import { FilterDataContextProvider } from "./FilterDataContext";

type Props = {
  children: ReactNode;
};

const AppProvider = ({ children }: Props) => (
  <>
    <FilterDataContextProvider>{children}</FilterDataContextProvider>
  </>
);

export default AppProvider;
