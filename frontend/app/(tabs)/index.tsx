import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
// import { router } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'
import { COLORS } from '@/constants/theme'
import { Ionicons, FontAwesome6 } from '@expo/vector-icons'
import BottomModal from '@/components/BottomModal'
import { STORIES } from '@/constants/mock-data'
import Story from '@/components/Story'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import Loader from "@/components/Loader"
import Post from '@/components/Post'

const Home = () => {

  const { signOut } = useAuth()
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  // fetch posts
  const posts = useQuery(api.post.getFeedPosts)

  if (posts === undefined) return <Loader />

  if (posts.length === 0) return <NoPostsFound />

  function handleSignout() {
    signOut()
    setModalVisible(false)
  }

  return (
    <View
      className="flex-1 bg-black"
    >
      {/* header */}
      <View
        style={{}}
        className="flex-row items-center justify-between p-3 border-b border-b-gray-800"
      >
        {/* <View></View> */}
        <View className="flex-row items-center">
          <Ionicons name="leaf" size={28} color={COLORS.primary} />
          <Text
            style={{
              fontFamily: "JetBrainsMono-Medium",
              color: COLORS.primary,
            }}
            className="text-2xl"
          >
            spotlight
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          activeOpacity={0.8}
        >
          {/* <Ionicons name="log-out-outline" size={24} color={COLORS.white} /> */}
          <FontAwesome6 name="bars-staggered" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      <ScrollView

      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{
            paddingVertical: 8,
            borderBottomWidth: 1,
            borderBottomColor: COLORS.surface,

          }}
        >
          {/* stories */}
          {STORIES.map((story) => (
            <Story key={story.id} story={story} />
          ))}
        </ScrollView>

        <View
          className="pb-16"
        >
          {posts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </View>

      </ScrollView>

      {/* modal */}
      <BottomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}

      >
        <View
          className="flex-row items-baseline justify-center"
        >
          {/* <Ionicons name="person-outline" size={15} color={"red"} /> */}
          <Text className="text-red-600 text-lg mb-4 ml-1">
            Account
          </Text>
        </View>

        <TouchableOpacity

          onPress={handleSignout}
          className="bg-red-600 py-3 rounded-xl"
        >
          <Text className="text-white text-center">Sign out</Text>
        </TouchableOpacity>
      </BottomModal>

    </View>
  )
}

export default Home

const NoPostsFound = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: COLORS.background,
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Text style={{ fontSize: 20, color: COLORS.primary }}>No posts yet</Text>
  </View>
);