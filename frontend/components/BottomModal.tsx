import React from "react";
import { View, Dimensions } from "react-native";
import Modal from "react-native-modal";

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

  const { height } = Dimensions.get("window");

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      style={{
        margin: 0,
        justifyContent: "flex-end", 
      }}
      //hasBackdrop={true}    
    >
      {/* BOTTOM SHEET */}
      <View
        style={{
          height: height * 0.5,
        }}
        className="bg-gray-900 rounded-t-3xl p-5"
      >
        {children}
      </View>
    </Modal>
  );
}
