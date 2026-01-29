import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { router } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'
import { COLORS } from '@/constants/theme'
import { Ionicons } from '@expo/vector-icons'
import BottomModal from '@/components/BottomModal'

const Home = () => {

  const { signOut } = useAuth()
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <View
      className="flex-1 bg-black"
    >
      {/* header */}
      <View
        style={{}}
        className="flex-row items-center justify-between py-2 px-3 border-b border-b-gray-800"
      >
        {/* <View></View> */}
        <View className="flex-row items-center">
          <Ionicons name="leaf" size={28} color={COLORS.primary} />
          <Text
            style={{
              fontFamily: "JetBrainsMono-Medium",
              color: COLORS.primary,
            }}
            className="text-2xl"
          >
            spotlight
          </Text>
        </View>
        <TouchableOpacity
          // onPress={() => signOut()}
          // onPress={() => router.replace("/menu")}
          onPress={() => setModalVisible(true)}
          activeOpacity={0.8}
        >
          <Ionicons name="log-out-outline" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      <BottomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}

      >
        <Text className="text-red-600 text-lg mb-4">
          Hello from the bottom 👋
        </Text>

        <TouchableOpacity
          onPress={() => setModalVisible(false)}
          className="bg-red-600 py-3 rounded-xl"
        >
          <Text className="text-white text-center">Close</Text>
        </TouchableOpacity>
      </BottomModal>

    </View>
  )
}

export default Home