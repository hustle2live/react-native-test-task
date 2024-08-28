import React, { useState } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { type ThemeScreepProps } from '../../types/props-styles.type';
import { COLORS_LIGHT } from '../../constants';

import { ScreenBackground } from '../screen-background/screen-background';

const POSITIONS = {
   LEFT: 50,
   RIGHT: 50
} as const;

type SettingProps = Pick<ThemeScreepProps, 'colors'> & {
   onChangeTheme: () => void | undefined;
};

type SwitcherPositionX = (typeof POSITIONS)[keyof typeof POSITIONS];

const Settings: React.FC<SettingProps> = ({ colors, onChangeTheme }: SettingProps) => {
   const isLight = colors === COLORS_LIGHT;

   const defaultStyles = {
      iconSun: colors.PRIMARY,
      iconMoon: colors.SECONDARY,
      switcherLine: colors.GREY,
      switcherPositionX: POSITIONS.LEFT
   };

   if (!isLight) {
      Object.assign(defaultStyles, {
         iconSun: colors.SECONDARY,
         iconMoon: colors.PRIMARY,
         switcherLine: colors.SECONDARY,
         switcherPositionX: POSITIONS.RIGHT
      });
   }

   const activeStyles = StyleSheet.create({
      switchLine: {
         backgroundColor: defaultStyles.switcherLine
      },
      switchCircle: {
         backgroundColor: colors.PRIMARY,
         transform: [{ translateX: defaultStyles.switcherPositionX }, { translateY: -50 }]
      }
   });

   const [switcher, setSwitcher] = useState<SwitcherPositionX>(defaultStyles.switcherPositionX);

   const handleSwitchTheme = (): void => {
      const switcherPositionX = switcher === POSITIONS.LEFT ? POSITIONS.RIGHT : POSITIONS.LEFT;
      setSwitcher(switcherPositionX);
      if (!onChangeTheme) {
         throw new Error('Theme change function is undefined');
      }
      onChangeTheme();
   };

   return (
      <View style={styles.container}>
         <ScreenBackground />
         <Ionicons name='sunny' size={28} color={defaultStyles.iconSun} />
         <Pressable onPress={handleSwitchTheme} style={[styles.switchLine, activeStyles.switchLine]}>
            <Ionicons
               name='radio-button-off'
               color={colors.PRIMARY}
               size={30}
               style={[styles.switchCircle, activeStyles.switchCircle]}
            />
         </Pressable>
         <Ionicons name='moon' size={28} color={defaultStyles.iconMoon} />
      </View>
   );
};

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
      width: 38,
      height: 18,
      borderRadius: 8
   },
   switchCircle: {
      position: 'absolute',
      width: 30,
      height: 30,
      borderRadius: 15,
      left: 0,
      top: 9
   }
});

export { Settings };
