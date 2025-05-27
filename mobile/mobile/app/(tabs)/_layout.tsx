import { ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import {
  Dimensions,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { Colors } from "@/constants/Colors";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const [loaded] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: isDarkMode
          ? Colors.dark.background
          : Colors.light.background,
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
      }}
    >
      <Tabs
        screenOptions={{
          tabBarItemStyle: {
            width: Dimensions.get("window").width - 50,
            position: "absolute",
            top: 20,
            left: 20,
            backgroundColor: "red",
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon({ color }) {
              return <AntDesign name="home" color={color} size={18} />;
            },
            tabBarButton(props) {
              return <Pressable {...props} />;
            },
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            headerShown: false,
            tabBarShowLabel: false,
            tabBarButton(props) {
              return <Pressable {...props} />;
            },
            tabBarIcon({ color }) {
              return <AntDesign name="setting" color={color} size={18} />;
            },
          }}
        />
      </Tabs>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
