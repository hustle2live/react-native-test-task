import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { useTheme } from '../../hooks';

const ScreenBackground = () => {
   const imageSource: { uri: string } = { uri: '../../assets/leaf.png' };

   const theme = useTheme();
   const bgColor = theme?.theme.APP_BACKGROUND;

   return (
      <View
         style={{
            backgroundColor: bgColor,
            width: '100%',
            minWidth: '100%',
            height: '100%',
            position: 'absolute',
            left: 0,
            top: 0,
            display: 'flex',
            justifyContent: 'space-between',
            padding: 20,
            paddingTop: 10,
            paddingBottom: 0
         }}
      >
         <ImageBackground
            source={imageSource}
            style={{
               maxHeight: '50%',
               width: 150,
               height: 150,
               transform: [{ rotate: '180deg' }]
            }}
            imageStyle={{
               width: '100%',
               height: '100%',
               transform: [{ scaleX: 1.15 }]
            }}
         />
         <ImageBackground
            source={imageSource}
            style={{
               alignSelf: 'flex-end',
               maxHeight: '50%',
               width: 150,
               height: 150
            }}
            imageStyle={{
               width: '100%',
               height: '100%',
               transform: [{ scaleX: 1.15 }]
            }}
         />
      </View>
   );
};

const styles = StyleSheet.create({
   container: {},
   image: {}
});

export { ScreenBackground };
