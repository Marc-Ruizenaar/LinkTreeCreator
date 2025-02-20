"use client";
import { Sections } from "@/types/profile";
import React, { createContext, useContext, useState } from "react";

interface StoreSectionContextType {
  sections: Sections[];
  setSections: React.Dispatch<React.SetStateAction<Sections[]>>;
}

const StoreSectionContext = createContext<StoreSectionContextType>({
  sections: [],
  setSections: () => {},
});

export const StoreSection: React.FC<{
  children: React.ReactNode;
  data: Sections[];
}> = ({ children, data }) => {
  const [sections, setSections] = useState(data);

  return (
    <StoreSectionContext.Provider value={{ sections, setSections }}>
      {children}
    </StoreSectionContext.Provider>
  );
};

export function useStoreSections() {
  const context = useContext(StoreSectionContext);
  if (context === undefined) {
    throw new Error(
      "useStoreSections must be used within a StoreSectionProvider",
    );
  }
  return context;
}
