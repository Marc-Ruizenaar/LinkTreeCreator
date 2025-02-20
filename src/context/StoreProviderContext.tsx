"use client";
import { Store } from "@/types/profile";
import React, { createContext, useContext, useState } from "react";

interface UserProfileProviderProps {
  children: React.ReactNode;
  data: Store | null;
}

interface UserSectionContextType {
  store: Store | null;
  setStore: React.Dispatch<React.SetStateAction<Store | null>>;
}

const StoreContext = createContext<UserSectionContextType | undefined>(undefined);

export const StoreProfile: React.FC<UserProfileProviderProps> = ({ children, data }) => {
  const [store, setStore] = useState<Store | null>(data);

  return (
    <StoreContext.Provider value={{ store, setStore }}>
      {children}
    </StoreContext.Provider>
  );
};

export function useStoreProfile() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStoreProfile must be used within a StoreProfile provider");
  }
  return context;
}