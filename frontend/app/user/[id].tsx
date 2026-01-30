import { View, Text, TouchableOpacity, ScrollView, Pressable, FlatList, Modal, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Doc, Id } from '@/convex/_generated/dataModel';
import { api } from '@/convex/_generated/api';
import { useMutation, useQuery } from 'convex/react';
import Loader from '@/components/Loader';
import Ionicons from '@expo/vector-icons/build/Ionicons';
import { COLORS } from '@/constants/theme';
import { Image } from 'expo-image';

const { height, width } = Dimensions.get("window");


const UserProfileScreen = () => {

  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [selectedPost, setSelectedPost] = useState<Doc<"posts"> | null>(null);
  const profile = useQuery(api.users.getUserProfile, { id: id as Id<"users"> });
  const posts = useQuery(api.post.getPostsByUser, { userId: id as Id<"users"> });
  const isFollowing = useQuery(api.users.isFollowing, { followingId: id as Id<"users"> });

  const toggleFollow = useMutation(api.users.toggleFollow);

  const handleBack = () => {
    if (router.canGoBack()) router.back();
    else router.replace("/(tabs)");
  };

  if (profile === undefined || posts === undefined || isFollowing === undefined) return <Loader />;


  return (
    <View
      className="flex-1 bg-black"
    >
      <View
        style={{
          borderBottomWidth: 0.5,
          borderBottomColor: COLORS.surface,
        }}
        className="flex-row items-center justify-between p-3"
      >
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="chevron-back-outline" size={28} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={{}}
          className="text-gray-50 font-semibold text-lg"
        >{profile.username}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            padding: 16,
          }}
        >
          <View style={{}}
            className="items-center mb-4 flex-row"
          >
            {/* AVATAR */}
            <Image
              source={profile.image}
              style={{
                width: 86,
                height: 86,
                borderRadius: 43,
                borderWidth: 2,
                borderColor: COLORS.surface,
              }}
              contentFit="cover"
              cachePolicy="memory-disk"
            />

            {/* STATS */}
            <View style={{}}
              className="flex-row justify-around flex-1"
            >
              <View style={{}}
                className="items-center"
              >
                <Text style={{}}
                  className="text-gray-100 font-semibold text-lg"
                >
                  {profile.posts}
                </Text>
                <Text style={{
                  color: COLORS.grey
                }}
                  className="text-sm"
                >
                  Posts
                </Text>
              </View>
              <View style={{}}
                className="items-center"
              >
                <Text style={{}}
                  className="text-gray-100 font-semibold text-lg"
                >
                  {profile.followers}
                </Text>
                <Text style={{
                  color: COLORS.grey
                }}
                  className="text-sm">
                  Followers
                </Text>
              </View>
              <View style={{}}
                className="items-center"
              >
                <Text style={{}}
                  className="text-gray-100 font-semibold text-lg"
                >
                  {profile.following}
                </Text>
                <Text style={{
                  color: COLORS.grey
                }}
                  className="text-sm">
                  Following
                </Text>
              </View>
            </View>
          </View>

          <Text style={{}}
            className="text-gray-100 font-bold text-lg mb-2"
          >
            {profile.fullname}
          </Text>
          {profile.bio && <Text style={{ lineHeight: 20, }} className="text-gray-100 text-sm">{profile.bio}</Text>}

          <Pressable
            style={[{
              backgroundColor: COLORS.primary,
              paddingHorizontal: 24,
              paddingVertical: 8,
              borderRadius: 8,
              marginTop: 16,
            }, isFollowing && {
              backgroundColor: COLORS.surface,
              borderWidth: 1,
              borderColor: COLORS.primary,
            }]}
            onPress={() => toggleFollow({ followingId: id as Id<"users"> })}
          >
            <Text style={[{
              color: COLORS.white,
              fontSize: 14,
              fontWeight: "600",
              textAlign: "center",
            }, isFollowing && {
              color: COLORS.primary,
              textAlign: "center",
            }]}
            >
              {isFollowing ? "Following" : "Follow"}
            </Text>
          </Pressable>
        </View>

        <View style={{}}
          className="flex-1 flex-row flex-wrap justify-between"
        >
          {posts.length === 0 ? (
            <View style={{}}
              className="items-center justify-center flex-1 gap-2 py-4"
            >
              <Ionicons name="images-outline" size={40} color={COLORS.grey} />
              <Text style={{}}
                className="text-gray-600 text-sm"
              >
                No posts yet
              </Text>
            </View>
          ) : (
            <FlatList
              data={posts}
              numColumns={3}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => setSelectedPost(item)}
                  activeOpacity={0.7}
                  style={{
                    flex: 1 / 3,
                    aspectRatio: 1,
                    padding: 1,
                  }}>
                  <Image
                    source={item.imageUrl}
                    style={{
                      flex: 1,
                    }}
                    contentFit="cover"
                    transition={200}
                    cachePolicy="memory-disk"
                  />
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item._id}
            />
          )}
        </View>
      </ScrollView>

      {/* SELECTED IMAGE MODAL */}
      <Modal
        visible={!!selectedPost}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setSelectedPost(null)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            justifyContent: "center",
          }}
        >
          {selectedPost && (
            <View
              style={{
                backgroundColor: COLORS.background,
                maxHeight: height * 0.9,
              }}
            >
              <View
                style={{
                  justifyContent: "flex-end",
                  padding: 12,
                  borderBottomWidth: 0.5,
                  borderBottomColor: COLORS.surface,
                }}
                className="flex-row items-center"
              >
                <TouchableOpacity
                  onPress={() => setSelectedPost(null)}>
                  <Ionicons name="close" size={24} color={COLORS.white} />
                </TouchableOpacity>
              </View>

              <Image
                source={selectedPost.imageUrl}
                cachePolicy={"memory-disk"}
                style={{
                  width: width,
                  height: width,
                }}
              />
            </View>
          )}
        </View>
      </Modal>

    </View>
  )
}

export default UserProfileScreen