import Loader from "@/components/Loader";
import Notification from "@/components/Notification";
import { COLORS } from "@/constants/theme";
import { api } from "@/convex/_generated/api";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { FlatList, Text, View } from "react-native";

export default function Notifications() {
  const notifications = useQuery(api.notifications.getNotifications);

  if (notifications === undefined) return <Loader />;
  if (notifications.length === 0) return <NoNotificationsFound />;

  return (
    <View style={{

    }}
      className="flex-1 bg-black pb-12"
    >
      <View style={{
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
          Notifications
        </Text>
      </View>

      <FlatList
        data={notifications}
        renderItem={({ item }) => <Notification notification={item} />}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, }}
      />
    </View>
  );
}

function NoNotificationsFound() {
  return (
    <View style={{

    }}
      className="flex-1 bg-black justify-center items-center gap-2"
    >
      <Ionicons name="notifications-outline" size={40} color={COLORS.primary} />
      <Text style={{ color: COLORS.grey }}>No notifications yet</Text>
    </View>
  );
}
