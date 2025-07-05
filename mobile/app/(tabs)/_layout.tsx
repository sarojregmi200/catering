import { Tabs } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import "react-native-reanimated";

import { useThemeColor } from "@/hooks/useThemeColor";

export default function RootLayout() {
  const backgroundColor = useThemeColor("background");
  const bgSecondary = useThemeColor("bgSecondary");
  const borderColor = useThemeColor("border");

  return (
    <Tabs
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,
        sceneStyle: {
          backgroundColor: backgroundColor,
          // there must be a better way to offset exact statusbar.
          paddingTop: 40,
          paddingHorizontal: 15,
        },
        tabBarStyle: {
          backgroundColor: bgSecondary,
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
          borderColor: borderColor,
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
