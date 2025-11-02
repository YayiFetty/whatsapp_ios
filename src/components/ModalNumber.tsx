import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { s, vs } from "react-native-size-matters";
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
            <Text style={styles.editYesBtnText}>Is this your number ?</Text>
          </View>

          <View style={defaultStyles.separator} />

          <View style={styles.editYesBtn}>
            <TouchableOpacity onPress={onEdit}>
              <Text style={styles.editYesBtnText}>Edit</Text>
            </TouchableOpacity>
            <View style={defaultStyles.divider} />
            <TouchableOpacity onPress={onYes}>
              <Text style={styles.editYesBtnText}>Yes</Text>
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
    backgroundColor: "rgba(0,0,0,0.1)",
    zIndex: 1000,
  },
  modalView: {
    width: s(200),
    height: s(120),
    borderRadius: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: vs(10),
    paddingHorizontal: s(15),
    gap: s(5),
    backgroundColor: "white",
  },
  modalNumContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: s(10),
  },
  modalNumber: {
    fontSize: s(16),
    fontWeight: "bold",
  },
  editYesBtn: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    alignItems: "stretch",
    overflow: "hidden",
  },
  editYesBtnText: {
    fontSize: s(12),
    fontWeight: "400",
  },
});
