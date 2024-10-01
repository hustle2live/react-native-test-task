import React, { useCallback, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { ROUTE_NAME } from '../../common/enums';
import { BottomTabsParamList, Inspiration, RootStackScreenProps } from '../../common/types';
import { ThemeContextProps } from '../../common/types/props-styles.type';
import { Dashboard, Settings } from '../screens';

import { getStorageInspirationCards, saveStorageInspirationCards } from '../../services/cardsStorageHandler';

import { TabButton } from './button-tab';

const Tabs = createBottomTabNavigator<BottomTabsParamList>();

type HeaderStyles = {
   headerPropsStyles: Record<string | number, Record<string, any> | boolean>;
};

type NavProps = RootStackScreenProps<'BottomTabsNavigator'> &
   Pick<ThemeContextProps, 'toggleTheme' | 'theme'> &
   HeaderStyles;

const BottomTabsNavigator: React.FC<NavProps> = ({
   navigation,
   route,
   theme,
   toggleTheme,
   headerPropsStyles
}: NavProps) => {
   const themeFonts = route.params.fonts;
   const colors = theme;

   const tabBackground = colors.APP_BACKGROUND;
   const primaryColor = colors.PRIMARY;
   const secondaryColor = colors?.SECONDARY;
   const LobsterRegular = themeFonts?.LOBSTER_REGULAR.fontFamily;

   const [storageCards, setStorageCards] = useState<Inspiration[]>([]);

   const writeStorageCards = useCallback(async (cards: Inspiration[]): Promise<void> => {
      await saveStorageInspirationCards(cards);
   }, []);

   useEffect(() => {
      const findStorageCards = async () => {
         const getCards = await getStorageInspirationCards();
         if (getCards) {
            setStorageCards(getCards);
         }
      };

      findStorageCards();
   }, []);

   console.log('storageCards 3 ', storageCards);
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
            ...headerPropsStyles
         }}
      >
         <Tabs.Screen
            name={ROUTE_NAME.DASHBOARD}
            initialParams={{
               fonts: themeFonts
            }}
            options={{
               tabBarLabelStyle: { fontFamily: LobsterRegular, fontSize: 13, fontWeight: '400' },
               tabBarLabelPosition: 'below-icon',
               tabBarIcon: (props) => (
                  <TabButton props={{ ...props, name: 'home', size: 20, primaryColor, secondaryColor, themeFonts }} />
               ),
               headerRight: () => (
                  <TouchableOpacity onPress={() => navigation.navigate(ROUTE_NAME.ADD_INSPIRATION)}>
                     <Ionicons name='add-circle' size={32} color={primaryColor} />
                  </TouchableOpacity>
               ),
               headerRightContainerStyle: { paddingRight: 10 },
               headerTitle: 'Find Your Inspiration',
               headerTitleStyle: { fontFamily: LobsterRegular },
               ...headerPropsStyles
            }}
         >
            {(props) => (
               <Dashboard {...props} colors={colors} initialCards={storageCards} saveCards={writeStorageCards} />
            )}
         </Tabs.Screen>

         <Tabs.Screen
            name={ROUTE_NAME.SETTINGS}
            options={{
               tabBarLabelStyle: { fontFamily: LobsterRegular, fontSize: 13, fontWeight: '400' },
               tabBarLabelPosition: 'below-icon',
               tabBarIcon: (props) => (
                  <TabButton
                     props={{ ...props, name: 'settings', size: 20, primaryColor, secondaryColor, themeFonts }}
                  />
               )
            }}
         >
            {(props) => <Settings {...props} colors={colors} onChangeTheme={toggleTheme} />}
         </Tabs.Screen>
      </Tabs.Navigator>
   );
};

export { BottomTabsNavigator };
