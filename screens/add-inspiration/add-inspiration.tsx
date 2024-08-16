import React from 'react';
import { Text, View, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AddInspirationParamList } from '../../types/navigation.type';
import { ScreenBackground } from '../screen-background/screen-background';

type Props = NativeStackScreenProps<AddInspirationParamList, 'AddInspiration'>;

const AddInspiration: React.FC<Props> = ({ navigation, route }: Props) => {
   return (
      <View style={{ minWidth: '100%', minHeight: '100%' }}>
         <ScreenBackground />

         <Text>Details!</Text>
         <Text>Details!</Text>
         <Button title='Go to Details' onPress={() => navigation.navigate('BottomTabsNavigator')} />
      </View>
   );
};

export { AddInspiration };
