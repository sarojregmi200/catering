import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function Layout() {
  const isDarkMode = useColorScheme() === "dark";
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider
      value={{
        dark: isDarkMode,
        colors: {
          text: useThemeColor("background"),
          primary: useThemeColor("primary"),
          background: useThemeColor("background"),
          border: useThemeColor("border"),
          card: DefaultTheme.colors.card,
          notification: DefaultTheme.colors.notification,
        },
        fonts: DefaultTheme.fonts,
      }}
    >
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
