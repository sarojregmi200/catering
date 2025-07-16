import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
  withSpring,
} from "react-native-reanimated";
import { Card, TCardProps } from "./Card";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import { ActionPopup } from "./ActionPopup";

import * as Haptics from "expo-haptics";

const SWIPE_THRESHOLD = 60;
const ACTION_ACTIVATION_THRESHOLD = 50;

type SwipeableCardProps = TCardProps & {
  onSwipeStart: () => void;
  onSwipeEnd: () => void;
};

const handleExtendEvent = () => {};
const handleDeleteEvent = () => {};

export const SwipeableCard = ({
  onSwipeStart,
  onSwipeEnd,
  ...props
}: SwipeableCardProps) => {
  const primaryColor = useThemeColor("primary");
  const dangerColor = useThemeColor("danger");
  const [popupVisible, setPopupVisible] = useState(false);
  const [actionType, setActionType] = useState<"create" | "delete">("create");
  const translateX = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      runOnJS(onSwipeStart)();
    })
    .onUpdate((event) => {
      if (Math.abs(event.translationX) > SWIPE_THRESHOLD) return;

      translateX.value = event.translationX;
    })
    .onEnd(() => {
      if (translateX.value > ACTION_ACTIVATION_THRESHOLD) {
        runOnJS(handleExtendEvent)();
      } else if (translateX.value < -ACTION_ACTIVATION_THRESHOLD) {
        runOnJS(handleDeleteEvent)();
      } else {
        translateX.value = withSpring(0);
      }

      runOnJS(onSwipeEnd)();
    })
    .activeOffsetX([-20, 20])
    .failOffsetY([-15, 15]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const handleDeleteAction = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setActionType("delete");
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
    translateX.value = withSpring(0);
  };

  const handleConfirmAction = (details: {
    eventName?: string;
    participants?: number;
  }) => {
    if (actionType === "create") {
      onCreate(details);
    } else {
      onDelete();
    }
    handleClosePopup();
  };

  return (
    <View style={styles.container}>
      <View style={styles.actionsContainer}>
        <View style={[styles.actionLeft, { backgroundColor: primaryColor }]}>
          <Ionicons name="add" size={20} color="white" />
        </View>
        <View style={[styles.actionRight, { backgroundColor: dangerColor }]}>
          <Ionicons name="trash-outline" size={20} color="white" />
        </View>
      </View>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={animatedStyle}>
          <Card {...props} />
        </Animated.View>
      </GestureDetector>

      <ActionPopup
        visible={popupVisible}
        actionType={actionType}
        onClose={handleClosePopup}
        onConfirm={handleConfirmAction}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  actionsContainer: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 80,
    borderRadius: 10,
    overflow: "hidden",
  },
  actionLeft: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 65,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  actionRight: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 65,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  actionText: {
    color: "white",
    fontWeight: "600",
    fontSize: 12,
    textAlign: "center",
  },
});
