import React from 'react';

import { Button, Text, View, ViewStyle } from 'react-native';

import { BottomTabsScreenProps } from '../../types/navigation.type';

import { ScreenBackground } from '../screen-background/screen-background';

type Props = BottomTabsScreenProps<'Dashboard'>;

const Dashboard: React.FC<Props> = ({ navigation, route }: Props) => {
   return (
      <View style={{ minWidth: '100%', minHeight: '100%', position: 'relative' }}>
         <ScreenBackground />
         <Text>There's will be a dashboard</Text>
         <Text>- - - -- - - - - -- - - - - - -- - -</Text>
         <Button title='Go to AddInspiration' onPress={route.params?.onpress} />
         <Text>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas perferendis error minus, sed accusamus
            quam! Voluptate quasi hic quod at consequuntur assumenda id esse corrupti vel? Enim earum mollitia nisi.
         </Text>
      </View>
   );
};

export { Dashboard };
