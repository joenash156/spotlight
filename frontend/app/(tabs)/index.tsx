import { View, Text, TouchableOpacity, FlatList, Dimensions, RefreshControl } from 'react-native'
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

const { height } = Dimensions.get("window")

const Home = () => {

  const { signOut } = useAuth()
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState(false)

  // fetch posts
  const posts = useQuery(api.post.getFeedPosts)

  if (posts === undefined) return <Loader />

  if (posts.length === 0) return <NoPostsFound />

  function handleSignout() {
    signOut()
    setModalVisible(false)
  }

  function onRefresh() {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 600)
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
          <FontAwesome6 name="bars-staggered" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <Post post={item} />
        )}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 60
        }}
        ListHeaderComponent={<StoriesSection />}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.primary}
            colors={[COLORS.primary]}
            progressBackgroundColor="black"
            progressViewOffset={5}
          />
        }
      />

      {/* modal */}
      <BottomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        height={height * 0.3}

      >
        <View
          className="flex-row items-baseline justify-center"
        >
          <Text className="text-gray-400 font-bold text-lg mb-4">
            Account
          </Text>
        </View>

        <View className="gap-2">
          <Text className="text-gray-400 text-sm">Sign out</Text>
          <TouchableOpacity
            onPress={handleSignout}
            className="bg-red-600 py-3 rounded-xl"
          >
            <Text className="text-white text-center">Sign out</Text>
          </TouchableOpacity>
        </View>
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

const StoriesSection = () => {
  return (
    <FlatList
      data={STORIES}
      renderItem={({ item }) => (
        <Story story={item} />
      )}
      keyExtractor={(item) => item.id}
      horizontal
      contentContainerStyle={{
        paddingVertical: 8
      }}
    />
  );
}