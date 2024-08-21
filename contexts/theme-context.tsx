import React, { createContext, useState, useEffect, ReactNode, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { COLORS_LIGHT, COLORS_DARK, FONTS } from '../constants';
import { StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';

type ThemeType = typeof COLORS_LIGHT | typeof COLORS_DARK;

type FontStyleType = Record<
   string,
   {
      fontSize: number;
      fontFamily: string;
   }
>;

interface ThemeContextProps {
   theme: ThemeType;
   toggleTheme: () => void;
   fonts: FontStyleType;
}

const fontStyles: FontStyleType = StyleSheet.create({
   LobsterRegular: {
      fontSize: 20,
      fontFamily: FONTS.LOBSTER_REGULAR
   },
   LobsterItalic: {
      fontSize: 20,
      fontFamily: FONTS.LOBSTER_ITALIC
   }
});

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
   const [theme, setTheme] = useState<ThemeType>(COLORS_LIGHT);

   try {
      const [fontsLoaded, error] = useFonts({
         [FONTS.LOBSTER_REGULAR]: require('../assets/fonts/LobsterTwo-Regular.otf'),
         [FONTS.LOBSTER_ITALIC]: require('../assets/fonts/LobsterTwo-Italic.otf')
      });
      if (!fontsLoaded && error) throw new Error(error.message);
   } catch (error) {
      console.log(error);
   }

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
      const newTheme = theme === COLORS_LIGHT ? COLORS_DARK : COLORS_LIGHT;
      setTheme(newTheme);
   };

   const themeProps = { theme, toggleTheme, fonts: fontStyles };

   return <ThemeContext.Provider value={themeProps}>{children}</ThemeContext.Provider>;
};

export { ThemeProvider, ThemeContext, type FontStyleType, type ThemeContextProps, type ThemeType };
