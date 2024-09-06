import { Image, Text, View } from 'react-native';
import { Inspiration } from '../../types';
import { ThemeScreepProps } from '../../types/props-styles.type';

type Props = Partial<ThemeScreepProps> & { item: Inspiration };

const InspirationCard = ({ colors, fonts, item }: Props) => {
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
               overflow: 'hidden',
               opacity: 0.7,
               borderRadius: 10
            }}
            source={{ uri: item.image_url }}
         />
         {item.quote ? (
            <View
               style={{
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
               }}
            >
               <Text
                  style={{
                     fontFamily: fonts?.LOBSTER_ITALIC.fontFamily,
                     fontSize: 16,
                     color: colors?.FONT_INVERSE,
                     overflow: 'hidden'
                  }}
               >
                  {item.quote}
               </Text>
            </View>
         ) : null}
      </View>
   );
};

export { InspirationCard };
