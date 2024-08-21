import React, { useState } from 'react';
import { View, TouchableOpacity, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ScreenBackground } from '../screen-background/screen-background';
import { BottomTabsParamList } from '../../types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type ThemeProp = {
   onChangeTheme: () => void;
};

type Props = NativeStackScreenProps<BottomTabsParamList, 'Settings'> & ThemeProp;

const POSITIONS = {
   LEFT: '-50%',
   RIGHT: '50%'
} as const;

type TSwitch = (typeof POSITIONS)[keyof typeof POSITIONS];

const Settings: React.FC<Props> = ({ route, onChangeTheme }: Props) => {
   const { LEFT, RIGHT } = POSITIONS;
   const { colors } = route.params;

   const [switchPosition, setSwitchPosition] = useState<TSwitch>(LEFT);

   const styles = StyleSheet.create({
      container: {
         flexDirection: 'row',
         minWidth: '100%',
         minHeight: '100%',
         alignItems: 'center',
         justifyContent: 'center',
         gap: 24
      },
      switchLine: {
         position: 'relative',
         backgroundColor: colors?.GREY,
         width: 38,
         height: 15,
         transform: 'all ease-in 1000'
      },
      switchCircle: {
         position: 'absolute',
         left: 0,
         top: 7,
         transform: [{ translateX: switchPosition }, { translateY: '-50%' }]
      }
   });

   const handleSwitchTheme = (): void => {
      console.log('1. - switch!..');
      const newPosition = switchPosition === LEFT ? RIGHT : LEFT;
      setSwitchPosition(newPosition);
      onChangeTheme();
   };

   return (
      <View style={styles.container}>
         <ScreenBackground />
         <Ionicons name='sunny' size={28} />
         <Pressable onPress={handleSwitchTheme} style={styles.switchLine}>
            <Ionicons name='radio-button-off' color={colors?.PRIMARY} size={30} style={styles.switchCircle} />
         </Pressable>
         <Ionicons name='moon' size={28} />
      </View>
   );
};

export { Settings };
