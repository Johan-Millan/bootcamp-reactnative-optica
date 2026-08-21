import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { TabNavigator } from './TabNavigator';

export function AppNavigator(): React.JSX.Element {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}