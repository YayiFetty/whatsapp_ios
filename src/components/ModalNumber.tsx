import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { s } from "react-native-size-matters";
import { defaultStyles } from "../constants/Styles";

interface ConfirmModalProps {
  visible: boolean;
  number: string;
  onConfirm: () => void;
  onEdit: () => void;
  onYes: () => void;
}

export default function ModalNumber({
  visible,
  number,
  onConfirm,
  onEdit,
  onYes,
}: ConfirmModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onEdit}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <View style={styles.modalNumContainer}>
            <Text style={styles.modalNumber}>{number}</Text>
            <Text>Is this your number ?</Text>
          </View>
          <View style={defaultStyles.separator} />
          <View style={styles.editYesBtn}>
            <TouchableOpacity onPress={onEdit}>
              <Text>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onYes}>
              <Text>Yes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    zIndex: 1000,
  },
  modalView: {
    width: s(220),
    height: s(100),
    borderRadius: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: s(20),
    gap: s(10),
    backgroundColor: "white",
  },
  modalNumContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: s(10),
  },
  modalNumber: {
    fontSize: s(18),
    fontWeight: "bold",
  },
  editYesBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
