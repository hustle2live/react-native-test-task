import React, { useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import * as SplashScreen from 'expo-splash-screen';

import { BottomTabsNavigator } from './bottom-tabs-navigator';

import { RootStackParamList } from '../types';
import { ThemeContextProps } from '../contexts/theme-context';
import { ROUTE_NAME } from '../enums';
import { useTheme } from '../hooks';
import { AddInspiration } from '../screens';
import { StyleSheet } from 'react-native';

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

   const fontPrimary = themeContext.fonts.LobsterRegular.fontFamily;

   const themeColors = themeContext.theme;
   const themeFonts = themeContext.fonts;
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

   const themeStyleProps = StyleSheet.create({
      fonts: themeFonts
   });

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
                  initialParams={themeStyleProps}
                  options={{
                     headerTintColor: themeColors.PRIMARY,
                     ...screenStyles.headerStyle
                  }}
               >
                  {(props) => <AddInspiration {...props} colors={themeColors} />}
               </RootStack.Screen>
            </RootStack.Navigator>
         </NavigationContainer>
      </>
   );
};

export { RootNavigator };
