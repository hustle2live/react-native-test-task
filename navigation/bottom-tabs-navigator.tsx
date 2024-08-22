import React, { useCallback } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Dashboard, Settings } from '../screens';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks';
import { FontStyleType, ThemeContextProps } from '../contexts/theme-context';
import { ROUTE_NAME } from '../enums';
import { BottomTabsParamList, RootStackScreenProps } from '../types';
import { Link } from '@react-navigation/native';

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

type Props = RootStackScreenProps<'BottomTabsNavigator'>;

const BottomTabsNavigator: React.FC<Props> = ({ navigation, route }: Props): JSX.Element => {
   const themeContext = useTheme();
   const themeColors = themeContext?.theme;
   const themeFonts = themeContext?.fonts;

   const tabBackground = themeColors?.APP_BACKGROUND;
   const primaryColor = themeColors?.PRIMARY ?? '#660014';
   const secondaryColor = themeColors?.SECONDARY ?? '#e8caa2';
   const LobsterRegular = themeFonts?.LobsterRegular.fontFamily;

   const goToAddInspiration = () => navigation.navigate('AddInspiration');

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
            component={Dashboard}
            initialParams={{
               onpress: goToAddInspiration,
               colors: themeColors,
               fonts: themeFonts
            }}
            options={{
               tabBarLabelStyle: { fontFamily: LobsterRegular, fontSize: 13, fontWeight: 400 },
               tabBarLabelPosition: 'below-icon',
               tabBarIcon: (props) => (
                  <TabButton props={{ ...props, name: 'home', size: 20, primaryColor, secondaryColor, themeFonts }} />
               ),
               headerRight: (props) => (
                  <Link to={{ screen: 'AddInspiration' }}>
                     <Ionicons name='add-circle' size={32} color={primaryColor} />
                  </Link>
               ),
               headerRightContainerStyle: { paddingRight: 10 },
               headerStyle: {
                  backgroundColor: tabBackground,
                  height: 46
               },
               headerTitle: 'Find Your Inspiration'
            }}
         ></Tabs.Screen>

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
            {(props) => <Settings {...props} colors={themeColors} onChangeTheme={() => themeContext?.toggleTheme()} />}
         </Tabs.Screen>
      </Tabs.Navigator>
   );
};

export { BottomTabsNavigator };
