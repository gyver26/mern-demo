import React, { createContext } from "react";
import useAppProvider from "../hooks/useAppProvider";

const AppContext = createContext();

function AppProvider({ children }) {
  const value = useAppProvider();
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export { AppContext };

export default AppProvider;
