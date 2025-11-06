import Colors from "@/src/constants/Colors";
import imagePath from "@/src/constants/imagePath";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { s, vs } from "react-native-size-matters";

export default function Profile() {
  const [avatar, setAvatar] = useState(imagePath.icon);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) setAvatar({ uri: result.assets[0].uri });
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.avatarSection}>
        <Image source={imagePath.icon} style={styles.avatar} />
        <TouchableOpacity style={styles.cameraButton} onPress={pickImage}>
          <Ionicons name="camera" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Your name"
            defaultValue="YayiFetty"
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>About</Text>
          <TextInput
            style={styles.input}
            placeholder="Caption"
            defaultValue="Caption"
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phone</Text>
          <Text style={styles.phoneText}>+234 123 456 7890</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, padding: s(20) },
  avatarSection: { alignItems: "center", marginVertical: vs(30) },
  avatar: { width: s(120), height: s(120), borderRadius: s(60) },
  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: "35%",
    backgroundColor: Colors.primary,
    width: s(40),
    height: s(40),
    borderRadius: s(20),
    justifyContent: "center",
    alignItems: "center",
  },
  form: { gap: vs(20) },
  inputGroup: { backgroundColor: "#fff", padding: s(15), borderRadius: s(10) },
  label: { fontSize: 12, color: Colors.gray, marginBottom: 8 },
  input: { fontSize: 16, color: Colors.black },
  phoneText: { fontSize: 16, color: Colors.gray },
  saveButton: {
    backgroundColor: Colors.primary,
    padding: vs(15),
    borderRadius: s(10),
    alignItems: "center",
    marginTop: vs(30),
  },
  saveButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
