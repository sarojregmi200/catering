import { View, Text, StyleSheet, SectionList, Alert } from "react-native";
import { SearchBox } from "../../components/SearchBox";
import { useSearchAtom } from "../../contexts/SearchContext";
import { useEffect, useState } from "react";
import { SwipeableCard } from "../../components/SwipeableCard";
import { useThemeColor } from "@/hooks/useThemeColor";

type EventItem = {
  eventTitle: string;
  participants: number;
  staff: number;
  date: string;
};

const initialData: EventItem[] = [
  {
    eventTitle: "Birthday Party",
    participants: 50,
    staff: 5,
    date: "2024-07-01",
  },
  {
    eventTitle: "Wedding Reception",
    participants: 150,
    staff: 15,
    date: "2024-07-01",
  },
  {
    eventTitle: "Corporate Event",
    participants: 100,
    staff: 10,
    date: "2024-07-02",
  },
  {
    eventTitle: "Anniversary Dinner",
    participants: 30,
    staff: 3,
    date: "2024-07-02",
  },
  {
    eventTitle: "Graduation Party",
    participants: 75,
    staff: 7,
    date: "2024-07-03",
  },
  { eventTitle: "Summer BBQ", participants: 60, staff: 6, date: "2024-08-05" },
  { eventTitle: "Team Outing", participants: 40, staff: 4, date: "2024-08-15" },
  {
    eventTitle: "Conference",
    participants: 200,
    staff: 20,
    date: "2024-09-10",
  },
  { eventTitle: "Workshop", participants: 50, staff: 5, date: "2024-09-12" },
  {
    eventTitle: "Holiday Party",
    participants: 120,
    staff: 12,
    date: "2024-12-20",
  },
  {
    eventTitle: "End of Year Review",
    participants: 50,
    staff: 5,
    date: "2024-12-15",
  },
  {
    eventTitle: "Client Appreciation Dinner",
    participants: 70,
    staff: 7,
    date: "2024-12-18",
  },
  {
    eventTitle: "Department Potluck",
    participants: 30,
    staff: 3,
    date: "2024-12-19",
  },
  {
    eventTitle: "Secret Santa Exchange",
    participants: 40,
    staff: 4,
    date: "2024-12-21",
  },
  {
    eventTitle: "Winter Festival",
    participants: 300,
    staff: 30,
    date: "2024-12-22",
  },
  {
    eventTitle: "Charity Fundraiser",
    participants: 150,
    staff: 15,
    date: "2024-12-23",
  },
  {
    eventTitle: "Ugly Sweater Party",
    participants: 60,
    staff: 6,
    date: "2024-12-24",
  },
  {
    eventTitle: "Christmas Lunch",
    participants: 80,
    staff: 8,
    date: "2024-12-25",
  },
  {
    eventTitle: "Pre-New Year Bash",
    participants: 100,
    staff: 10,
    date: "2024-12-30",
  },
  {
    eventTitle: "New Year Gala",
    participants: 250,
    staff: 25,
    date: "2024-12-31",
  },
];

export const Index = () => {
  const { setDataToSearch, results } = useSearchAtom();
  const [events, setEvents] = useState(initialData);
  const [isSwiping, setIsSwiping] = useState(false);
  const mutedTextColor = useThemeColor("veryMutedText");
  const backgroundColor = useThemeColor("background");

  useEffect(() => {
    setDataToSearch(events);
  }, [events]);

  const handleDelete = (eventTitle: string) => {
    setEvents(events.filter((event) => event.eventTitle !== eventTitle));
    Alert.alert("Event Deleted", `${eventTitle} has been deleted.`);
  };

  const handleCreate = (details: {
    eventName?: string;
    participants?: number;
  }) => {
    if (details.eventName && details.participants) {
      const newEvent: EventItem = {
        eventTitle: details.eventName,
        participants: details.participants,
        staff: Math.ceil(details.participants / 10),
        date: new Date().toISOString().split("T")[0],
      };
      console.log("got here ");
      {/* setEvents([...events, newEvent]);
      Alert.alert("Event Created", `${newEvent.eventTitle} has been created.`); */}
    }
  };

  const groupedResults = (results as EventItem[]).reduce(
    (acc: { [key: string]: EventItem[] }, item) => {
      const monthYear = item.date.substring(0, 7); // YYYY-MM
      if (!acc[monthYear]) {
        acc[monthYear] = [];
      }
      acc[monthYear].push(item);
      return acc;
    },
    {},
  );

  const formatMonthYear = (monthYear: string) => {
    const [year, month] = monthYear.split("-");
    const date = new Date(parseInt(year), parseInt(month) - 1);
    const monthName = date
      .toLocaleString("default", { month: "long" })
      .toUpperCase();
    const yearDigits = date.toLocaleString("default", { year: "2-digit" });
    return `'${yearDigits} ${monthName}`;
  };

  const sections = Object.entries(groupedResults).map(([monthYear, items]) => ({
    title: formatMonthYear(monthYear),
    data: items,
  }));

  return (
    <View style={styles.container}>
      <SearchBox />

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.eventTitle}
        scrollEnabled={!isSwiping}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 5, paddingHorizontal: 10 }}>
            <SwipeableCard
              {...item}
              onDelete={() => handleDelete(item.eventTitle)}
              onCreate={handleCreate}
              onSwipeStart={() => setIsSwiping(true)}
              onSwipeEnd={() => setIsSwiping(false)}
            />
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text
            style={[
              styles.dateLabel,
              { color: mutedTextColor, backgroundColor: backgroundColor },
            ]}
          >
            {title}
          </Text>
        )}
        stickySectionHeadersEnabled
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{ height: 80 }} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dateLabel: {
    fontSize: 12,
    fontWeight: "normal",
    paddingHorizontal: 10,
    paddingTop: 15,
    paddingBottom: 10,
  },
});

export default Index;
