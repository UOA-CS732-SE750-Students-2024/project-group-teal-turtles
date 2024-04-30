"use client"

import React, { useState } from "react";

import { DataContext } from "./DataContext";

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({ test: "test" });

  const contextValue = { data, setData };

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};