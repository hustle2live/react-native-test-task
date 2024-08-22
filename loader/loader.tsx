import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

type Props = {
   color: string | undefined;
};

const Loader: React.FC<Props> = ({ color }: Props) => {
   const circleColor = color ?? '#00ff00';
   return (
      <View style={[styles.container, styles.horizontal]}>
         <ActivityIndicator size='large' color={circleColor} />
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center'
   },
   horizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10
   }
});

export { Loader };
