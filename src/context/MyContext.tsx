// /src/context/AppStateContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppStateContextProps {
  navbarActive: string;
  setNavbarActive: React.Dispatch<React.SetStateAction<string>>;
  searchBar: string;
  setSearchBar: React.Dispatch<React.SetStateAction<string>>;
  playTrack: string;
  setPlayTrack: React.Dispatch<React.SetStateAction<string>>;
}

const AppStateContext = createContext<AppStateContextProps | undefined>(undefined);

export const AppStateProvider = ({ children }: { children: ReactNode }) => {
  const [navbarActive, setNavbarActive] = useState("home");
  const [searchBar, setSearchBar] = useState("");
  const [playTrack, setPlayTrack] = useState("");

  return (
    <AppStateContext.Provider
      value={{ navbarActive, setNavbarActive, searchBar, setSearchBar, playTrack, setPlayTrack }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within an AppStateProvider");
  }
  return context;
};
