import React from "react";
import { View } from "react-native";
import Modal from "react-native-modal";

type BottomModalProps = {
  visible: boolean;
  onClose: () => void;
  height?: number;
  width?: number;
  children: React.ReactNode;
};

export default function BottomModal({
  visible,
  onClose,
  height,
  width,
  children,
}: BottomModalProps) {


  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      style={{
        margin: 0,
        justifyContent: "flex-end",
      }}
    >
      {/* BOTTOM SHEET */}
      <View
        style={{
          height,
          width
        }}
        className="bg-gray-900 rounded-t-3xl p-5"
      >
        <View className="h-1.5 w-16 bg-gray-500 rounded-full mx-auto mb-4"></View>
        {children}
      </View>
    </Modal>
  );
}
