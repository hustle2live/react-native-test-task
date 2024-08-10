import * as React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AddInspiration, Dashboard, Settings } from '../screens';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks';

const Tabs = createBottomTabNavigator();

type TProps = {
   props: {
      focused: boolean;
      color: string;
      size: number;
      name?: any;
      primaryColor: string | undefined;
      secondaryColor: string | undefined;
   };
};

const TabButton = ({ props }: TProps) => {
   const { name, focused, primaryColor, secondaryColor } = props;
   return <Ionicons name={name} size={16} color={focused ? primaryColor : secondaryColor} />;
};

const BottomTabsNavigator = () => {
   const colors = useTheme();
   const tabBackground = colors?.theme.APP_BACKGROUND;
   const primaryColor = colors?.theme.PRIMARY;
   const secondaryColor = colors?.theme.SECONDARY;

   return (
      <Tabs.Navigator
         screenOptions={{
            tabBarStyle: { backgroundColor: tabBackground },
            tabBarActiveTintColor: primaryColor,
            tabBarInactiveTintColor: secondaryColor
         }}
      >
         <Tabs.Screen
            name='Dashboard'
            component={Dashboard}
            options={{
               tabBarLabelPosition: 'below-icon',
               tabBarIcon: (props) => <TabButton props={{ name: 'home', primaryColor, secondaryColor, ...props }} />
            }}
         ></Tabs.Screen>
         <Tabs.Screen
            name='Settings'
            component={Settings}
            options={{
               tabBarLabelPosition: 'below-icon',
               tabBarIcon: (props) => <TabButton props={{ name: 'settings', primaryColor, secondaryColor, ...props }} />
            }}
         ></Tabs.Screen>
      </Tabs.Navigator>
   );
};

export { BottomTabsNavigator };
