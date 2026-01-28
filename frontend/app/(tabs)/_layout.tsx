import { Tabs } from 'expo-router'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/theme';

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.grey,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="bookmarks"
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="bookmark-outline" size={size} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          tabBarIcon: () => (
            <Ionicons name="add-circle" size={28} color={COLORS.primary} />
          )
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="notifications-outline" size={size} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          )
        }}
      />
    </Tabs>
  )
}

export default TabLayout