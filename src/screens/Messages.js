import React from "react";
import { Text, View,StyleSheet } from "react-native";
import Colors from "../constants/Colors";

const Messages = () => {
  return (
    <View style={styles.container}>
      <Text>Messages</Text>
    </View>
  );
};

export default Messages;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:Colors.dark,

  },
});