import { COLORS } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { formatDistanceToNow } from "date-fns";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { truncateText } from "@/helpers/truncate";

export default function Notification({ notification }: any) {
  return (
    <View style={{}}
      className="flex-row items-center justify-between mb-4"
    >
      <View style={{}}
        className="flex-1 flex-row items-center mr-3"
      >
        <Link href={`/user/${notification.sender._id}`} asChild>
          <TouchableOpacity
            style={{ position: "relative" }}
            className="mr-3"
            activeOpacity={0.7}
          >

            <Image
              source={{ uri: notification.sender.image }}
              style={{
                width: 44,
                height: 44,
                borderColor: COLORS.surface,
                borderWidth: 2,
                borderRadius: 22,
              }}
              contentFit="cover"
              transition={200}
            />
            <View style={{
              position: "absolute",
              bottom: -4,
              right: -4,
              backgroundColor: COLORS.background,
              borderRadius: 12,
              width: 22,
              height: 22,
              borderWidth: 2,
              borderColor: COLORS.surface,
            }}
              className="items-center justify-center"
            >
              {notification.type === "like" ? (
                <Ionicons name="heart" size={14} color={COLORS.primary} />
              ) : notification.type === "follow" ? (
                <Ionicons name="person-add" size={14} color="#8B5CF6" />
              ) : (
                <Ionicons name="chatbubble" size={14} color="#3B82F6" />
              )}
            </View>
          </TouchableOpacity>
        </Link>

        <View style={{}}
          className="flex-1"
        >
          <Link href={`/user/${notification.sender._id}`} asChild>
            <TouchableOpacity
              activeOpacity={0.7}
            >
              <Text style={{

              }}
                className="text-gray-100 font-semibold mb-1"
              >
                {notification.sender.username}
              </Text>
            </TouchableOpacity>
          </Link>

          <Text style={{

          }}
            className="text-gray-400 mb-1"
          >
            {notification.type === "follow"
              ? "started following you"
              : notification.type === "like"
                ? "liked your post"
                : `commented: "${truncateText(notification.comment, 20)}"`}
          </Text>
          <Text style={{}}
            className="text-gray-500 text-xs">
            {formatDistanceToNow(notification._creationTime, { addSuffix: true })}
          </Text>
        </View>
      </View>

      {notification.post && (
        <Image
          source={{ uri: notification.post.imageUrl }}
          style={{
            width: 44,
            height: 44,
            borderRadius: 6,
          }}
          contentFit="cover"
          transition={200}
        />
      )}
    </View>
  );
}