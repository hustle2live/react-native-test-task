import React, { useEffect, useState } from 'react';
import { FlatList, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { BottomTabsScreenProps } from '../../../common/types/navigation.type';
import { ScreenBackground } from '../screen-background/screen-background';
import { ThemeScreepProps } from '../../../common/types/props-styles.type';

import { Inspiration } from '../../../common/types';
import { InspirationCard } from '../../inspiration-card/inspiration-card';



type Props = BottomTabsScreenProps<'Dashboard'> & Partial<ThemeScreepProps>;

const Dashboard: React.FC<Props> = ({ navigation, route, colors }: Props) => {
   const imageSource = require('../../../assets/empty-placeholder.png');
   const fonts = route.params.fonts;
   const themeStyles = StyleSheet.create({
      textStyles: {
         fontFamily: fonts.LOBSTER_ITALIC.fontFamily,
         fontSize: 20,
         color: colors?.SECONDARY
      }
   });

   const [inspirations, setInspirations] = useState<Inspiration[]>([]);

   useEffect(() => {
      const receivedInspiration = route.params?.inspiration;
      if (route.params && receivedInspiration) {
         setInspirations((prevInspirations): Inspiration[] => [...prevInspirations, receivedInspiration]);
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
