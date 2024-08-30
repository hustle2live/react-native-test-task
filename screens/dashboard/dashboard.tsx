import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { BottomTabsScreenProps } from '../../types/navigation.type';
import { ScreenBackground } from '../screen-background/screen-background';
import { ThemeScreepProps } from '../../types/props-styles.type';

import { InspirationStore } from '../../store/inspirations';
import { Inspiration } from '../../types';

type Props = BottomTabsScreenProps<'Dashboard'> & Partial<ThemeScreepProps>;

const Dashboard: React.FC<Props> = ({ navigation, route, colors }: Props) => {
   const imageSource = require('../../assets/empty-placeholder.png');

   const fontPrimary = route.params.fonts?.LobsterItalic.fontFamily;

   const themeStyles = StyleSheet.create({
      textStyles: {
         fontFamily: fontPrimary,
         fontSize: 20,
         color: colors?.SECONDARY
      }
   });

   const inspirationsArray: Inspiration[] = InspirationStore.getAll();

   return (
      <View style={styles.container}>
         <ScreenBackground />

         {InspirationStore.isEmpty() ? (
            <View style={styles.container}>
               <ImageBackground
                  source={imageSource}
                  style={styles.imageContainerStyles}
                  imageStyle={styles.imageNestedStyles}
               />
               <Text style={themeStyles.textStyles}>No inspirations yet</Text>
            </View>
         ) : (
            <ul>
               {inspirationsArray.map((card) => {
                  return `<li>${card.quote}</li>`;
               })}
            </ul>
            // ${card.image_url}
         )}
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center'
   },
   imageContainerStyles: {
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      width: 300,
      height: 200
   },
   imageNestedStyles: { width: '100%', height: 'auto' }
});

export { Dashboard };
