import { View, Text, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

type StoryProps = {
  id: string;
  username: string;
  avatar: string;
  hasStory: boolean;
};

export default function Story({ story }: { story: StoryProps }) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className="items-center mx-2"
      style={{ width: 72 }}
    >
      {/* STORY RING */}
      {story.hasStory ? (
        <LinearGradient
          // colors={["#22c55e", "#16a34a"]}
          colors={[
            "#22c55e",
            "#16a34a",
            "#15803d",
            "#16a34a",
            "#22c55e",
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="p-[3px] rounded-full mb-1"
          style={{
            borderRadius: 38
          }}
        >
          <View className="bg-black rounded-full p-[2px]">
            <Image
              source={{ uri: story.avatar }}
              className="w-[60px] h-[60px] rounded-full"
            />
          </View>
        </LinearGradient>
      ) : (
        <View className="p-[3px] rounded-full mb-1 bg-gray-600">
          <View className="bg-black rounded-full p-[2px]">
            <Image
              source={{ uri: story.avatar }}
              className="w-[60px] h-[60px] rounded-full opacity-60"
            />
          </View>
        </View>
      )}

      {/* USERNAME */}
      <Text
        numberOfLines={1}
        className="text-xs text-gray-100 text-center mt-1"
      >
        {story.username}
      </Text>
    </TouchableOpacity>
  );
}
