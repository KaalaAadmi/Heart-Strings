import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import DrawerView from "../components/DrawerView";

const DailyPrompts = () => {
  return (
    <DrawerView style={styles.container}>
      <Text style={{color:Colors.white}}>Daily Prompts</Text>
    </DrawerView>
  );
};

export default DailyPrompts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:Colors.background,

  },
});
