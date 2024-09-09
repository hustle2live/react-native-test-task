import React, { createContext, useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';

import { COLORS_LIGHT, COLORS_DARK, FONTS, ThemeMark, FontStyleType } from '../common/constants';
import { ThemeContextProps } from '../common/types/props-styles.type';
import { useFonts } from '../hooks/use-fonts';
import { getLocalStorageTheme, saveStorageTheme } from '../services/themeStorageHandler';

import { Loader } from '../components/loader/loader';

type ThemeType = typeof COLORS_LIGHT | typeof COLORS_DARK;

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

const ThemeProvider: React.FC<{ children: JSX.Element }> = ({ children }) => {
   const [theme, setTheme] = useState<ThemeType | null>(null);
   const [isLoaded, setIsLoaded] = useState(false);
   const [fontsLoaded, setFontsLoaded] = useState(false);

   const PrepareFonts = async () => {
      await useFonts(setFontsLoaded, console.warn);
   };

   const PrepareTheme = async () => {
      const savedTheme = await getLocalStorageTheme();
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
            saveStorageTheme(ThemeMark.DARK);
            break;
         case COLORS_LIGHT:
            saveStorageTheme(ThemeMark.LIGHT);
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
   LOBSTER_REGULAR: {
      fontSize: 20,
      fontFamily: FONTS.LOBSTER_REGULAR
   },
   LOBSTER_ITALIC: {
      fontSize: 20,
      fontFamily: FONTS.LOBSTER_ITALIC
   }
});

export { ThemeProvider, ThemeContext, type FontStyleType, type ThemeContextProps, type ThemeType };
