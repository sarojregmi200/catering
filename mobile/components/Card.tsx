import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useThemeColor } from "../hooks/useThemeColor";

export interface TCardProps {
  eventTitle: string;
  participants: number;
  staff: number;
  date: string;
}

export const Card = ({ eventTitle, participants, staff, date }: TCardProps) => {
  const cardBackgroundColor = useThemeColor("bgSecondary");
  const dateSectionBackgroundColor = useThemeColor("border");
  const dateTextColor = useThemeColor("veryMutedText");
  const titleColor = useThemeColor("text");
  const descriptionColor = useThemeColor("mutedText");

  const day = new Date(date).toLocaleDateString("en-US", { day: "2-digit" });
  const month = new Date(date)
    .toLocaleDateString("en-US", { month: "short" })
    .toUpperCase();

  return (
    <View style={[styles.card, { backgroundColor: cardBackgroundColor }]}>
      <View
        style={[
          styles.dateContainer,
          { backgroundColor: dateSectionBackgroundColor },
        ]}
      >
        <Text style={[styles.dateText, { color: dateTextColor }]}>{day}</Text>
        <Text style={[styles.dateText, { color: dateTextColor }]}>{month}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={[styles.title, { color: titleColor }]}>{eventTitle}</Text>
        <Text style={[styles.description, { color: descriptionColor }]}>
          Participants: {participants}, Staff: {staff}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    borderRadius: 10,
    marginBottom: 10,
    height: 80,
  },
  dateContainer: {
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  dateText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  detailsContainer: {
    flex: 1,
    padding: 15,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 2,
  },
  description: {
    fontSize: 14,
  },
});
