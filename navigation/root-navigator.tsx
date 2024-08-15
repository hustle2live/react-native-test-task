import * as React from 'react';

import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { BottomTabsNavigator } from './bottom-tabs-navigator';
import { RootStackParamList } from '../types';
import { AddInspiration, Dashboard, Settings } from '../screens';
import { ROUTE_NAME } from '../enums';

import { useTheme } from '../hooks';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
   const themeContext = useTheme();
   const themeFonts = themeContext?.fonts;

   return (
      <>
         <StatusBar />
         <NavigationContainer>
            <RootStack.Navigator
               initialRouteName='BottomTabsNavigator'
               screenOptions={{
                  headerStyle: {
                     backgroundColor: themeContext?.theme.APP_BACKGROUND
                  },
                  headerTitleStyle: {
                     fontFamily: themeFonts?.LobsterRegular.fontFamily
                  }
               }}
            >
               <RootStack.Screen
                  options={{ headerShown: false }}
                  name={ROUTE_NAME.BOTTOM_TABS_NAVIGATOR}
                  component={BottomTabsNavigator}
               />
               <RootStack.Screen name={ROUTE_NAME.ADD_INSPIRATION} component={AddInspiration} />
            </RootStack.Navigator>
         </NavigationContainer>
      </>
   );
};

export { RootNavigator };
