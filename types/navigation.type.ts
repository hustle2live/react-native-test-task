import type { NavigatorScreenParams, CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps as RNBottomTabScreenProps } from '@react-navigation/bottom-tabs';

import { ROUTE_NAME } from '../enums';
import { Inspiration } from './inspiration.type';
import { ThemeScreepProps } from './props-styles.type';

type NavigationRoute = (typeof ROUTE_NAME)[keyof typeof ROUTE_NAME];

type RootStackParamList = {
   [ROUTE_NAME.BOTTOM_TABS_NAVIGATOR]: NavigatorScreenParams<BottomTabsParamList> & Partial<ThemeScreepProps>;
   [ROUTE_NAME.ADD_INSPIRATION]: Partial<ThemeScreepProps> & {
      onpress?: () => void;
   };
};

type BottomTabsParamList = {
   [ROUTE_NAME.DASHBOARD]: Pick<ThemeScreepProps, 'fonts'> & {
      inspiration?: Inspiration;
      onpress?: () => void;
   };
   [ROUTE_NAME.SETTINGS]: undefined;
};

declare global {
   // eslint-disable-next-line @typescript-eslint/no-namespace
   namespace ReactNavigation {
      interface RootParamList extends RootStackParamList {}
   }
}

type AddInspirationProps = NativeStackScreenProps<AddInspirationParamList, 'AddInspiration'>;

type AddInspirationParamList = {
   [ROUTE_NAME.BOTTOM_TABS_NAVIGATOR]: undefined;
   [ROUTE_NAME.ADD_INSPIRATION]: undefined;
};

type DashboardParamList = {
   [ROUTE_NAME.ADD_INSPIRATION]: undefined;
   [ROUTE_NAME.DASHBOARD]: undefined;
};

type AddInspirationScreenProps<T extends keyof AddInspirationParamList> = NativeStackScreenProps<
   AddInspirationParamList,
   T
>;

type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;

type BottomTabsScreenProps<T extends keyof BottomTabsParamList> = CompositeScreenProps<
   RNBottomTabScreenProps<BottomTabsParamList, T>,
   NativeStackScreenProps<RootStackParamList, typeof ROUTE_NAME.BOTTOM_TABS_NAVIGATOR>
>;

export type {
   NavigationRoute,
   RootStackParamList,
   BottomTabsParamList,
   RootStackScreenProps,
   BottomTabsScreenProps,
   AddInspirationProps,
   AddInspirationParamList,
   AddInspirationScreenProps,
   DashboardParamList
};
