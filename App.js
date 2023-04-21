import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./src/navigation/TabNavigator";
import Colors from "./src/constants/Colors";
import AuthStack from "./src/navigation/AuthStack";
export default function App() {
  return (
    <NavigationContainer>
      <AuthStack/>
      {/* <TabNavigator /> */}
    </NavigationContainer>
  );
}
