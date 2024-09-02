import React from 'react';
import { FlatList, ImageBackground, Image, StyleSheet, Text, View } from 'react-native';
import { BottomTabsScreenProps } from '../../types/navigation.type';
import { ScreenBackground } from '../screen-background/screen-background';
import { ThemeScreepProps } from '../../types/props-styles.type';

import { InspirationStore } from '../../store/inspirations';
import { Inspiration } from '../../types';
import { opacity } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';

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
         <View style={styles.container}>
            {InspirationStore.isEmpty() ? (
               <>
                  <ImageBackground
                     source={imageSource}
                     style={styles.imageContainerStyles}
                     imageStyle={styles.imageNestedStyles}
                  />
                  <Text style={themeStyles.textStyles}>No inspirations yet</Text>
               </>
            ) : (
               <FlatList
                  style={{ width: '100%' }}
                  data={inspirationsArray}
                  ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
                  renderItem={({ item }) => {
                     return (
                        <View
                           style={{
                              minWidth: '100%',
                              width: '100%',
                              height: 200,
                              backgroundColor: colors?.APP_BACKGROUND,
                              justifyContent: 'center',
                              position: 'relative'
                           }}
                        >
                           <Image
                              style={{
                                 minWidth: '100%',
                                 width: '100%',
                                 height: '100%',
                                 opacity: 0.7,
                                 borderRadius: 10
                              }}
                              source={{ uri: item.image_url }}
                           />
                           <View
                              style={{
                                 width: '84%',
                                 minHeight: '50%',
                                 height: 'auto',
                                 position: 'absolute',
                                 backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                 alignSelf: 'center',
                                 justifyContent: 'center',
                                 padding: 10,
                                 borderRadius: 6
                              }}
                           >
                              <Text
                                 style={{
                                    fontFamily: fontPrimary,
                                    fontSize: 16,
                                    color: colors?.FONT_INVERSE
                                 }}
                              >
                                 {item.quote}
                              </Text>
                           </View>
                        </View>
                     );
                  }}
               />
            )}
         </View>
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
      textAlign: 'center',
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20
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
