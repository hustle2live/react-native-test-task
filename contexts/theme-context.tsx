import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { COLORS_LIGHT, COLORS_DARK } from '../constants';

type ThemeType = typeof COLORS_LIGHT | typeof COLORS_DARK;

interface ThemeContextProps {
   theme: ThemeType;
   toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
   const [theme, setTheme] = useState<ThemeType>(COLORS_LIGHT);

   // Add logic to retrieve theme from AsyncStorage here

   // useEffect(() => {
   //    const checkForTheme = async <ThemeType | undefined>() => {
   //       const currentTheme: string | undefined = await AsyncStorage.getItem('theme');

   //       if (currentTheme) {
   //          setTheme(currentTheme);
   //       }
   //    };
   // }, []);

   // Add logic to toggle theme here
   const toggleTheme = async () => {
      theme === COLORS_LIGHT ? setTheme(COLORS_DARK) : setTheme(COLORS_LIGHT);
   };

   return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export { ThemeProvider, ThemeContext };
