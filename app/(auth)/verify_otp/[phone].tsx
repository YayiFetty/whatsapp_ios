import Btn from "@/src/components/Btn";
import CodeFields from "@/src/components/CodeFields";
import Colors from "@/src/constants/Colors";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ms, s, vs } from "react-native-size-matters";

export default function Otp() {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const router = useRouter();
  const { bottom } = useSafeAreaInsets();
  // Get the dynamic segment
  const params = useLocalSearchParams<{ phone: string }>();
  const phoneNumber = params.phone;
  const [seconds, setSeconds] = useState(63);
  const [resend, setResend] = useState(false);
  const [otp, setOtp] = useState("");
  useEffect(() => {
    if (seconds <= 0) {
      setResend(true);
      return;
    }

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [seconds]);

  const formatTime = (secs: number) => {
    const min = Math.floor(secs / 60);
    const sec = secs % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const handleResend = () => {
    console.log("Resend OTP");
    setSeconds(63);
    setResend(false);
    //    trigger OTP resend logic here
  };

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", (e) =>
      setKeyboardHeight(e.endCoordinates.height)
    );
    const hideSub = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardHeight(0)
    );
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);
  const onVerify = () => {
    // Verify OTP logic here
    console.log("Verifying OTP:", otp);
    // On successful verification, navigate to the next screen
    router.replace("/(tabs)/chats");
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={styles.title}>Enter the 6-digit code we sent by SMS to</Text>
      <Text style={styles.phoneNumber}>{phoneNumber}</Text>

      <CodeFields value={otp} setValue={setOtp} />

      <View style={{ alignItems: "center", gap: 10 }}>
        <Text style={{ color: Colors.gray, fontSize: s(14) }}>
          Didn't receive a verification code ?
        </Text>
        <View>
          {resend ? (
            <TouchableOpacity onPress={handleResend}>
              <Text style={{ color: Colors.primary, fontSize: s(16) }}>
                Resend OTP
              </Text>
            </TouchableOpacity>
          ) : (
            <Text>You can request a new code in {formatTime(seconds)}</Text>
          )}
        </View>
      </View>
      <View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: keyboardHeight > 0 ? keyboardHeight : bottom,
          paddingHorizontal: ms(30),
          paddingBottom: vs(10),
          backgroundColor: Colors.background,
          marginBottom: bottom,
        }}
      >
        <Btn title="Verify" onPress={onVerify} disabled={otp.length < 6} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: ms(30),
  },
  title: { fontSize: 16, color: Colors.gray, textAlign: "center" },
  phoneNumber: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginVertical: vs(10),
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 8,
    padding: ms(15),
    fontSize: 18,
    marginVertical: vs(20),
    textAlign: "center",
  },
});
