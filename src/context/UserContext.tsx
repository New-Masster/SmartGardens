import React, { createContext, useState, useContext, ReactNode } from "react";

type UserInfo = {
  name: string;
  surname: string;
  email: string;
  phone: string;
  cep: string;
  address: string;
  number: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  photo: string | null;
};

type UserContextType = {
  userInfo: UserInfo;
  setUserInfo: (info: UserInfo) => void;
  clearUserInfo: () => void;
};

const defaultUserInfo: UserInfo = {
  name: "",
  surname: "",
  email: "",
  phone: "",
  cep: "",
  address: "",
  number: "",
  street: "",
  neighborhood: "",
  city: "",
  state: "",
  photo: null,
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<UserInfo>(defaultUserInfo);

  const clearUserInfo = () => setUserInfo(defaultUserInfo);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo, clearUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};