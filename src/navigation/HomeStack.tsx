import React from 'react';

import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import { HomeScreen } from '../screens/HomeScreen';
import { DetailScreen } from '../screens/DetailScreen';

export type HomeStackParamList = {
  Home: undefined;
  Detail: {
    id: string;
    name: string;
  };
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

export function HomeStack(): React.JSX.Element {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Óptica Visión',
        }}
      />

      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{
          title: 'Detalle de la gafa',
        }}
      />
    </Stack.Navigator>
  );
}