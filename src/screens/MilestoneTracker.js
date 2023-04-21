import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

const MilestoneTracker = () => {
  return (
    <View style={styles.container}>
      <Text>Milestone Tracker</Text>
    </View>
  );
};

export default MilestoneTracker;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:Colors.dark,

  },
});
