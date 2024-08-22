import React, { useState } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { type ThemeProps } from '../../types/props-styles.type';
import { COLORS_LIGHT } from '../../constants';

import { ScreenBackground } from '../screen-background/screen-background';

const POSITIONS = {
   LEFT: '-50%',
   RIGHT: '50%'
} as const;

type SettingProps = Partial<ThemeProps> & {
   onChangeTheme: () => void;
};

type SwitcherPositionX = (typeof POSITIONS)[keyof typeof POSITIONS];

const Settings: React.FC<SettingProps> = ({ colors, onChangeTheme }: SettingProps) => {
   const isLight = colors === COLORS_LIGHT;

   const initialSwitcherPositionX = isLight ? POSITIONS.LEFT : POSITIONS.RIGHT;

   const [switcher, setSwitcher] = useState<SwitcherPositionX>(initialSwitcherPositionX);

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
         backgroundColor: isLight ? colors?.SECONDARY : colors?.APP_BACKGROUND,
         width: 38,
         height: 15,
         borderRadius: 10
      },
      switchCircle: {
         position: 'absolute',
         backgroundColor: isLight ? colors?.PRIMARY : colors?.GREY,
         width: 30,
         height: 30,
         borderRadius: 30,
         left: 0,
         top: 7,
         transform: [{ translateX: switcher }, { translateY: '-50%' }]
      }
   });

   const handleSwitchTheme = (): void => {
      const move = switcher === POSITIONS.LEFT ? POSITIONS.RIGHT : POSITIONS.LEFT;
      setSwitcher(move);
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
