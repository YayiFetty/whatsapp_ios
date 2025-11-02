import Btn from "@/src/components/Btn";
import ModalNumber from "@/src/components/ModalNumber";
import Colors from "@/src/constants/Colors";
import { defaultStyles } from "@/src/constants/Styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CountryPicker, {
  Country,
  CountryCode,
} from "react-native-country-picker-modal";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { ms, s, vs } from "react-native-size-matters";

export default function Number() {
  const { bottom } = useSafeAreaInsets();

  const [num, setNum] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [country, setCountry] = useState("Nigeria");
  const [countryFlag, setCountryFlag] = useState("🇳🇬");
  const [countryCode, setCountryCode] = useState<CountryCode>("NG");
  const [callingCode, setCallingCode] = useState("234");
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const inputRef = useRef<TextInput>(null);
  const router = useRouter();
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

  function countryCodeToEmoji(code: string) {
    return code
      .toUpperCase()
      .replace(/./g, (char) =>
        String.fromCodePoint(char.charCodeAt(0) + 127397)
      );
  }

  const onSelect = (c: Country) => {
    const countryName =
      typeof c.name === "string" ? c.name : c.name.common || "";

    setCountry(countryName);
    setCountryFlag(countryCodeToEmoji(c.cca2));
    setCountryCode(c.cca2);
    if (c.callingCode && c.callingCode[0]) setCallingCode(c.callingCode[0]);
    setShowPicker(false);
  };

  const onNext = () => {
    Keyboard.dismiss();
    setConfirmVisible(true);
  };

  const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 90000).toString();
  };

  const onEdit = () => {
    setConfirmVisible(false);
    // Focus the input after modal closes
    setTimeout(() => {
      inputRef.current?.focus();
    }, 300);
  };

  const onYes = async () => {
    setConfirmVisible(false);

    const fullNumber = `+${callingCode}${num}`;
    const otp = generateOtp();
    console.log("the otp is", otp);
    // Save a dummy token to AsyncStorage for authentication
    await AsyncStorage.setItem("generatedOtp", otp);

    router.push({
      pathname: "/(auth)/verify_otp/[phone]",
      params: { phone: fullNumber },
    });

    console.log("OTP (for demo):", otp); // For testing
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.container}>
          <Text
            style={[
              styles.verify,
              { marginTop: Platform.OS === "ios" ? vs(-30) : vs(10) },
            ]}
          >
            WhatsApp will need to verify your account. Carrier charges may
            apply.
          </Text>

          <View
            style={[
              styles.box,
              { marginTop: Platform.OS === "ios" ? vs(30) : vs(20) },
            ]}
          >
            {/* Country Selector */}
            <TouchableOpacity
              onPress={() => setShowPicker(true)}
              style={styles.rowHeight}
            >
              <View style={styles.countrySelector}>
                <View style={styles.countryInfo}>
                  <Text style={styles.flag}>{countryFlag}</Text>
                  <Text style={styles.boxCountryText}>{country}</Text>
                </View>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={20}
                  color={Colors.gray}
                />
              </View>
            </TouchableOpacity>

            <View style={defaultStyles.separator} />

            {/* Phone Input */}
            <View style={[styles.phoneInputContainer, styles.rowHeight]}>
              <Text style={styles.callingCode}>+{callingCode}</Text>
              <TextInput
                ref={inputRef}
                style={styles.phoneInput}
                placeholder="Phone number"
                value={num}
                keyboardType="phone-pad"
                onChangeText={(text) => setNum(text.replace(/[^0-9]/g, ""))}
                placeholderTextColor={Colors.gray}
                maxLength={11}
              />
            </View>
          </View>
        </View>

        {/* Next Button - Disabled when modal is visible */}
        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: keyboardHeight > 0 ? keyboardHeight : bottom,
            paddingHorizontal: ms(30),
            paddingBottom: vs(20),
            backgroundColor: Colors.background,
          }}
        >
          <Btn
            title="Next"
            onPress={onNext}
            disabled={num.trim().length === 0 || confirmVisible}
          />
        </View>

        <ModalNumber
          visible={confirmVisible}
          number={`+${callingCode} ${num}`}
          onConfirm={() => setConfirmVisible(false)}
          onEdit={onEdit}
          onYes={onYes}
        />

        {showPicker && (
          <CountryPicker
            countryCode={countryCode}
            withFlag
            withCallingCode
            withAlphaFilter
            withFilter
            visible={showPicker}
            onSelect={onSelect}
            onClose={() => setShowPicker(false)}
            containerButtonStyle={{ display: "none" }}
          />
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: ms(30),
  },
  verify: {
    fontSize: 16,
    color: Colors.gray,
    lineHeight: 20,
  },
  box: {
    backgroundColor: "#fff",
    borderRadius: s(8),
    paddingHorizontal: s(15),
    marginTop: vs(15),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1,
  },
  rowHeight: {
    height: vs(30),
    justifyContent: "center",
  },
  countrySelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  countryInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  flag: { fontSize: 24 },
  boxCountryText: { fontSize: 18, color: Colors.primary },
  phoneInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  callingCode: { fontSize: 18, color: Colors.primary, fontWeight: "600" },
  phoneInput: { flex: 1, fontSize: 18, color: Colors.primary },
});
