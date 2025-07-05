import React, { useRef, useEffect } from "react";
import { TextInput, StyleSheet, View, Keyboard } from "react-native";
import { useSearchAtom } from "../contexts/SearchContext";
import { useThemeColor } from "../hooks/useThemeColor";
import { AntDesign } from "@expo/vector-icons";

export const SearchBox = () => {
  const { search } = useSearchAtom();
  const backgroundColor = useThemeColor("border");
  const borderColor = useThemeColor("border");
  const color = useThemeColor("text");
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      inputRef.current?.blur();
    });

    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <View style={[styles.searchBoxContainer, { backgroundColor, borderColor }]}>
      <AntDesign name="search1" size={20} color={color} style={styles.icon} />
      <TextInput
        ref={inputRef}
        style={[styles.searchBox, { color }]}
        placeholderTextColor={color}
        placeholder="Search..."
        onChangeText={search}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  searchBox: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
});
