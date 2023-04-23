import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import React, { useState, useContext } from "react";

import * as ImagePicker from "expo-image-picker";
import Colors from "../constants/Colors";
import Icon, { Icons } from "../components/Icons";
import { LinearGradient } from "expo-linear-gradient";
import GradientText from "../components/MaskedView";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const Register = ({ navigation }) => {
  const {registerUser}=useContext(AuthContext)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [image, setImage] = useState(null);
  const [base64, setBase64] = useState("");
  const [message, setMessage] = useState("");
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
      base64: true,
    });
    console.log(result);
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setBase64(result.assets[0].base64);
    }
  };
  const uploadImage = async () => {
    const cloud_name = "dxfu9zffp";
    let apiUrl = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;
    const uriArr = image.split(".");
    const fileType = uriArr[uriArr.length - 1];
    const file = `data:${fileType};base64,${base64}`;

    try {
      const res = await axios.post(apiUrl, {
        upload_preset: "_HeartStrings",
        file: file,
        folder: "HeartStrings",
        folder: "HeartStrings",
      });
      if (res.status === 200) {
        return res.data.secure_url;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    if(password.length<6){
      setMessage("Password must be at least 6 characters long")
    }
    if (password === confirmPassword && password !== "") {
      if (name === "") {
        setMessage("Please enter your name");
      } else if (email === "") {
        setMessage("Please enter your email");
      } else if (password === "") {
        setMessage("Please enter your password");
      } else if (confirmPassword === "") {
        setMessage("Please confirm your password");
      } else {
        console.log(image, name, email, password, gender);
        setMessage("");
        const imageUrl = await uploadImage();
        console.log(imageUrl);
        registerUser(name,email,password,gender,imageUrl)
        setImage(null);
        navigation.navigate("Login");
      }
    } else {
      setMessage("Passwords don't match");
    }
  };

  const handleGender = (genderVal) => {
    setGender(genderVal);
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingVertical: 25 }}
        // style={styles.container}
        contentContainerStyle={{
          // height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.title}>Register</Text>
        <Text style={styles.subtitle}>
          Register with one of the following options:
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
        <TouchableOpacity onPress={pickImage}>
          {image ? (
            <Image
              source={{ uri: image }}
              style={{
                width: 150,
                height: 150,
                borderRadius: 100,
                marginBottom: 20,
              }}
            />
          ) : (
            <View
              style={{
                backgroundColor: Colors.fill,
                height: 150,
                width: 150,
                borderRadius: 100,
                marginBottom: 20,
              }}
            />
          )}
        </TouchableOpacity>
        <View style={{ width: "90%" }}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            placeholder="Enter your name"
            placeholderTextColor={Colors.text}
            style={styles.input}
            onChangeText={(text) => setName(text)}
          />
        </View>
        <View style={{ width: "90%" }}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="Enter your email"
            placeholderTextColor={Colors.text}
            style={styles.input}
            type="email"
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={{ width: "90%" }}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            placeholder="Enter your password"
            placeholderTextColor={Colors.text}
            style={styles.input}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          />
        </View>
        <View style={{ width: "90%" }}>
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            placeholder="Confirm your password"
            placeholderTextColor={Colors.text}
            style={styles.input}
            onChangeText={(text) => setConfirmPassword(text)}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.genderContainer}>
          <TouchableOpacity
            style={
              gender === "male"
                ? styles.genderSelectedStyle
                : styles.genderStyle
            }
            name="male"
            onPress={() => handleGender("male")}
          >
            <Icon
              name="male-sharp"
              type={Icons.Ionicons}
              size={40}
              color={Colors.text}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={
              gender === "female"
                ? styles.genderSelectedStyle
                : styles.genderStyle
            }
            onPress={() => handleGender("female")}
          >
            <Icon
              name="female-sharp"
              type={Icons.Ionicons}
              size={40}
              color={Colors.text}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={
              gender === "trans"
                ? styles.genderSelectedStyle
                : styles.genderStyle
            }
            name="trans"
            onPress={() => handleGender("trans")}
          >
            <Icon
              name="male-female-sharp"
              type={Icons.Ionicons}
              size={40}
              color={Colors.text}
            />
          </TouchableOpacity>
        </View>
        {message && (
          <View style={{ marginBottom: 20 }}>
            <Text style={{ color: Colors.red, fontSize: 18 }}>{message}</Text>
          </View>
        )}
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            // style={[styles.button, { width: "100%" }]}
            style={styles.submitContainer}
            // style={{ width: "100%" }}
            // onPress={() => navigation.navigate("Login")}
            onPress={() => handleSubmit()}
          >
            <LinearGradient
              colors={["#EF9345", "#D929DE"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.buttonSubmit}
            >
              <Text style={{ fontWeight: "bold", fontSize: 30, color: "#fff" }}>
                Register
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
            width: "90%",
          }}
        >
          <Text style={styles.subtitle}>New to the app?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <GradientText style={{ fontSize: 18, fontWeight: "700" }}>
              Login
            </GradientText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;

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
    marginTop: StatusBar.currentHeight || 16,
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
    width: "90%",
    // justifyContent: "center",
    alignItems: "center",
  },
  submitContainer: {
    // padding: 10,
    flexDirection: "row",
    // backgroundColor:'red',
    width: "100%",
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
    marginTop: 20,
    marginBottom: 40,
  },
  genderStyle: {
    padding: 15,
    backgroundColor: Colors.fill,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.background,
  },
  genderSelectedStyle: {
    padding: 15,
    backgroundColor: Colors.fill,
    borderRadius: 10,
    borderColor: Colors.text,
    borderWidth: 2,
  },
});
