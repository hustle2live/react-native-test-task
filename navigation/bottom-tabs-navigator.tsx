import * as React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Dashboard, Settings } from '../screens';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks';
import { FontStyleType } from '../contexts/theme-context';
import { ROUTE_NAME } from '../enums';
import { BottomTabsParamList, RootStackScreenProps } from '../types';

const Tabs = createBottomTabNavigator<BottomTabsParamList>();

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

type Props = RootStackScreenProps<'BottomTabsNavigator'>;
// type Props = NativeStackScreenProps<RootStackParamList, 'BottomTabsNavigator'>;

const BottomTabsNavigator: React.FC<Props> = ({ navigation, route }: Props): JSX.Element => {
   const themeContext = useTheme();
   const tabBackground = themeContext?.theme.APP_BACKGROUND;
   const primaryColor = themeContext?.theme.PRIMARY;
   const secondaryColor = themeContext?.theme.SECONDARY;
   const themeFonts = themeContext?.fonts ?? undefined;

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
            tabBarInactiveTintColor: secondaryColor
         }}
      >
         <Tabs.Screen
            name={ROUTE_NAME.DASHBOARD}
            component={Dashboard}
            initialParams={{ onpress: goToAddInspiration }}
            options={{
               tabBarLabelStyle: { fontFamily: themeFonts?.LobsterRegular.fontFamily, fontSize: 13, fontWeight: 400 },
               tabBarLabelPosition: 'below-icon',
               tabBarIcon: (props) => (
                  <TabButton props={{ name: 'home', primaryColor, secondaryColor, themeFonts, ...props }} />
               )
            }}
         ></Tabs.Screen>
         <Tabs.Screen
            name={ROUTE_NAME.SETTINGS}
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
