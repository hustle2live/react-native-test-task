import React, { createContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

import { COLORS_LIGHT, COLORS_DARK, FONTS } from '../constants';
import { ThemeContextProps } from '../types/props-styles.type';
import { useFonts } from '../hooks/use-fonts';

import * as SplashScreen from 'expo-splash-screen';
import { Loader } from '../loader/loader';

// import { useFonts } from 'expo-font';

type ThemeType = typeof COLORS_LIGHT | typeof COLORS_DARK;

type FontStyleType = Record<
   string,
   {
      fontSize: number;
      fontFamily: string;
   }
>;

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

// SplashScreen.preventAutoHideAsync();

const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
   const [theme, setTheme] = useState<ThemeType>(COLORS_LIGHT);
   const [isLoaded, setIsLoaded] = useState(false);

   const [resolve, reject] = [() => setIsLoaded(true), (msg: string) => console.warn(msg)];
   const Prepare = async () => {
      useFonts(resolve, reject);
   };
   useEffect(() => {
      setTimeout(Prepare, 1300);
   }, []);

   if (!isLoaded) {
      return <Loader color='#c86822' background='#fae8c0' />;
      // return null;
   }

   // SplashScreen.hideAsync();

   // ----------------------------------
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
