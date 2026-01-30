import { View, Text, TouchableOpacity, Dimensions, GestureResponderEvent } from 'react-native'
import { Image } from 'expo-image'
import React from 'react'
import { Link } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/constants/theme'

const Post = ({ post }: { post: any }) => {

  const { width } = Dimensions.get("window")

  function handleLike(event: GestureResponderEvent): void {
    throw new Error('Function not implemented.')
  }

  function setShowComments(arg0: boolean): void {
    throw new Error('Function not implemented.')
  }

  function formatDistanceToNow(_creationTime: any, arg1: { addSuffix: boolean }): React.ReactNode {
    throw new Error('Function not implemented.')
  }

  return (
    <View
      className="mb-1"
    >
      {/* header */}
      <View
        style={{

        }}
        className="flex-row items-center justify-between p-4"
      >
        <Link href={"/(tabs)/notifications"} asChild>
          <TouchableOpacity style={{}}
            className="flex-row items-center"
          >
            <Image
              source={post.author.image}
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                marginRight: 8,
              }}
              contentFit="cover"
              transition={200}
              cachePolicy="memory-disk"
            />
            <Text style={{}}
              className="font-semibold text-gray-100"
            >{post.author.username}</Text>
          </TouchableOpacity>
        </Link>

        {/* show a delete button */}
        {/* <TouchableOpacity
          activeOpacity={0.6}
        >
          <Ionicons name="ellipsis-horizontal" size={20} color={COLORS.white} />
        </TouchableOpacity> */}
        <TouchableOpacity
          activeOpacity={0.6}
        >
          <Ionicons name="trash-outline" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* image */}
      <Image
        source={post.imageUrl}
        contentFit="cover"
        transition={200}
        cachePolicy={"memory-disk"}
        className=""
        style={{
          width: width,
          height: width,
        }}
      />

      {/* post actions */}
      <View style={{}}
        className="flex-row justify-between items-center px-4 py-2"
      >
        <View style={{}}
          className="flex-row items-center gap-4"
        >
          <TouchableOpacity
            onPress={handleLike}
            activeOpacity={0.6}
          >
            <Ionicons
              name='heart-outline'
              //name={isLiked ? "heart" : "heart-outline"}
              size={24}
              color={COLORS.white}
            //color={isLiked ? COLORS.primary : COLORS.white}
            />
          </TouchableOpacity>
          <TouchableOpacity
            // onPress={() => setShowComments(true)}
            activeOpacity={0.6}
          >
            <Ionicons name="chatbubble-outline" size={22} color={COLORS.white} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          //onPress={handleBookmark}
          activeOpacity={0.6}
        >
          <Ionicons
            name='bookmark-outline'
            //name={isBookmarked ? "bookmark" : "bookmark-outline"}
            size={22}
            color={COLORS.white}
          />
        </TouchableOpacity>
      </View>

      {/* post info */}
      <View style={{}}
        className="px-4"
      >
        <Text style={{}}
          className="font-semibold text-gray-100 mb-2"
        >
          {post.likes > 0 ? `${post.likes.toLocaleString()} likes` : "Be the first to like"}
        </Text>
        {post.caption && (
          <View style={{}}
            className="flex-row flex-wrap mb-3"
          >
            <Text style={{}} className="font-semibold text-gray-100 mr-3">{post.author.username}</Text>
            <Text style={{}} className="text-gray-100 flex-1">{post.caption}</Text>
          </View>
        )}

        {post.comments > 0 && (
          <TouchableOpacity onPress={() => setShowComments(true)}>
            <Text style={{}} className="text-gray-600 mb-1">View all {post.comments} comments</Text>
          </TouchableOpacity>
        )}

        <Text style={{}} className="text-gray-600 mb-3">
          {formatDistanceToNow(post._creationTime, { addSuffix: true })}
        </Text>
      </View>
    </View >
  )
}

export default Post