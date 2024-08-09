import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AddInspiration, Dashboard, Settings } from '../screens';

const Tabs = createBottomTabNavigator();

const BottomTabsNavigator = () => {
   return (
      <Tabs.Navigator>
         <Tabs.Screen name='Home' component={Dashboard}></Tabs.Screen>
         <Tabs.Screen name='Settings' component={Settings}></Tabs.Screen>
      </Tabs.Navigator>
   );
};

export { BottomTabsNavigator };
