import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { HomeStack } from './HomeStack';
import { FavoritesScreen } from '../screens/FavoritesScreen';
import { useSavedStore } from '../stores/savedStore';

export type TabParamList = {
  Inicio: undefined;
  Favoritos: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export function TabNavigator(): React.JSX.Element {
  const savedCount = useSavedStore(
    (state) => state.savedItems.length,
  );

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarActiveTintColor: '#61DAFB',

        tabBarInactiveTintColor: '#6B7280',

        tabBarIcon: ({ color, size }) => {
          const iconName =
            route.name === 'Inicio'
              ? 'home-outline'
              : 'heart-outline';

          return (
            <Ionicons
              name={iconName}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="Inicio"
        component={HomeStack}
      />

      <Tab.Screen
        name="Favoritos"
        component={FavoritesScreen}
        options={{
          tabBarBadge:
            savedCount > 0 ? savedCount : undefined,
        }}
      />
    </Tab.Navigator>
  );
}