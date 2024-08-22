import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { BottomTabsNavigator } from './bottom-tabs-navigator';

import { RootStackParamList } from '../types';
import { ThemeContextProps } from '../contexts/theme-context';
import { ROUTE_NAME } from '../enums';
import { useTheme } from '../hooks';
import { AddInspiration } from '../screens';
import { Button, StyleSheet } from 'react-native';
import { Loader } from '../loader/loader';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
   const themeContext: ThemeContextProps | undefined = useTheme();

   if (!themeContext) {
      return <Loader color='#c86822' background='#fae8c0' />;
   }

   const fontPrimary = themeContext?.fonts.LobsterRegular.fontFamily;

   const themeColors = themeContext?.theme;
   const themeFonts = themeContext?.fonts;
   const handleThemeChange = themeContext?.toggleTheme;

   const screenStyles = StyleSheet.create({
      headerStyle: {
         backgroundColor: themeContext?.theme.APP_BACKGROUND,
         height: 46
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
                  options={{ headerShown: false, ...screenStyles }}
                  name={ROUTE_NAME.BOTTOM_TABS_NAVIGATOR}
                  initialParams={themeStyleProps}
               >
                  {(props) => (
                     <BottomTabsNavigator
                        {...props}
                        theme={themeColors}
                        headerStyles={screenStyles}
                        toggleTheme={handleThemeChange}
                     />
                  )}
               </RootStack.Screen>

               <RootStack.Screen
                  name={ROUTE_NAME.ADD_INSPIRATION}
                  initialParams={themeStyleProps}
                  options={{
                     ...screenStyles,
                     headerTintColor: themeColors.PRIMARY
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
