import { useAuth } from '@clerk/clerk-expo'
import { Stack, useRouter, useSegments, useRootNavigationState } from 'expo-router'
import { useEffect } from 'react'

const InitialLayout = () => {
  const { isLoaded, isSignedIn } = useAuth()

  const segments = useSegments()
  const router = useRouter()
  const navigationState = useRootNavigationState()

  useEffect(() => {
    
    if (!isLoaded) return;
    if (!navigationState?.key) return;

    const inAuthScreen = segments[0] === "(auth)";

    if (!isSignedIn && !inAuthScreen) router.replace("/(auth)/login");
    else if (isSignedIn && inAuthScreen) router.replace("/(tabs)");

  }, [isLoaded, isSignedIn, router, segments, navigationState?.key]);

  if (!isLoaded) return null;

  return (
    <Stack
      screenOptions={{
        headerShown: false
      }}
    />
  );
}

export default InitialLayout