"use client";
import React, { createContext, useContext, useState } from "react";

interface UserProfileProviderProps {
  children: React.ReactNode;
  data: DataUser | null;
}

export interface DataUser {
  displayname: string;
  bio: string;
  public?: boolean;
  user_id: string;
  instagram?: string;
  tiktok?: string;
  email?: string;
  facebook?: string;
  youtube?: string;
  website?: string;
  pinterest?: string;
  linkedin?: string;
  x?: string;
  spotify?: string;
  applePodcast?: string;
  etsy?: string;
  discord?: string;
  snapchat?: string;
  twitch?: string;
  vimeo?: string;
  profilePicture: string;
}

interface UserSectionContextType {
  store: DataUser | null;
  setStore: React.Dispatch<React.SetStateAction<DataUser | null>>;
}

const StoreContext = createContext<UserSectionContextType | undefined>(undefined);

export const StoreProfile: React.FC<UserProfileProviderProps> = ({ children, data }) => {
  const [store, setStore] = useState<DataUser | null>(data);

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