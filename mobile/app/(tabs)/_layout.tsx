import { Tabs } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import "react-native-reanimated";

import { useThemeColor } from "@/hooks/useThemeColor";
import { View } from "react-native";
export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,
        sceneStyle: {
          backgroundColor: useThemeColor("background"),
          // there must be a better way to offset exact statusbar.
          paddingTop: 40,
          paddingLeft: 10,
        },
        tabBarStyle: {
          backgroundColor: useThemeColor("bgSecondary"),
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 20,
          marginInline: 40,
          borderRadius: 10,
          position: "absolute",
          overflow: "visible",
          borderWidth: 1,
          borderTopWidth: 1,
          borderColor: useThemeColor("border"),
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
