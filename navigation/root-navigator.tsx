import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { BottomTabsNavigator } from './bottom-tabs-navigator';

import { RootStackParamList } from '../types';
import { ThemeContextProps } from '../contexts/theme-context';
import { ROUTE_NAME } from '../enums';
import { useTheme } from '../hooks';
import { AddInspiration } from '../screens';
import { StyleSheet } from 'react-native';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
   const themeContext: ThemeContextProps | undefined = useTheme();
   const fontPrimary = themeContext?.fonts.LobsterRegular.fontFamily;

   const themeColors = themeContext?.theme;
   const themeFonts = themeContext?.fonts;

   const primary = themeContext?.theme.PRIMARY ?? '#660014';
   const secondary = themeContext?.theme.SECONDARY ?? '#e8caa2';

   const screenStyles = StyleSheet.create({
      headerStyle: {
         backgroundColor: themeContext?.theme.APP_BACKGROUND
      },
      headerTitleStyle: {
         fontFamily: fontPrimary
      }
   });

   const themeStyleProps = {
      colors: themeColors,
      fonts: themeFonts
   };

   return (
      <>
         <StatusBar />
         <NavigationContainer>
            <RootStack.Navigator initialRouteName='BottomTabsNavigator' screenOptions={screenStyles}>
               <RootStack.Screen
                  options={{ headerShown: false }}
                  name={ROUTE_NAME.BOTTOM_TABS_NAVIGATOR}
                  component={BottomTabsNavigator}
                  initialParams={themeStyleProps}
               />

               <RootStack.Screen
                  name={ROUTE_NAME.ADD_INSPIRATION}
                  component={AddInspiration}
                  initialParams={themeStyleProps}
                  options={{
                     headerStyle: { backgroundColor: themeContext?.theme.APP_BACKGROUND, height: 46 }
                  }}
               />
            </RootStack.Navigator>
         </NavigationContainer>
      </>
   );
};

export { RootNavigator };
