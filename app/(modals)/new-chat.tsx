import contacts from "@/src/data/contacts.json";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AlphabetList } from "react-native-section-alphabet-list";

export default function Page() {
  const data = contacts.map((contact, index) => ({
    value: `${contact.first_name} ${contact.last_name}`,
    name: `${contact.first_name} ${contact.last_name}`,
    img: contact.img,
    desc: contact.desc,
    key: `${contact.first_name} ${contact.last_name}-${index}`,
  }));
  return (
    <View>
      <AlphabetList
        data={data}
        indexLetterStyle={{
          color: "blue",
          fontSize: 15,
        }}
        renderCustomItem={(item) => (
          <View style={styles.listItemContainer}>
            <Text style={styles.listItemLabel}>{item.value}</Text>
          </View>
        )}
        renderCustomSectionHeader={(section) => (
          <View style={styles.sectionHeaderContainer}>
            <Text style={styles.sectionHeaderLabel}>{section.title}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
