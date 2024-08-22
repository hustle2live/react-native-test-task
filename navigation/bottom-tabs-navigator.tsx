import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Dashboard, Settings } from '../screens';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks';
import { FontStyleType } from '../contexts/theme-context';
import { ROUTE_NAME } from '../enums';
import { BottomTabsParamList, RootStackScreenProps } from '../types';
import { ThemeContextProps, ThemeScreepProps } from '../types/props-styles.type';

const Tabs = createBottomTabNavigator<BottomTabsParamList>();

type TProps = {
   props: {
      focused?: boolean;
      color?: string;
      size?: number;
      name?: any;
      primaryColor?: string;
      secondaryColor?: string;
      themeFonts?: FontStyleType;
   };
};

const TabButton = ({ props }: TProps) => {
   const { name, focused, primaryColor, secondaryColor, size } = props;
   return <Ionicons name={name} size={size} color={!focused ? secondaryColor : primaryColor} />;
};

type NavProps = RootStackScreenProps<'BottomTabsNavigator'> & Pick<ThemeContextProps, 'toggleTheme' | 'theme'>;

const BottomTabsNavigator: React.FC<NavProps> = ({ navigation, route, theme, toggleTheme }: NavProps): JSX.Element => {
   const themeFonts = route.params.fonts;
   const colors = theme;

   const tabBackground = colors?.APP_BACKGROUND;
   const primaryColor = colors?.PRIMARY;
   const secondaryColor = colors?.SECONDARY;
   const LobsterRegular = themeFonts?.LobsterRegular.fontFamily;

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
            tabBarInactiveTintColor: secondaryColor,
            headerTitleStyle: { fontFamily: LobsterRegular }
         }}
      >
         <Tabs.Screen
            name={ROUTE_NAME.DASHBOARD}
            initialParams={{
               fonts: themeFonts
            }}
            options={{
               tabBarLabelStyle: { fontFamily: LobsterRegular, fontSize: 13, fontWeight: 400 },
               tabBarLabelPosition: 'below-icon',
               tabBarIcon: (props) => (
                  <TabButton props={{ ...props, name: 'home', size: 20, primaryColor, secondaryColor, themeFonts }} />
               ),
               headerRight: (props) => (
                  <TouchableOpacity onPress={() => navigation.navigate('AddInspiration')}>
                     <Ionicons name='add-circle' size={32} color={primaryColor} />
                  </TouchableOpacity>
               ),
               headerRightContainerStyle: { paddingRight: 10 },
               headerStyle: {
                  backgroundColor: tabBackground,
                  height: 46
               },
               headerTitle: 'Find Your Inspiration'
            }}
         >
            {(props) => <Dashboard {...props} colors={colors} />}
         </Tabs.Screen>

         <Tabs.Screen
            name={ROUTE_NAME.SETTINGS}
            options={{
               tabBarLabelStyle: { fontFamily: LobsterRegular, fontSize: 13, fontWeight: 400 },
               tabBarLabelPosition: 'below-icon',
               tabBarIcon: (props) => (
                  <TabButton
                     props={{ ...props, name: 'settings', size: 20, primaryColor, secondaryColor, themeFonts }}
                  />
               ),
               headerStyle: {
                  backgroundColor: tabBackground,
                  height: 46
               }
            }}
         >
            {(props) => <Settings {...props} colors={colors} onChangeTheme={toggleTheme} />}
         </Tabs.Screen>
      </Tabs.Navigator>
   );
};

export { BottomTabsNavigator };
