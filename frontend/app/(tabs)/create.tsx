import { View, Text, TouchableOpacity, Dimensions, KeyboardAvoidingView, Platform, ActivityIndicator, TextInput, ScrollView } from 'react-native'
import React, { useState, useRef } from 'react'
import { useRouter } from 'expo-router'
import { useUser } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/theme';
import { Image } from "expo-image";
import * as FileSystem from "expo-file-system/legacy";

import * as ImagePicker from "expo-image-picker";
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';


const CreateScreen = () => {

  const router = useRouter();
  const { user } = useUser();
  const scrollViewRef = useRef<ScrollView>(null);

  const [caption, setCaption] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isSharing, setIsSharing] = useState(false);
  const { width } = Dimensions.get("window")

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) setSelectedImage(result.assets[0].uri);
  };

  const generateUploadUrl = useMutation(api.post.generateUploadUrl)
  const createPost = useMutation(api.post.createPost)

  const handleShare = async () => {
    if (!selectedImage) return;

    try {
      setIsSharing(true);
      const uploadUrl = await generateUploadUrl();

      const uploadResult = await FileSystem.uploadAsync(uploadUrl, selectedImage, {
        httpMethod: "POST",
        uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
        mimeType: "image/*",
      });

      if (uploadResult.status !== 200) throw new Error("Upload failed");

      const { storageId } = JSON.parse(uploadResult.body);
      await createPost({ storageId, caption });

      setSelectedImage(null);
      setCaption("");

      router.push("/(tabs)");

    } catch (err: unknown) {
      console.log("Error sharing post:", err);
    } finally {
      setIsSharing(false);
    }
  }

  if (!selectedImage) {
    return (
      <View
        style={{
          backgroundColor: COLORS.background
        }}
        className="flex-1"
      >
        <View
          style={{
            borderBottomWidth: 0.8,
            borderBottomColor: COLORS.surface,
          }}
          className="flex-row items-center justify-between p-2"
        >
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back-outline" size={28} color={COLORS.primary} />
          </TouchableOpacity>
          <Text
            style={{}}
            className="text-gray-50 font-semibold text-lg"
          >
            New Post
          </Text>
          <View style={{ width: 28 }} />
        </View>

        <TouchableOpacity
          style={{

          }}
          className="flex-1 items-center justify-center gap-8"
          onPress={pickImage}
        >
          <Ionicons name="image-outline" size={48} color={COLORS.grey} />
          <Text
            style={{
              fontSize: 16,
            }}
            className="text-gray-300/80"
          >
            Tap to select an image
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  // console.log(selectedImage)

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: COLORS.background }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 36.5}
    >
      {/* HEADER */}
      <View
        style={{
          borderBottomWidth: 0.8,
          borderBottomColor: COLORS.surface,
        }}
        className="flex-row items-center justify-between p-2"
      >
        <TouchableOpacity
          onPress={() => {
            setSelectedImage(null);
            setCaption("");
          }}
          disabled={isSharing}
        >
          <Ionicons
            name="close-outline"
            size={30}
            color={isSharing ? COLORS.grey : COLORS.white}
          />
        </TouchableOpacity>

        <Text className="text-gray-50 font-semibold text-lg">
          New Post
        </Text>

        <TouchableOpacity
          style={{ minWidth: 60 }}
          className={`px-3 py-2 items-center justify-center ${isSharing && "opacity-50"
            }`}
          disabled={isSharing || !selectedImage}
          activeOpacity={0.7}
          onPress={handleShare}
        >
          {isSharing ? (
            <ActivityIndicator size="small" color={COLORS.primary} />
          ) : (
            <View className="flex-row items-center justify-center">
              <Ionicons
                name="share-outline"
                size={20}
                color={COLORS.primary}
              />
              <Text
                style={{ color: COLORS.primary }}
                className="text-lg ml-1"
              >
                Post
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* CONTENT */}
      <ScrollView
        ref={scrollViewRef}
        className={`flex-1 ${isSharing && "opacity-70"}`}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        {/* IMAGE SECTION */}
        <View
          style={{
            width: width,
            height: width,
            backgroundColor: COLORS.surface,
          }}
          className="items-center justify-center"
        >
          <Image
            source={selectedImage}
            style={{
              width: "100%",
              height: "100%",
            }}
            contentFit="cover"
            transition={200}
          />

          <TouchableOpacity
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.75)",
              gap: 6,
              position: "absolute",
              bottom: 16,
              right: 16,
            }}
            className="px-4 py-3 rounded-2xl flex-row items-center"
            onPress={pickImage}
            disabled={isSharing}
            activeOpacity={0.7}
          >
            <Ionicons name="image-outline" size={20} color={COLORS.white} />
            <Text className="text-gray-50">Change</Text>
          </TouchableOpacity>
        </View>

        {/* INPUT SECTION */}

        <View className="p-4">
          <View className="flex-row items-start">
            <Image
              source={user?.imageUrl}
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                marginRight: 10,
              }}
              contentFit="cover"
              transition={200}
            />

            <TextInput
              style={{
                paddingTop: 8,
                minHeight: 40,
              }}
              className="flex-1 text-gray-50 border-b border-green-800 rounded px-2"
              placeholder="Write a caption..."
              placeholderTextColor={COLORS.grey}
              multiline
              value={caption}
              onChangeText={setCaption}
              editable={!isSharing}
            // onFocus={() => {
            //   setTimeout(() => {
            //     scrollViewRef.current?.scrollToEnd({ animated: true });
            //   }, 100);
            // }}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>


  )
}

export default CreateScreen