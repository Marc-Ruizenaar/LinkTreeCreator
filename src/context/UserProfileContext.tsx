"use client";
import React, { createContext, useContext, useState } from "react";

interface DataUser {
  id: string;
  name: string;
  displayname: string;
  socialmedia: string[];
  email: string;
  phonenumber: string;
  user_id: string;
}

interface UserProfileProviderProps {
  children: React.ReactNode;
  data: DataUser | null;
}

interface UserSectionContextType {
  user: DataUser | null;
  setUser: React.Dispatch<React.SetStateAction<DataUser | null>>;
}

const UserProfileContext = createContext<UserSectionContextType | undefined>(undefined);

export const UserProfileProvider: React.FC<UserProfileProviderProps> = ({ children, data }) => {
  const [user, setUser] = useState<DataUser | null>(data);

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
