import { createContext, useState } from "react";
export const DataContext = createContext();
export const DataProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <DataContext.Provider value={{isLoading, setIsLoading}}>
      {children}
    </DataContext.Provider>
  );
};
