import Colors from "@/src/constants/Colors";
import imagePath from "@/src/constants/imagePath";
import { Link, useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { s } from "react-native-size-matters";

export default function Index() {
  const router = useRouter();
  const openLink = () => {};
  const agree = () => {
    router.replace("/(auth)/input_number");
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={[styles.container]}>
        <Image source={imagePath.gif} style={styles.image} />
        <Text style={styles.welcome}>Welcome to Whatsapp</Text>
        <Text style={styles.text_policy}>
          Read out{" "}
          <Text style={styles.subtext} onPress={openLink}>
            Privacy Policy
          </Text>
          . Tap <Text>"Agree & continue"</Text> to accept the{" "}
          <Text style={styles.subtext} onPress={openLink}>
            Terms of Service
          </Text>
        </Text>
        <Link href={"/(auth)/input_number"} replace asChild>
          <TouchableOpacity onPress={agree} style={styles.agreeBtn}>
            <Text style={styles.agreeBtnText}>Agree & continue</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    gap: 30,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
    paddingHorizontal: 30,
  },
  image: {
    width: s(300),
    height: s(300),
    borderRadius: s(150),
    resizeMode: "cover",
  },
  welcome: {
    fontSize: 30,
    fontWeight: "700",
    color: Colors.black,
  },
  text_policy: {
    fontSize: 14,
    color: Colors.gray,
    textAlign: "center",
    fontWeight: "bold",
    lineHeight: 20,
  },
  subtext: {
    color: Colors.primary,
  },
  agreeBtn: {
    borderColor: Colors.primary,
    backgroundColor: Colors.tintblue,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 2,
    padding: 10,
  },
  agreeBtnText: {
    color: Colors.primary,
    fontWeight: "bold",
    fontSize: 18,
  },
});
