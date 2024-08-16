import React from 'react';
import { Button, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { BottomTabsScreenProps } from '../../types/navigation.type';
import { ScreenBackground } from '../screen-background/screen-background';

type Props = BottomTabsScreenProps<'Dashboard'>;

const Dashboard: React.FC<Props> = ({ navigation, route }: Props) => {
   const imageSrcMain: { uri: string } = { uri: '../../assets/empty-placeholder.png' };

   console.log('font : ', { ...route.params });

   const textStyles = StyleSheet.create({
      text: {
         fontFamily: route.params?.font,
         fontSize: 20,
         fontWeight: 'bold',
         color: 'brown'
      }
   });

   return (
      <View
         style={{
            minWidth: '100%',
            minHeight: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            alignContent: 'center'
         }}
      >
         <ScreenBackground />
         <ImageBackground
            source={imageSrcMain}
            width={100}
            style={{
               alignSelf: 'center',
               justifyContent: 'center',
               margin: 'auto',
               width: '80%',
               height: 200
            }}
            imageStyle={{ width: '100%', height: 'auto' }}
         />
         <Text style={textStyles.text}>No inspirations yet</Text>
      </View>
   );
};

{
   /* <Pressable style={buttonStyles.button} onPress={route.params?.onpress}>
<Text style={buttonStyles.text}>Go to AddInspiration</Text>
</Pressable>
<Text>
Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas perferendis error minus, sed accusamus
quam! Voluptate quasi hic quod at consequuntur assumenda id esse corrupti vel? Enim earum mollitia nisi.
</Text> */
}

// const buttonStyles = StyleSheet.create({
//    button: {
//       paddingVertical: 12,
//       paddingHorizontal: 20,
//       backgroundColor: 'rgb(33, 150, 243)'
//    },
//    text: {
//       fontSize: 16,
//       lineHeight: 21,
//       fontWeight: 'bold',
//       letterSpacing: 0.25,
//       color: '#ffffff'
//    }
// });

export { Dashboard };
