import React, { useContext, useState } from "react";
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	Image,
	ScrollView,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";
import Colors from "../constants/Colors";
import * as ImagePicker from "expo-image-picker";

const Profile = () => {
	const { logout, userInfo } = useContext(AuthContext);
	const [image, setImage] = useState(userInfo.image);
	const [base64, setBase64] = useState("");
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
	const handleSave = async () => {};
	return (
		<ScrollView
			style={styles.container}
			contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}
		>
			<Text style={styles.text}>Profile</Text>
			<TouchableOpacity onPress={pickImage}>
				<Image
					source={{ uri: image }}
					style={{
						width: 150,
						height: 150,
						borderRadius: 100,
						marginBottom: 20,
					}}
				/>
			</TouchableOpacity>

			
			<TouchableOpacity onPress={handleSave}>
				<Text style={styles.buttonText}>Save</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={logout}>
				<Text style={styles.buttonText}>Logout</Text>
			</TouchableOpacity>
		</ScrollView>
	);
};

export default Profile;
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	text: {
		color: Colors.white,
	},
	buttonText: {
		padding: 20,
		color: Colors.white,
		borderWidth: 1,
		borderRadius: 50,
		margin: 20,
		backgroundColor: Colors.primary,
	},
});
