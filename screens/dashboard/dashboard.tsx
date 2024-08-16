import React from 'react';
import { Button, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { BottomTabsScreenProps } from '../../types/navigation.type';
import { ScreenBackground } from '../screen-background/screen-background';

type Props = BottomTabsScreenProps<'Dashboard'>;

const Dashboard: React.FC<Props> = ({ navigation, route }: Props) => {
   const imageSource: { uri: string } = { uri: '../../assets/empty-placeholder.png' };

   const styles = StyleSheet.create({
      textStyles: {
         fontFamily: route.params?.font,
         fontSize: 20,
         fontWeight: 400,
         color: route.params?.colors?.secondary
      },
      viewStyles: {
         minWidth: '100%',
         minHeight: '100%',
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'center'
      },
      imageContainerStyles: {
         alignSelf: 'center',
         justifyContent: 'center',
         width: '80%',
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

/* <Pressable style={buttonStyles.button} onPress={route.params?.onpress}>
<Text style={buttonStyles.text}>Go to AddInspiration</Text>
</Pressable>
<Text>
Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas perferendis error minus, sed accusamus
quam! Voluptate quasi hic quod at consequuntur assumenda id esse corrupti vel? Enim earum mollitia nisi.
</Text> */

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
