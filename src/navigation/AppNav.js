import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import Colors from "../constants/Colors";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./TabNavigator";
import AuthStack from "./AuthStack";

const AppNav = () => {
  const { loading, userToken, userInfo } = useContext(AuthContext);
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }
  return (
    <NavigationContainer>
      {userToken ? <TabNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNav;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
});
