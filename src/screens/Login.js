import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import Colors from "../constants/Colors";
import Icon, { Icons } from "../components/Icons";
import { LinearGradient } from "expo-linear-gradient";
import GradientText from "../components/MaskedView";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingVertical: 25 }}
        // style={styles.container}
        contentContainerStyle={{
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <View style={{ justifyContent: "center" }}> */}
        <Text style={styles.title}>Login</Text>
        {/* </View> */}
        <Text style={styles.subtitle}>
          Login with one of the following options:
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Icon
              name="logo-google"
              type={Icons.Ionicons}
              size={40}
              color={Colors.text}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Icon
              name="facebook"
              type={Icons.FontAwesome5}
              size={40}
              color={Colors.text}
            />
          </TouchableOpacity>
        </View>
          <View
            style={{
              borderWidth: 2,
              borderColor: Colors.fill,
              width: "90%",
              marginBottom: 20,
            }}
          />
        <View style={{ width: "90%" }}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="Enter your email"
            placeholderTextColor={Colors.text}
            style={styles.input}
          />
        </View>
        <View style={{ width: "90%" }}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            placeholder="Enter your password"
            placeholderTextColor={Colors.text}
            style={styles.input}
          />
        </View>
      </ScrollView>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          // style={[styles.button, { width: "100%" }]}
          style={{ width: "90%" }}
          onPress={() => navigation.navigate("Login")}
        >
          <LinearGradient
            colors={["#EF9345", "#D929DE"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.buttonSubmit}
          >
            <Text style={{ fontWeight: "bold", fontSize: 30, color: "#fff" }}>
              Login
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          marginRight: 25,
          marginBottom: 30,
        }}
      >
        <Text style={styles.subtitle}>New to the app?</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          <GradientText style={{ fontSize: 18, fontWeight: "700" }}>
            Register
          </GradientText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    padding: 10,
    backgroundColor: Colors.background,
  },
  subtitle: {
    fontSize: 18,
    color: Colors.text,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: Colors.text,
    // justifyContent: "center",
    // alignItems: "center",
    textAlign: "center",
    // marginTop: StatusBar.currentHeight || 16,
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
    width: "90%",
  },
  button: {
    paddingVertical: 20,
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: Colors.fill,
    width: "49%",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    color: Colors.text,
    paddingHorizontal: 15,
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    fontSize: 20,
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: Colors.fill,
    borderRadius: 10,
    marginBottom: 20,
    color: Colors.text,
  },
  buttonSubmit: {
    // padding: 20,
    paddingVertical: 15,
    borderRadius: 10,
    borderWidth: 2,
    // borderColor: Colors.text,
    backgroundColor: Colors.fill,
    // width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
});
