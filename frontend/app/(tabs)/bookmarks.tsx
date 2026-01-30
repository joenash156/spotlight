import Loader from "@/components/Loader";
import { COLORS } from "@/constants/theme";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Image } from "expo-image";
import { View, Text, ScrollView } from "react-native";

export default function Bookmarks() {
  const bookmarkedPosts = useQuery(api.bookmark.getBookmarkedPosts);

  if (bookmarkedPosts === undefined) return <Loader />;
  if (bookmarkedPosts.length === 0) return <NoBookmarksFound />;

  return (
    <View style={{}}
      className="flex-1 bg-black"
    >
      <View
        style={{
          borderBottomWidth: 0.5,
          borderBottomColor: COLORS.surface,
        }}
        className="flex-row px-4 py-2"
      >
        <Text style={{
          fontFamily: "JetBrainsMono-Medium",
          color: COLORS.primary,
        }}
          className="text-2xl"
        >
          Bookmarks
        </Text>
      </View>

      {/* POSTS */}
      <ScrollView
        contentContainerStyle={{
          padding: 8,
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {bookmarkedPosts.map((post) => {
          if (!post) return null;
          return (
            <View key={post._id} style={{ width: "33.33%", padding: 1 }}>
              <Image
                source={{ uri: post.imageUrl }}
                style={{ width: "100%", aspectRatio: 1 }}
                contentFit="cover"
                transition={200}
                cachePolicy="memory-disk"
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

function NoBookmarksFound() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.background,
      }}
    >
      <Text style={{ color: COLORS.grey }}>No bookmarked posts yet</Text>
    </View>
  );
}