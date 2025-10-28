// import React from "react";
// import { StyleSheet, Text, View } from "react-native";

// import {
//   CodeField,
//   Cursor,
//   useBlurOnFulfill,
//   useClearByFocusCell,
// } from "react-native-confirmation-code-field";

// import { SafeAreaView } from "react-native-safe-area-context";
// import { s, vs } from "react-native-size-matters";

// type Props = {
//   value?: string;
//   setValue?: (text: string) => void;
//   onChangeText?: (text: string) => void;
// };

// const CELL_COUNT = 6;

// const CodeFields = ({ value, setValue, onChangeText }: Props) => {
//   const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
//   const [props, getCellOnLayoutHandler] = useClearByFocusCell({
//     value,
//     setValue,
//   });

//   return (
//     <SafeAreaView style={styles.root}>
//       <CodeField
//         ref={ref}
//         {...props}
//         value={value}
//         onChangeText={setValue}
//         cellCount={CELL_COUNT}
//         rootStyle={styles.codeFieldRoot}
//         keyboardType="number-pad"
//         textContentType="oneTimeCode"
//         renderCell={({ index, symbol, isFocused }) => (
//           <View
//             // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
//             onLayout={getCellOnLayoutHandler(index)}
//             key={index}
//             style={[styles.cellRoot, isFocused && styles.focusCell]}
//           >
//             <Text style={styles.cellText}>
//               {symbol || (isFocused ? <Cursor /> : null)}
//             </Text>
//           </View>
//         )}
//       />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   root: {
//     width: s(300),
//     height: vs(60),
//     alignContent: "center",
//     backgroundColor: "red",
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: s(20),
//     marginVertical: vs(20),
//   },
//   codeFieldRoot: {
//     width: s(200),

//     backgroundColor: "blue",
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: s(20),
//     gap: s(10),
//   },
//   cellRoot: {
//     width: s(30),
//     height: vs(30),
//     justifyContent: "center",
//     alignItems: "center",
//     borderBottomColor: "#ccc",
//     borderBottomWidth: 1,
//   },
//   cellText: {
//     color: "#000",
//     fontSize: 22,
//     fontWeight: "600",
//     textAlign: "center",
//   },
//   focusCell: {
//     borderBottomColor: "#007AFF",
//     borderBottomWidth: 2,
//   },
// });

// export default CodeFields;

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { s, vs } from "react-native-size-matters";
import Colors from "../constants/Colors";

type Props = {
  value: string;
  setValue: (text: string) => void;
};

const CELL_COUNT = 6;

const CodeFields = ({ value, setValue }: Props) => {
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <View style={styles.root}>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <View
            key={index}
            onLayout={getCellOnLayoutHandler(index)}
            style={[styles.cellRoot, isFocused && styles.focusCell]}
          >
            <Text style={styles.cellText}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: vs(20),
  },
  codeFieldRoot: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: s(260),
  },
  cellRoot: {
    width: s(30),
    height: vs(40),
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: Colors.gray,
    borderBottomWidth: 1.5,
  },
  cellText: {
    color: "#000",
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
  },
  focusCell: {
    borderBottomColor: "#007AFF",
    borderBottomWidth: 2,
  },
});

export default CodeFields;
