
import BottomModal from "@/components/BottomModal";
import Loader from "@/components/Loader";
import { COLORS } from "@/constants/theme";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useAuth } from "@clerk/clerk-expo";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "convex/react";
import { Image } from "expo-image";
import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Dimensions,
} from "react-native";

export default function Profile() {

  const { height, width } = Dimensions.get("window");

  const { signOut, userId } = useAuth();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const currentUser = useQuery(api.users.getUserByClerkId, userId ? { clerkId: userId } : "skip");

  const [editedProfile, setEditedProfile] = useState({
    fullname: currentUser?.fullname || "",
    bio: currentUser?.bio || "",
  });

  const [selectedPost, setSelectedPost] = useState<Doc<"posts"> | null>(null);
  const posts = useQuery(api.post.getPostsByUser, {});

  const updateProfile = useMutation(api.users.updateProfile);

  const handleSaveProfile = async () => {
    await updateProfile(editedProfile);
    setIsEditModalVisible(false);
  };

  if (!currentUser || posts === undefined) return <Loader />;

  return (
    <View style={{}}
      className="flex-1 bg-black"
    >
      {/* HEADER */}
      <View
        style={{
          borderBottomWidth: 0.5,
          borderBottomColor: COLORS.surface,
        }}
        className="flex-row items-center justify-between p-3"
      >
        <View
          style={{}}
          className="flex-row items-center"
        >
          <Text style={{}}
            className="text-xl font-semibold text-gray-100"
          >
            @{currentUser.username}
          </Text>
        </View>
        <View style={{}}>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            activeOpacity={0.8}

          >
            <FontAwesome6 name="bars-staggered" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{
          padding: 16,
        }}>
          {/* AVATAR & STATS */}
          <View style={{}}
            className="items-center mb-4 flex-row"
          >
            <View style={{
              marginRight: 32,
            }}>
              <Image
                source={currentUser.image}
                style={{
                  width: 86,
                  height: 86,
                  borderRadius: 43,
                  borderWidth: 2,
                  borderColor: COLORS.surface,
                }}
                contentFit="cover"
                transition={200}
              />
            </View>

            <View style={{

            }}
              className="flex-row justify-around flex-1"
            >
              <View style={{}}
                className="items-center"
              >
                <Text style={{

                }}
                  className="text-gray-100 font-semibold text-lg"
                >
                  {currentUser.posts}
                </Text>
                <Text
                  style={{
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
                <Text style={{

                }}
                  className="text-gray-100 font-semibold text-lg"
                >
                  {currentUser.followers}
                </Text>
                <Text
                  style={{
                    color: COLORS.grey
                  }}
                  className="text-sm"
                >
                  Followers
                </Text>
              </View>
              <View style={{}}
                className="items-center"
              >
                <Text
                  style={{}}
                  className="text-gray-100 font-semibold text-lg"
                >
                  {currentUser.following}
                </Text>
                <Text
                  style={{
                    color: COLORS.grey
                  }}
                  className="text-sm"
                >Following</Text>
              </View>
            </View>
          </View>

          <Text style={{}}
            className="text-gray-100 font-bold text-lg mb-2"
          >
            {currentUser.fullname}
          </Text>
          {currentUser.bio && <Text style={{ lineHeight: 20, }} className="text-gray-100 text-sm">{currentUser.bio}</Text>}

          <View style={{}}
            className="flex-row gap-2 mt-2"
          >
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.surface,
              }}
              className="flex-1 px-4 py-3 rounded-lg items-center"
              onPress={() => setIsEditModalVisible(true)}
              activeOpacity={0.7}
            >
              <Text style={{}}
                className="text-gray-100 font-semibold"
              >
                Edit Profile
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{}}
              className="px-4 py-2 rounded-2xl items-center justify-center border border-gray-700"
              activeOpacity={0.7}
            >
              <Ionicons name="share-outline" size={20} color={COLORS.white}

              />
            </TouchableOpacity>
          </View>
        </View>

        {posts.length === 0 && <NoPostsFound />}

        <FlatList
          data={posts}
          numColumns={3}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                flex: 1 / 3,
                aspectRatio: 1,
                padding: 1,
              }}
              onPress={() => setSelectedPost(item)}
              activeOpacity={0.7}
            >
              <Image
                source={item.imageUrl}
                style={{ flex: 1, }}
                contentFit="cover"
                transition={200}
              />
            </TouchableOpacity>
          )}
        />
      </ScrollView>

      {/* sign out modal */}
      <BottomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        height={height * 0.3}
      >
        <View className="flex-row items-baseline justify-center">
          <Text style={{}}
            className="text-gray-400 font-bold text-lg mb-4 mx-auto"
          >
            Account
          </Text>
        </View>
        <View className="gap-2">
          <Text style={{}}
            className="text-gray-400 text-sm" >Sign out</Text>
          <TouchableOpacity
            style={{}}
            className="py-3 bg-red-600 rounded-xl mb-4 "
            onPress={async () => {
              await signOut();
              setModalVisible(false);
            }}
          >
            <Text style={{}}
              className="text-white font-semibold text-center"
            >
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>
      </BottomModal>

      {/* EDIT PROFILE MODAL */}
      <BottomModal
        visible={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
        height={height * 0.65}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{
              flex: 1,
            }}
          >
            <View
              style={{
                // backgroundColor: COLORS.background,
                // borderTopLeftRadius: 20,
                // borderTopRightRadius: 20,
                // padding: 20,
                // minHeight: 400,
              }}>
              <View style={{}}
                className="flex-row justify-between items-center mb-2"
              >
                <Text style={{}}
                  className="text-gray-400 font-bold text-lg mb-4 mx-auto"
                >
                  Edit Profile
                </Text>
                {/* <TouchableOpacity onPress={() => setIsEditModalVisible(false)}>
                  <Ionicons name="close" size={24} color={COLORS.white} />
                </TouchableOpacity> */}
              </View>

              <View style={{}}
                className="mb-4"
              >
                <Text
                  style={{
                    color: COLORS.grey
                  }}
                  className="mb-2"
                >
                  Name
                </Text>
                <TextInput
                  style={{
                    backgroundColor: COLORS.surface,
                    borderRadius: 8,
                    padding: 12,
                    color: COLORS.white,
                    fontSize: 16,
                  }}
                  className="border border-gray-700"
                  value={editedProfile.fullname}
                  onChangeText={(text) => setEditedProfile((prev) => ({ ...prev, fullname: text }))}
                  placeholderTextColor={COLORS.grey}
                />
              </View>

              <View style={{}}
                className="mb-4"
              >
                <Text style={{
                  color: COLORS.grey,
                  marginBottom: 8,
                  fontSize: 14,
                }}
                >
                  Bio
                </Text>
                <TextInput
                  style={[
                    {
                      backgroundColor: COLORS.surface,
                      borderRadius: 8,
                      padding: 12,
                      color: COLORS.white,
                      fontSize: 16,
                    },
                    {
                      height: 100,
                      textAlignVertical: "top",
                    },
                  ]}
                  value={editedProfile.bio}
                  onChangeText={(text) => setEditedProfile((prev) => ({ ...prev, bio: text }))}
                  multiline
                  numberOfLines={4}
                  placeholderTextColor={COLORS.grey}
                  className="border border-gray-700"

                />
              </View>

              <TouchableOpacity
                style={{}}
                className="bg-green-600 rounded-lg py-4 items-center mt-4"
                onPress={handleSaveProfile}
                activeOpacity={0.7}
              >
                <Text style={{

                }}
                  className="items-center justify-center text-white font-semibold"
                >
                  Save Changes
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </BottomModal>

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
  );
}

function NoPostsFound() {
  return (
    <View
      style={{
        height: "100%",
        backgroundColor: COLORS.background,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Ionicons name="images-outline" size={48} color={COLORS.grey} />
      <Text style={{ color: COLORS.grey }} className="text-sm">No posts yet</Text>
    </View>
  );
}
