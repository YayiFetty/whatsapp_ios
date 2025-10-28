import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="updates" />
      <Tabs.Screen name="calls" />
      <Tabs.Screen name="community" />
      <Tabs.Screen name="chats" />
      <Tabs.Screen name="settings" />
    </Tabs>
  );
}
