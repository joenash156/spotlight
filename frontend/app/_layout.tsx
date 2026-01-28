import { Stack } from "expo-router";
import "@/global.css"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView
        className="flex-1"
      >
        <Stack
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              title: "Feed"
            }}
          />
          <Stack.Screen
            name="notifications"
            options={{
              title: "Notifications",
              headerShown: false
            }}
          />
        </Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
