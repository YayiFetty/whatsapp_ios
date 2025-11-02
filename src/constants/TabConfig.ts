import { MaterialIcons } from "@expo/vector-icons";

export interface TabConfig {
  name: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  badge?: number;
}

export const TAB_CONFIG: TabConfig[] = [
  {
    name: "updates",
    icon: "update",
    label: "Updates",
  },
  {
    name: "calls",
    icon: "call",
    label: "Calls",
  },
  {
    name: "community",
    icon: "people",
    label: "Community",
  },
  {
    name: "chats",
    icon: "chat",
    label: "Chats",
    badge: 3, // Optional badge count
  },
  {
    name: "settings",
    icon: "settings",
    label: "Settings",
  },
];

export const TAB_ICONS = TAB_CONFIG.reduce((acc, tab) => {
  acc[tab.name] = tab.icon;
  return acc;
}, {} as Record<string, keyof typeof MaterialIcons.glyphMap>);
