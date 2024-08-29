import React, { useState } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { type ThemeScreepProps } from '../../types/props-styles.type';
import { COLORS_LIGHT } from '../../constants';

import { ScreenBackground } from '../screen-background/screen-background';

const POSITIONS = {
   LEFT: -30,
   RIGHT: 5
} as const;

type SettingProps = Pick<ThemeScreepProps, 'colors'> & {
   onChangeTheme: () => void | undefined;
};

// type SwitcherPositionX = (typeof POSITIONS)[keyof typeof POSITIONS];

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
         transform: [{ translateX: defaultStyles.switcherPositionX }, { translateY: -15 }]
      }
   });

   const handleSwitchTheme = (): void => {
      try {
         onChangeTheme();
      } catch (error) {
         console.error(error ?? 'Theme change function is undefined');
      }
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
      width: '100%',
      height: '100%',
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
      left: 15,
      top: 9
   }
});

export { Settings };
