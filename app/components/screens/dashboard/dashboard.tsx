import React, { useEffect, useState } from 'react';
import { FlatList, ImageBackground, StyleSheet, Text, View } from 'react-native';

import { ScreenBackground } from '../screen-background/screen-background';

import { BottomTabsScreenProps } from '../../../common/types/navigation.type';
import { ThemeScreepProps } from '../../../common/types/props-styles.type';
import { Inspiration } from '../../../common/types';

import { InspirationCard } from '../../inspiration-card/inspiration-card';

type Props = BottomTabsScreenProps<'Dashboard'> &
   Partial<ThemeScreepProps> & {
      initialCards: Inspiration[];
      saveCards: (cards: Inspiration[]) => Promise<void>;
   };

const Dashboard: React.FC<Props> = ({ route, colors, initialCards, saveCards }: Props) => {
   const imageSource = require('../../../assets/empty-placeholder.png');
   const fonts = route.params.fonts;

   const themeStyles = StyleSheet.create({
      textStyles: {
         fontFamily: fonts.LOBSTER_ITALIC.fontFamily,
         fontSize: 20,
         color: colors?.SECONDARY
      }
   });

   console.log('initialCards :', initialCards);

   const [inspirations, setInspirations] = useState<Inspiration[]>(initialCards);

   useEffect(() => {
      if (initialCards && initialCards?.length) {
         setInspirations(initialCards);
      }
   }, [initialCards]);

   useEffect(() => {
      const receivedInspiration = route.params?.inspiration;
      if (route.params && receivedInspiration) {
         setInspirations((prevInspirations): Inspiration[] => {
            const newInspirationArray = [...prevInspirations, receivedInspiration];
            saveCards(newInspirationArray);
            return newInspirationArray;
         });
      }
   }, [route.params?.inspiration]);

   return (
      <View style={styles.container}>
         <ScreenBackground />
         <View style={styles.container}>
            {inspirations.length < 1 ? (
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
                  data={inspirations}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
                  renderItem={({ item }) => <InspirationCard colors={colors} fonts={fonts} item={item} />}
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
