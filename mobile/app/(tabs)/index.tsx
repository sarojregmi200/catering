import { useThemeColor } from "@/hooks/useThemeColor";
import { Text, View } from "react-native";

export const Index = () => {
  return (
    <View>
      <Text
        style={{
          color: useThemeColor("text"),
        }}
      >
        Hello
      </Text>
    </View>
  );
};
export default Index;
