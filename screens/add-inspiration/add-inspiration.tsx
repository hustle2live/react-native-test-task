import React from 'react';
import { Text, View, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AddInspirationParamList } from '../../types/navigation.type';

type Props = NativeStackScreenProps<AddInspirationParamList, 'AddInspiration'>;

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
