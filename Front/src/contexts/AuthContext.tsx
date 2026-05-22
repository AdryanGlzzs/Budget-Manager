import { createContext, useState, type ReactNode } from "react";


export const ThemeContext = createContext('');

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  
    const[teste, setTeste] = useState('')

  return (
    <ThemeContext.Provider value={teste}>
      {children}
    </ThemeContext.Provider>
  );
};