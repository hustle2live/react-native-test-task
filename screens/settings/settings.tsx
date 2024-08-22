import React, { useState } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { type ThemeScreepProps } from '../../types/props-styles.type';
import { COLORS_LIGHT } from '../../constants';

import { ScreenBackground } from '../screen-background/screen-background';

const POSITIONS = {
   LEFT: '-50%',
   RIGHT: '50%'
} as const;

type SettingProps = Pick<ThemeScreepProps, 'colors'> & {
   onChangeTheme: () => void | undefined;
};

type SwitcherPositionX = (typeof POSITIONS)[keyof typeof POSITIONS];

const Settings: React.FC<SettingProps> = ({ colors, onChangeTheme }: SettingProps) => {
   const isLight = colors === COLORS_LIGHT;

   const defaultStyles = {
      sunny: colors.PRIMARY,
      moon: colors.SECONDARY,
      switcher: colors.GREY,
      switchPositionX: POSITIONS.LEFT
   };

   if (!isLight) {
      Object.assign(defaultStyles, {
         sunny: colors.SECONDARY,
         moon: colors.PRIMARY,
         switcher: colors.SECONDARY,
         switchPositionX: POSITIONS.RIGHT
      });
   }

   const activeStyles = StyleSheet.create({
      switchLine: {
         backgroundColor: defaultStyles.switcher
      },
      switchCircle: {
         backgroundColor: colors.PRIMARY,
         transform: [{ translateX: defaultStyles.switchPositionX }, { translateY: '-50%' }]
      }
   });

   const [switcher, setSwitcher] = useState<SwitcherPositionX>(defaultStyles.switchPositionX);

   const handleSwitchTheme = (): void => {
      const switchPositionX = switcher === POSITIONS.LEFT ? POSITIONS.RIGHT : POSITIONS.LEFT;
      setSwitcher(switchPositionX);
      if (!onChangeTheme) {
         throw new Error('Theme change function is undefined');
      }
      onChangeTheme();
   };

   return (
      <View style={styles.container}>
         <ScreenBackground />
         <Ionicons
            name='sunny'
            size={28}
            color={defaultStyles.sunny}
         />
         <Pressable
            onPress={handleSwitchTheme}
            style={[styles.switchLine, activeStyles.switchLine]}
         >
            <Ionicons
               name='radio-button-off'
               color={colors.PRIMARY}
               size={30}
               style={[styles.switchCircle, activeStyles.switchCircle]}
            />
         </Pressable>
         <Ionicons
            name='moon'
            size={28}
            color={defaultStyles.moon}
         />
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
