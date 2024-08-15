import React from 'react';
import { Text, View, Button } from 'react-native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';

import { AddInspirationParamList, RootStackParamList } from '../../types/navigation.type';

type Props = NativeStackScreenProps<AddInspirationParamList, 'AddInspiration'>;
// type Props = NativeStackScreenProps<RootStackParamList, 'BottomTabsNavigator'>;

const AddInspiration: React.FC<Props> = ({ navigation, route }: Props) => {
   return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
         <Text>Details!</Text>
         <Text>Details!</Text>
         <Button title='Go to Details' onPress={() => navigation.navigate('BottomTabsNavigator')} />
      </View>
   );
};

export { AddInspiration };

// import { RootStackParamList, RootStackScreenProps } from '../../types';

// interface AddInspirationProps {
//    navigation: any; // Замініть на точний тип, якщо відомо
//    route: any; // Замініть на точний тип, якщо відомо
//    style?: ViewStyle;
// }
