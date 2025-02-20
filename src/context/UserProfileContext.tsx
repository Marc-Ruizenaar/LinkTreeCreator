"use client";
import { MyProfile } from "@/types/profile";
import React, { createContext, useContext, useState } from "react";

interface UserProfileProviderProps {
  children: React.ReactNode;
  data: MyProfile | null;
}

interface UserSectionContextType {
  user: MyProfile | null;
  setUser: React.Dispatch<React.SetStateAction<MyProfile | null>>;
}

const UserProfileContext = createContext<UserSectionContextType | undefined>(undefined);

export const UserProfileProvider: React.FC<UserProfileProviderProps> = ({ children, data }) => {
  const [user, setUser] = useState<MyProfile | null>(data);

  return (
    <UserProfileContext.Provider value={{ user, setUser }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export function useUserProfile() {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error("useUserProfile must be used within a UserProfileProvider");
  }
  return context;
}
