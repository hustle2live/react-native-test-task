import React from 'react';

import { Button, Text, View, ViewStyle } from 'react-native';

import {
   AddInspirationParamList,
   AddInspirationProps,
   AddInspirationScreenProps,
   BottomTabsParamList,
   BottomTabsScreenProps,
   DashboardParamList,
   RootStackParamList,
   RootStackScreenProps
} from '../../types/navigation.type';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabBarButtonProps, BottomTabNavigationProp, BottomTabScreenProps } from '@react-navigation/bottom-tabs';

// type Props = NativeStackScreenProps<DashboardParamList, 'Dashboard'>;

// type Props = RootStackScreenProps< , 'Dashboard'>;

type Props = BottomTabsScreenProps<'Dashboard'>;

interface DashboardProps {
   // navigation: any; // Замініть на точний тип, якщо відомо
   // route?: any; // Замініть на точний тип, якщо відомо
   onpress: () => void;
   style?: ViewStyle;
}

// BottomTabsScreenProps
// BottomTabsParamList<'Dashboard'>

const Dashboard: React.FC<BottomTabsScreenProps<'Dashboard'>> = ({ navigation, route }: Props) => {
   return (
      <View>
         <Text>There's will be a dashboard</Text>
         <Text>- - - -- - - - - -- - - - - - -- - -</Text>
         <Button title='Go to AddInspiration' onPress={route.params?.onpress} />
         <Text>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas perferendis error minus, sed accusamus
            quam! Voluptate quasi hic quod at consequuntur assumenda id esse corrupti vel? Enim earum mollitia nisi.
         </Text>
      </View>
   );
};

export { Dashboard };
