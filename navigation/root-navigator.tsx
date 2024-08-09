import * as React from 'react';

import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { BottomTabsNavigator } from './bottom-tabs-navigator';
import { RootStackParamList } from '../types';
import { AddInspiration, Dashboard, Settings } from '../screens';

const RootStack = createNativeStackNavigator<RootStackParamList>();

// const RootNavigator = () => {
//    return (
//       <>
//          <StatusBar />
//          <NavigationContainer>
//             <BottomTabsNavigator />
//          </NavigationContainer>
//       </>
//    );
// };
const RootNavigator = () => {
   return (
      <>
         <StatusBar />
         <NavigationContainer>
            <RootStack.Navigator screenOptions={{ headerShown: false }}>
               <RootStack.Screen name='BottomTabsNavigator' component={BottomTabsNavigator} />
               <RootStack.Screen name='AddInspiration' component={AddInspiration} />
            </RootStack.Navigator>
         </NavigationContainer>
      </>
   );
};

export { RootNavigator };
