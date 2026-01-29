import React from "react";
import { Modal, View, Pressable } from "react-native";

type BottomModalProps = {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function BottomModal({
  visible,
  onClose,
  children,
}: BottomModalProps) {
  return (
    <Modal
      visible={visible}
      className="bg-white"
      transparent
      animationType="slide"
      onRequestClose={onClose} // Android back button
    >
      <View className="bg-[#121212] rounded-t-3xl p-5 max-h-[80%]">
        <Pressable
          className="flex-1 justify-end bg-black/50"
          onPress={onClose}
        >
          {/* Prevent closing when clicking inside */}
          <Pressable onPress={() => { }}>
            <View className="bg-[#121212] rounded-t-3xl p-5">
              {children}
            </View>
          </Pressable>
        </Pressable>
      </View>
    </Modal>
  );
}
