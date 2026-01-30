import { Tabs } from 'expo-router'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/theme';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useAuth } from '@clerk/clerk-expo';
import { Image } from 'expo-image';

const TabLayout = () => {

  const { userId } = useAuth();

  const currentUser = useQuery(api.users.getUserByClerkId, userId ? { clerkId: userId } : "skip");

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.grey,
        tabBarStyle: {
          backgroundColor: "black",
          borderTopWidth: 0,
          position: "absolute",
          elevation: 0,
          height: 48,
          paddingBottom: 8,
          paddingTop: 4
          // height: 60,
          // paddingTop: 8

        }
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
            <Ionicons name="add-circle" size={30} color={COLORS.primary} />
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
            <>
              {currentUser?.image === null ? (
                <Ionicons name="person-outline" size={size} color={color} />
              ) : (
                <Image
                  source={{ uri: currentUser?.image }}
                  style={{
                    width: size * 1.3,
                    height: size * 1.3,
                    borderRadius: (size * 1.3) / 2,
                    borderWidth: 2,
                    borderColor: color
                  }}
                />
              )}

            </>

          )
        }}
      />
    </Tabs>
  )
}

export default TabLayout