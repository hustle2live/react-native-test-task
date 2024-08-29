import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { BottomTabsScreenProps } from '../../types/navigation.type';
import { ScreenBackground } from '../screen-background/screen-background';
import { ThemeScreepProps } from '../../types/props-styles.type';

type Props = BottomTabsScreenProps<'Dashboard'> & Partial<ThemeScreepProps>;

const Dashboard: React.FC<Props> = ({ navigation, route, colors }: Props) => {
   const imageSource = require('../../assets/empty-placeholder.png');

   const fontPrimary = route.params.fonts?.LobsterItalic.fontFamily;

   const styles = StyleSheet.create({
      textStyles: {
         fontFamily: fontPrimary,
         fontSize: 20,
         color: colors?.SECONDARY
      },
      viewStyles: {
         minWidth: '100%',
         minHeight: '100%',
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

   return (
      <View style={styles.viewStyles}>
         <ScreenBackground />
         <View style={styles.viewStyles}>
            <ImageBackground
               source={imageSource}
               style={styles.imageContainerStyles}
               imageStyle={styles.imageNestedStyles}
            />
            <Text style={styles.textStyles}>No inspirations yet</Text>
         </View>
      </View>
   );
};

export { Dashboard };
