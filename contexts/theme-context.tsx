import React, { createContext, useState, useEffect, ReactNode, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { COLORS_LIGHT, COLORS_DARK } from '../constants';
import { StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';

type ThemeType = typeof COLORS_LIGHT | typeof COLORS_DARK;

interface FontStyleType {
   [key: string]: {
      fontSize: number;
      fontFamily: string;
   };
}

interface ThemeContextProps {
   theme: ThemeType;
   toggleTheme: () => void;
   fonts: FontStyleType | null;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
   const [theme, setTheme] = useState<ThemeType>(COLORS_LIGHT);
   const [fonts, setFonts] = useState<FontStyleType | null>(null);

   const [fontsLoaded, error] = useFonts({
      'LobsterTwo-Italic': require('../assets/fonts/LobsterTwo-Italic.otf'),
      'LobsterTwo-Regular': require('../assets/fonts/LobsterTwo-Regular.otf')
   });

   useEffect(() => {
      if (!error) {
         const fontStyles: FontStyleType = StyleSheet.create({
            LobsterItalic: {
               fontSize: 20,
               fontFamily: 'LobsterTwo-Italic'
            },
            LobsterRegular: {
               fontSize: 20,
               fontFamily: 'LobsterTwo-Regular'
            }
         });
         // loading fonts use state function ...
         console.log('fonts loaded');
         setFonts(fontStyles);
      }
   }, []);

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

   return <ThemeContext.Provider value={{ theme, toggleTheme, fonts }}>{children}</ThemeContext.Provider>;
};

export { ThemeProvider, ThemeContext, type FontStyleType };
