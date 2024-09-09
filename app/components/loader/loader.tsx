import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

type Props = {
   color?: string;
   background?: string;
};

const Loader: React.FC<Props> = ({ color, background }: Props) => {
   const circleColor = color ?? '#00ff00';
   const bgColor = background ?? 'transparent';
   return (
      <View style={{ ...styles.container, backgroundColor: bgColor }}>
         <ActivityIndicator size='large' color={circleColor} />
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10
   }
});

export { Loader };
