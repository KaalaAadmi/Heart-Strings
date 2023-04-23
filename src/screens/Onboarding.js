import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Colors from "../constants/Colors";
import GradientText from "../components/MaskedView";
import { LinearGradient } from "expo-linear-gradient";
// import {Image} from "expo-image"

const Onboarding = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <GradientText style={styles.title}>Heart Strings</GradientText>
        <Text style={styles.subtitle}>Strengthening love, even from afar</Text>
      </View>
      <Image
        source={require("../../assets/logo.png")}
        style={{ width: 300, height: 300 }}
      />
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate("Login")}
      >
        <LinearGradient
          colors={["#EF9345", "#D929DE"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.button}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 18,
              color: "#fff",
              // justifyContent: "flex-start",
            }}
          >
            Let's Begin
          </Text>
          <MaterialIcons
            name="arrow-forward-ios"
            size={22}
            color="#fff"
            // style={{ justifyContent: "flex-end" }}
          />
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: Colors.background,
    padding:20,
  },
  subtitle: {
    fontSize: 18,
    color: Colors.text,
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    color: Colors.text,
  },
  button: {
    padding: 20,
    width: "100%",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonContainer: {
    padding: 10,
    flexDirection: "row",
  },
});

export default Onboarding;
