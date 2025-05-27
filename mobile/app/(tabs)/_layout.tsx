import { Tabs } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import "react-native-reanimated";

import { useThemeColor } from "@/hooks/useThemeColor";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,
        sceneStyle: {
          backgroundColor: useThemeColor("background"),
        },
        tabBarStyle: {
          backgroundColor: useThemeColor("background"),
          borderTopWidth: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 20,
          marginInline: 40,
          borderRadius: 10,
          position: "absolute",
          overflow: "visible",
        },
        tabBarItemStyle: {
          borderRadius: 10,
          height: "100%",
        },
        tabBarIconStyle: {
          transform: "translateY(6px)",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon({ color }) {
            return <AntDesign name="home" color={color} size={18} />;
          },
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon({ color }) {
            return <AntDesign name="setting" color={color} size={18} />;
          },
        }}
      />
    </Tabs>
  );
}
