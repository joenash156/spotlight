import { View, Text, Modal, KeyboardAvoidingView, Platform, TouchableOpacity, FlatList, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Id } from '@/convex/_generated/dataModel';
import { api } from '@/convex/_generated/api';
import { useMutation, useQuery } from 'convex/react';
import { Ionicons } from '@expo/vector-icons';
import Loader from './Loader';
import { COLORS } from '@/constants/theme';
import Comment from './Comment';

type CommentsModalProps = {
  postId: Id<"posts">;
  visible: boolean;
  onClose: () => void;
  onCommentAdded: () => void;
}

const CommentsModal = ({ postId, visible, onClose, onCommentAdded }: CommentsModalProps) => {

  const [newComment, setNewComment] = useState("");
  const comments = useQuery(api.comments.getComments, { postId });
  const addComment = useMutation(api.comments.addComment);

  const handleAddComment = async () => {
    if (newComment.trim() === "") return;
    try {
      await addComment({ content: newComment, postId });
      setNewComment("");
      onCommentAdded();
    } catch (err: unknown) {
      console.error("Error adding comment:", err);
    }
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      animationType="slide"
      transparent={true}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          backgroundColor: COLORS.background,
          marginBottom: Platform.OS === "ios" ? 44 : 0,
          marginTop: Platform.OS === "ios" ? 44 : 0,
        }}
        className="flex-1"
      >
        <View
          style={{
            paddingHorizontal: 16,
            height: 56,
            borderBottomWidth: 0.5,
            borderBottomColor: COLORS.surface,
          }}
          className="flex-row justify-between items-center "
        >
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={30} color={COLORS.white} />
          </TouchableOpacity>
          <Text style={{}}
            className="text-gray-100 text-xl font-semibold"
          >
            Comments
          </Text>
          <View style={{ width: 24 }} />
        </View>

        {comments === undefined ? (
          <Loader />
        ) : (
          <FlatList
            data={comments}
            keyExtractor={(item) => item._id.toString()}
            renderItem={({ item }) => (
              <Comment comment={item} />
            )}
            contentContainerStyle={{
              flex: 1,
            }}
          />
        )}

        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderTopWidth: 0.5,
            borderTopColor: COLORS.surface,
            backgroundColor: COLORS.background,
          }}
          className="flex-row items-center"
        >
          <TextInput
            style={{
              backgroundColor: COLORS.surface,
            }}
            className="flex-1 text-gray-100 mr-4 px-4 rounded-2xl"
            placeholder="Add a comment..."
            placeholderTextColor={COLORS.grey}
            value={newComment}
            onChangeText={setNewComment}
            multiline
          />

          <TouchableOpacity onPress={handleAddComment} disabled={!newComment.trim()}>
            <Text style={{
              color: COLORS.primary
            }}
              className={`font-semibold ${!newComment.trim() && 'opacity-50'}`}
            >
              Post
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal >
  )
}

export default CommentsModal