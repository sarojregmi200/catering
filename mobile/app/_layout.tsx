import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Provider } from 'jotai';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Layout() {
  const isDarkMode = useColorScheme() === "dark";

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const backgroundColor = useThemeColor("background");
  const primaryColor = useThemeColor("primary");
  const borderColor = useThemeColor("border");

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider>
        <ThemeProvider
          value={{
            dark: isDarkMode,
            colors: {
              text: backgroundColor,
              primary: primaryColor,
              background: backgroundColor,
              border: borderColor,
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
      </Provider>
    </GestureHandlerRootView>
  );
}
