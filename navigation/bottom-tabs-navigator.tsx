import * as React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Dashboard, Settings } from '../screens';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks';
import { FontStyleType } from '../contexts/theme-context';
import { ROUTE_NAME } from '../enums';
import { BottomTabsParamList, RootStackScreenProps } from '../types';
import { AccessibilityInfo, Button, Touchable } from 'react-native';
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
   return <Ionicons name={name} size={size} color={props.color ?? focused ? primaryColor : secondaryColor} />;
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
            tabBarInactiveTintColor: secondaryColor,
            headerTitleStyle: {
               fontFamily: themeFonts?.LobsterRegular.fontFamily
            }
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
                  <TabButton props={{ ...props, name: 'home', size: 20, primaryColor, secondaryColor, themeFonts }} />
               ),
               headerRight: (props) => (
                  <Link to={{ screen: 'AddInspiration' }}>
                     <Ionicons name='add-circle' size={32} color={primaryColor} />
                  </Link>
               ),
               headerStyle: {
                  backgroundColor: tabBackground
               }
            }}
         ></Tabs.Screen>
         <Tabs.Screen
            name={ROUTE_NAME.SETTINGS}
            component={Settings}
            options={{
               tabBarLabelStyle: { fontFamily: themeFonts?.LobsterRegular.fontFamily, fontSize: 13, fontWeight: 400 },
               tabBarLabelPosition: 'below-icon',
               tabBarIcon: (props) => (
                  <TabButton
                     props={{ ...props, name: 'settings', size: 20, primaryColor, secondaryColor, themeFonts }}
                  />
               ),
               headerStyle: {
                  backgroundColor: tabBackground
               }
            }}
         ></Tabs.Screen>
      </Tabs.Navigator>
   );
};

export { BottomTabsNavigator };
