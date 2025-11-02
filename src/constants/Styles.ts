import { StyleSheet } from "react-native";
import { vs } from "react-native-size-matters";
import Colors from "./Colors";

export const defaultStyles = StyleSheet.create({
  separator: {
    width: "100%",
    marginVertical: vs(5),
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.gray,
  },
  divider: {
    width: StyleSheet.hairlineWidth,
    backgroundColor: Colors.gray,
    height: "100%",
  },
});
