"use client";
import React, { createContext, useContext, useState } from "react";

export interface StoreSectionData {
  id: number;
  created_at: string;
  user_id: string;
  position: string;
  href: string;
  title: string;
  imageSrc: string;
  subTitle?: string;
}

interface StoreSectionContextType {
  sections: StoreSectionData[];
  setSections: React.Dispatch<React.SetStateAction<StoreSectionData[]>>;
}

const StoreSectionContext = createContext<StoreSectionContextType>({
  sections: [],
  setSections: () => {},
});

export const StoreSection: React.FC<{
  children: React.ReactNode;
  data: StoreSectionData[];
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
    throw new Error("useStoreSections must be used within a StoreSectionProvider");
  }
  return context;
}