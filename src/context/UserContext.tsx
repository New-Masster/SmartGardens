import React, { createContext, useState, useContext, ReactNode } from "react";

// Define tipo de informações do usuário
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

// Defini tipo do contexto do usuário
type UserContextType = {
  userInfo: UserInfo;
  setUserInfo: (info: UserInfo) => void;
  clearUserInfo: () => void;
};

// Valores padrão para o estado inicial do usuário
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

// Criar contexto
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provedor do contexto do usuário
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<UserInfo>(defaultUserInfo);

  // Para limpar as informações do usuário
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