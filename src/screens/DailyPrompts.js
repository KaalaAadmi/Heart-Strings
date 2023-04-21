import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

const DailyPrompts = () => {
  return (
    <View style={styles.container}>
      <Text>Daily Prompts</Text>
    </View>
  );
};

export default DailyPrompts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:Colors.dark,

  },
});
