import { View, Text, TouchableOpacity, Dimensions } from 'react-native'
import { Image } from 'expo-image'
import React, { useEffect, useState } from 'react'
import { Link } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/constants/theme'
import { Id } from '@/convex/_generated/dataModel'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import CommentsModal from './CommentsModal'
import { formatDistanceToNow } from 'date-fns'

type PostProps = {
  post: {
    _id: Id<"posts">;
    imageUrl: string;
    caption?: string;
    likes: number;
    comments: number;
    _creationTime: number;
    isLiked: boolean;
    isBookmarked: boolean;
    author: {
      _id: string;
      username: string;
      image: string;
    };
  };
}

const Post = ({ post }: PostProps) => {

  const { width } = Dimensions.get("window")

  const [isLiked, setIsLiked] = useState(post.isLiked)
  const [likesCount, setLikesCount] = useState(post.likes)
  const [commentsCount, setCommentsCount] = useState(post.comments)
  const [showComments, setShowComments] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked)

  const toggleLike = useMutation(api.post.toggleLike)
  const toggleBookmark = useMutation(api.bookmark.toggleBookmark)

  async function handleLike() {
    try {
      const newIsLiked = await toggleLike({ postId: post._id });
      setIsLiked(newIsLiked)
      setLikesCount((prev) => (newIsLiked ? prev + 1 : prev - 1))
    } catch (err: unknown) {
      console.error("Error toggling likes:", err)
    }
  }

  async function handleBookmark() {
    try {
      const newIsBookmarked = await toggleBookmark({ postId: post._id });
      setIsBookmarked(newIsBookmarked)
    } catch (err: unknown) {
      console.error("Error toggling bookmark:", err)
    }
  }

  useEffect(() => {
    setIsLiked(post.isLiked)
    setLikesCount(post.likes)
    setCommentsCount(post.comments)
  }, [post.isLiked, post.likes, post.comments])


  return (
    <View
      className="mb-1"
    >
      {/* header */}
      <View
        style={{

        }}
        className="flex-row items-center justify-between px-4 py-2"
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
        source={{ uri: post.imageUrl }}
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
        {/* likes */}
        <View style={{}}
          className="flex-row items-center gap-4"
        >
          <View className="flex-row items-center gap-1">
            <TouchableOpacity
              onPress={handleLike}
              activeOpacity={0.6}
            >
              <Ionicons
                name={isLiked ? "heart" : "heart-outline"}
                size={26}
                color={isLiked ? COLORS.primary : COLORS.white}
              />
            </TouchableOpacity>
            <Text style={{}}
              className="font-semibold text-gray-100 mb-"
            >
              {likesCount > 0 ? `${likesCount.toLocaleString()}` : ""}
            </Text>
          </View>

          <View className="flex-row items-center gap-1">
            <TouchableOpacity
              onPress={() => setShowComments(true)}
              activeOpacity={0.6}
            >
              <Ionicons name="chatbubble-outline" size={22} color={COLORS.white} />
            </TouchableOpacity>
            <Text style={{}}
              className="font-semibold text-gray-100 mb-"
            >
              {commentsCount > 0 ? `${commentsCount.toLocaleString()}` : ""}
            </Text>
          </View>
        </View>

        <View>
          <TouchableOpacity
            onPress={handleBookmark}
            activeOpacity={0.6}
          >
            <Ionicons
              name={isBookmarked ? "bookmark" : "bookmark-outline"}
              size={22}
              color={COLORS.white}
            />
          </TouchableOpacity>
        </View>

      </View>

      {/* post info */}
      <View style={{}}
        className="px-4"
      >

        {post.caption && (
          <View style={{}}
            className="flex-row flex-wrap mb-2"
          >
            <Text style={{}} className="font-semibold text-gray-100 mr-3">{post.author.username}</Text>
            <Text style={{}} className="text-gray-100 flex-1">{post.caption}</Text>
          </View>
        )}

        {/* {post.comments > 0 && (
          <TouchableOpacity
            onPress={() => setShowComments(true)}
          >
            <Text style={{}} className="text-gray-400 mb-1">View all {post.comments === 1 ? "1 comment" : `${post.comments} comments`}</Text>
          </TouchableOpacity>
        )} */}

        <Text style={{}} className="text-gray-500 text-sm mb-3">
          {formatDistanceToNow(post._creationTime, { addSuffix: true })}
        </Text>

        <CommentsModal
          postId={post._id}
          visible={showComments}
          onClose={() => setShowComments(false)}
          onCommentAdded={() => setCommentsCount((prev) => prev + 1)}
        />
      </View>
    </View >
  )
}

export default Post