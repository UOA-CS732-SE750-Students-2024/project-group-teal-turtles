import { createContext, useContext } from "react";

export const DataContext = createContext();

export const useDataContext = () => {
	return useContext(DataContext);
};
