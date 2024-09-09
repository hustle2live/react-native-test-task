import React, { useCallback, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import * as SplashScreen from 'expo-splash-screen';

import { BottomTabsNavigator } from './bottom-tabs-navigator';

import { Inspiration, RootStackParamList } from '../types';
import { ThemeContextProps } from '../contexts/theme-context';
import { ROUTE_NAME } from '../enums';
import { useTheme } from '../hooks';
import { AddInspiration } from '../screens';
import { StyleSheet } from 'react-native';
import { ThemeScreepProps } from '../types/props-styles.type';

const preventAutoHide = () => {
   SplashScreen.preventAutoHideAsync();
};

preventAutoHide();

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
   const themeContext: ThemeContextProps | undefined = useTheme();
   const onLayoutRootView = useCallback(async () => {
      await SplashScreen.hideAsync();
   }, []);

   preventAutoHide();
   if (!themeContext?.theme) {
      return null;
   } else {
      onLayoutRootView();
   }

   const themeColors = themeContext.theme;
   const themeFonts = themeContext.fonts;
   const fontPrimary = themeFonts.LOBSTER_REGULAR.fontFamily;

   // const themeProps: ThemeScreepProps = themeContext;
   // console.log(themeProps);

   const handleThemeChange = themeContext.toggleTheme;

   const screenStyles = StyleSheet.create({
      headerStyle: {
         backgroundColor: themeColors.APP_BACKGROUND,
         height: 80,
         shadowColor: '#000',
         shadowOffset: { width: 0, height: 1 },
         shadowOpacity: 0.8,
         shadowRadius: 1
      },
      headerTitleStyle: {
         fontFamily: fontPrimary,
         color: themeColors.PRIMARY
      }
   });

   const themeStyleProps = {
      fonts: themeFonts
   };

   return (
      <>
         <StatusBar />
         <NavigationContainer>
            <RootStack.Navigator initialRouteName='BottomTabsNavigator' screenOptions={screenStyles}>
               <RootStack.Screen
                  name={ROUTE_NAME.BOTTOM_TABS_NAVIGATOR}
                  initialParams={themeStyleProps}
                  options={{
                     headerShown: false,
                     ...screenStyles.headerStyle
                  }}
               >
                  {(props) => (
                     <BottomTabsNavigator
                        {...props}
                        theme={themeColors}
                        toggleTheme={handleThemeChange}
                        headerPropsStyles={screenStyles}
                     />
                  )}
               </RootStack.Screen>

               <RootStack.Screen
                  name={ROUTE_NAME.ADD_INSPIRATION}
                  options={{
                     headerTintColor: themeColors.PRIMARY,
                     ...screenStyles.headerStyle
                  }}
               >
                  {(props) => <AddInspiration {...props} colors={themeColors} fonts={themeFonts} />}
               </RootStack.Screen>
            </RootStack.Navigator>
         </NavigationContainer>
      </>
   );
};

export { RootNavigator };
