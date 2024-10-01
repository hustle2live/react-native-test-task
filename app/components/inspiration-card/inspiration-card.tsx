import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Inspiration } from '../../common/types';
import { ThemeScreepProps } from '../../common/types/props-styles.type';

type Props = Partial<ThemeScreepProps> & { item: Inspiration };

const InspirationCard = ({ colors, fonts, item }: Props) => {
   return (
      <View style={cardStyle({ colors, fonts }).itemView}>
         <Image style={cardStyle({ colors, fonts }).itemImage} source={{ uri: item.image_url }} />
         {item.quote ? (
            <View style={cardStyle({ colors, fonts }).qouteView}>
               <Text style={cardStyle({ colors, fonts }).qouteText}>{item.quote}</Text>
            </View>
         ) : null}
      </View>
   );
};

export { InspirationCard };

const cardStyle = ({ fonts, colors }: Partial<ThemeScreepProps>) =>
   StyleSheet.create({
      itemView: {
         minWidth: '100%',
         width: '100%',
         height: 200,
         backgroundColor: colors?.APP_BACKGROUND,
         justifyContent: 'center',
         position: 'relative'
      },

      itemImage: {
         minWidth: '100%',
         width: '100%',
         height: '100%',
         overflow: 'hidden',
         opacity: 0.7,
         borderRadius: 10
      },

      qouteView: {
         width: '84%',
         minHeight: '50%',
         height: 'auto',
         maxHeight: '100%',
         position: 'absolute',
         backgroundColor: 'rgba(0, 0, 0, 0.5)',
         alignSelf: 'center',
         justifyContent: 'center',
         padding: 10,
         borderRadius: 6
      },
      qouteText: {
         fontFamily: fonts?.LOBSTER_ITALIC.fontFamily,
         fontSize: 16,
         color: colors?.FONT_INVERSE,
         overflow: 'hidden'
      }
   });
