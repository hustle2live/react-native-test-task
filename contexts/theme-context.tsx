import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { COLORS_LIGHT, COLORS_DARK, FONTS } from '../constants';
import { ThemeContextProps } from '../types/props-styles.type';
import { useFonts } from '../hooks/use-fonts';

import { Loader } from '../loader/loader';

type ThemeType = typeof COLORS_LIGHT | typeof COLORS_DARK;

const ThemeMark = {
   DARK: 'DARK',
   LIGHT: 'LIGHT'
} as const;

type FontStyleType = Record<
   string,
   {
      fontSize: number;
      fontFamily: string;
   }
>;

const LocalStorageTheme = async (): Promise<keyof typeof ThemeMark | null> => {
   const result = await AsyncStorage.getItem('theme');
   if (result) {
      const savedTheme = JSON.parse(result);
      return savedTheme;
   }
   return null;
};

const SaveStorageTheme = async (theme: keyof typeof ThemeMark): Promise<void> => {
   AsyncStorage.setItem('theme', JSON.stringify(theme));
};

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
   const [theme, setTheme] = useState<ThemeType | null>(null);
   const [isLoaded, setIsLoaded] = useState(false);
   const [fontsLoaded, setFontsLoaded] = useState(false);

   const PrepareFonts = async () => {
      await useFonts(setFontsLoaded, console.warn);
   };

   const PrepareTheme = async () => {
      const savedTheme = await LocalStorageTheme();
      if (savedTheme === ThemeMark.DARK) {
         setTheme(COLORS_DARK);
      } else {
         setTheme(COLORS_LIGHT);
      }
   };

   useEffect(() => {
      PrepareFonts();
      PrepareTheme();
      setTimeout(() => {
         if (fontsLoaded && theme) {
            setIsLoaded(true);
         }
      }, 1000);
   }, [fontsLoaded]);

   useEffect(() => {
      switch (theme) {
         case COLORS_DARK:
            SaveStorageTheme(ThemeMark.DARK);
            break;
         case COLORS_LIGHT:
            SaveStorageTheme(ThemeMark.LIGHT);
            break;
      }
   }, [theme]);

   if (!isLoaded) {
      return <Loader color='#c86822' background='#fae8c0' />;
   }

   const toggleTheme = async () => {
      const newTheme = theme === COLORS_LIGHT ? COLORS_DARK : COLORS_LIGHT;
      setTheme(newTheme);
   };

   const themeProps = { theme, toggleTheme, fonts: fontStyles };

   return <ThemeContext.Provider value={themeProps}>{children}</ThemeContext.Provider>;
};

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

export { ThemeProvider, ThemeContext, LocalStorageTheme, type FontStyleType, type ThemeContextProps, type ThemeType };

// const InitialTheme = () => async () => {
//    const savedTheme = await LocalStorageTheme();
//    return savedTheme || COLORS_LIGHT;
// };

// enum ThemeMark {
//    DARK = 'DARK',
//    LIGHT = 'LIGHT'
// }
