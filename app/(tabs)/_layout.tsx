import CustomTabBar from "@/src/components/CustomTabBar";
import { TAB_CONFIG } from "@/src/constants/TabConfig";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        hea,
      }}
    >
      {TAB_CONFIG.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.label,
            tabBarBadge: tab.badge,
          }}
        />
      ))}
    </Tabs>
  );
}
