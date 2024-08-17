import React from 'react';
import { Text, TextInput, View, Button, ImageBackground, Pressable, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AddInspirationParamList } from '../../types/navigation.type';
import { ScreenBackground } from '../screen-background/screen-background';

type Props = NativeStackScreenProps<AddInspirationParamList, 'AddInspiration'>;

const AddInspiration: React.FC<Props> = ({ navigation, route }: Props) => {
   const styles = StyleSheet.create({
      filled: {},
      outlined: {}
   });

   return (
      <View style={{ minWidth: '100%', minHeight: '100%' }}>
         <ScreenBackground />
         <ImageBackground></ImageBackground>

         <View>
            <Pressable>
               <Text>Choose Image</Text>
            </Pressable>
            <Pressable>
               <Text>Get a Random Image</Text>
            </Pressable>
         </View>

         <TextInput placeholder='Enter your quote here...' />

         <Pressable>
            <Text>Get a Random Quote</Text>
         </Pressable>

         <Pressable>
            <Text>Save</Text>
         </Pressable>

         <Button title='Go to Details' onPress={() => navigation.navigate('BottomTabsNavigator')} />
      </View>
   );
};

export { AddInspiration };
