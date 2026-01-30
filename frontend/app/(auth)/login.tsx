import { View, Text, Dimensions, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/theme';
import { useFonts } from "expo-font";
import { useSSO } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';

// import { COLORS } from '@/constants/theme'



const Login = () => {

  const { height, width } = Dimensions.get("window");
  const { startSSOFlow } = useSSO();
  const router = useRouter()

  const [fontsLoaded] = useFonts({
    'JetBrainsMono-Medium': require('../../assets/fonts/JetBrainsMono-VariableFont_wght.ttf'),
  });

  
  async function handleGoogleSignIn() {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({ strategy: "oauth_google" })

      if(setActive && createdSessionId) {
        setActive({ session: createdSessionId });
        router.replace("/(tabs)")
      }

    } catch (err: unknown) {
        console.error("OAuth error:", err)
    }
  }


  if (!fontsLoaded) return null;

  return (
    <View
      className="flex-1 bg-black"
      style={{
        // backgroundColor: COLORS.background,
      }}
    >
      {/* brand section */}
      <View
        className="flex items-center brand-section"
        style={{
          marginTop: height * 0.05
        }}
      >
        <View className="logo-container w-16 h-16 rounded-2xl bg-[#2a453485] flex justify-center items-center mb-10">
          <Ionicons name="leaf" size={32} color={COLORS.primary} />
        </View>
        <Text
          className="app-name font-semibold text-[40px] tracking-wide"
          style={{
            fontFamily: "JetBrainsMono-Medium",
            color: COLORS.primary,
          }}
        >
          spotlight
        </Text>
        <Text
          className="text-gray-400 tracking-wider text-sm"
        >
          {"don't miss anything"}
        </Text>
      </View>

      {/* auth image */}
      <View className="illustration-container flex-1 items-center justify-center px-10 my-10">
        <Image
          source={require("../../assets/images/auth-bg-1.png")}
          resizeMode="cover"
          className="px-10 items-center"
          style={{
            width: width * 0.75,
            height: height * 0.75,
            maxHeight: 200,
          }}
        />
      </View>

      {/* login section */}
      <View
        className="login-section w-full px-12 pb-20 items-center"
        style={{
          //width: "100%"
        }}
      >
        <TouchableOpacity
          className="flex flex-row items-center justify-center bg-gray-100 py-3 px-6 rounded-2xl mb-8 w-full"
          style={{
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.15,
            shadowRadius: 12,
            elevation: 5,
          }}
          activeOpacity={0.9}
          onPress={handleGoogleSignIn}
        >
          <View className="google-container flex-row h-10 justify-center items-center">
            {/* <Ionicons name="logo-google" size={24} color={COLORS.surface} /> */}
            <Image
              source={require("../../assets/images/google-logo.png")}
              className="w-8 h-8 bg-transparent rounded-2xl"
            />
            <Text className="text-lg text-gray-700 font-semibold ml-4" style={{ }}>Continue with Google</Text>
          </View>
        </TouchableOpacity>

        <Text className="text-gray-500 mx-auto mb-2 text-center">
        By continuing, you agree to our Terms and Privacy Policy.
      </Text>
      </View>
    </View>
  )
}

export default Login
