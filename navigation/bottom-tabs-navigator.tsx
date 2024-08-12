import * as React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AddInspiration, Dashboard, Settings } from '../screens';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks';
import { FontStyleType } from '../contexts/theme-context';

const Tabs = createBottomTabNavigator();

type TProps = {
   props: {
      focused: boolean;
      color: string;
      size: number;
      name?: any;
      primaryColor: string | undefined;
      secondaryColor: string | undefined;
      themeFonts: FontStyleType | undefined;
   };
};

const TabButton = ({ props }: TProps) => {
   const { name, focused, primaryColor, secondaryColor } = props;
   return <Ionicons name={name} size={20} color={focused ? primaryColor : secondaryColor} />;
};

const BottomTabsNavigator = () => {
   const themeContext = useTheme();
   const tabBackground = themeContext?.theme.APP_BACKGROUND;
   const primaryColor = themeContext?.theme.PRIMARY;
   const secondaryColor = themeContext?.theme.SECONDARY;
   const themeFonts = themeContext?.fonts ?? undefined;

   return (
      <Tabs.Navigator
         screenOptions={{
            tabBarStyle: {
               backgroundColor: tabBackground,
               padding: 2,
               margin: 0,
               justifyContent: 'center',
               height: 50
            },
            tabBarActiveTintColor: primaryColor,
            tabBarInactiveTintColor: secondaryColor
         }}
      >
         <Tabs.Screen
            name='Dashboard'
            component={Dashboard}
            options={{
               tabBarLabelStyle: { fontFamily: themeFonts?.LobsterRegular.fontFamily, fontSize: 13, fontWeight: 400 },
               tabBarLabelPosition: 'below-icon',
               tabBarIcon: (props) => (
                  <TabButton props={{ name: 'home', primaryColor, secondaryColor, themeFonts, ...props }} />
               )
            }}
         ></Tabs.Screen>
         <Tabs.Screen
            name='Settings'
            component={Settings}
            options={{
               tabBarLabelStyle: { fontFamily: themeFonts?.LobsterRegular.fontFamily, fontSize: 13, fontWeight: 400 },
               tabBarLabelPosition: 'below-icon',
               tabBarIcon: (props) => (
                  <TabButton props={{ name: 'settings', primaryColor, secondaryColor, themeFonts, ...props }} />
               )
            }}
         ></Tabs.Screen>
      </Tabs.Navigator>
   );
};

export { BottomTabsNavigator };
