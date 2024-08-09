import * as React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AddInspiration, Dashboard, Settings } from '../screens';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks';

const Tabs = createBottomTabNavigator();

const TabButton = (props) => {
   const colors = useTheme();

   const { name, focused } = props;
   // const focused = accessibilityState.focused;

   return <Ionicons name={name} color={focused ? colors?.theme.PRIMARY : colors?.theme.SECONDARY} />;
};

const BottomTabsNavigator = () => {
   return (
      <Tabs.Navigator>
         <Tabs.Screen
            name='Dashboard'
            component={Dashboard}
            options={{
               tabBarLabelPosition: 'below-icon',
               tabBarIcon: (props) => <TabButton name='home' props={props} />
            }}
         ></Tabs.Screen>
         <Tabs.Screen
            name='Settings'
            component={Settings}
            options={{
               tabBarLabelPosition: 'below-icon',
               tabBarIcon: (props) => <TabButton name='settings' props={props} />
            }}
         ></Tabs.Screen>
      </Tabs.Navigator>
   );
};

export { BottomTabsNavigator };
