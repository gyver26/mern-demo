import { useContext } from "react";
import { AppContext } from "../context/AppProvider";

const useAppContext = () => {
  const appContext = useContext(AppContext);

  return appContext;
};

export default useAppContext;
