import {
	DrawerContentScrollView,
	useDrawerProgress,
	//   DrawerItemList,
} from "@react-navigation/drawer";
import React, { useRef } from "react";
import {
	Text,
	TouchableOpacity,
	View,
	ScrollView,
	StyleSheet,
	Image,
} from "react-native";
import Animated, {
	interpolate,
	useAnimatedStyle,
} from "react-native-reanimated";
import Colors from "../constants/Colors";
import Icon, { Icons } from "./Icons";
import DrawerItemList from "./DrawerItemList";

const constant = {
	SPACING: 16,
	borderRadius: 10,
	titleFontSize: 24,
	textFontSize: 16,
	subTextFontSize: 14,
};

const CustomDrawer = (props) => {
	const { state, descriptors, navigation } = props;
	const scrollRef = useRef(null);

	const drawerProgress = useDrawerProgress()

	const viewStyles = (type) =>
		useAnimatedStyle(() => {
			const val = type === "top" ? -100 : 100;
			const translateY = interpolate(drawerProgress.value, [0, 1], [val, 0]);
			const opacity = interpolate(drawerProgress.value, [0, 1], [0, 1]);
			return {
				transform: [{ translateY }],
				opacity,
			};
		});

	return (
		<View style={styles.container}>
			{/* header */}
			<Animated.View
				style={[styles.row, styles.view, styles.marginTop, viewStyles("top")]}
			>
				<View style={styles.iconContainer}>
					<Icon name="logo-electron" type={Icons.Ionicons} size={30} />
				</View>
				<Text style={styles.headerTitle}>Hello there👋</Text>
			</Animated.View>
			{/* Drawer List Item */}
			<DrawerContentScrollView
				ref={scrollRef}
				{...props}
				showsVerticalScrollIndicator={false}
			>
				<DrawerItemList {...props} styles={styles} />
			</DrawerContentScrollView>
		</View>
	);
};
export default CustomDrawer;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	view: {
		borderRadius: constant.borderRadius,
		marginHorizontal: constant.SPACING / 2,
		padding: constant.SPACING / 1.5,
	},
	marginTop: {
		marginTop: constant.SPACING / 2,
	},
	marginBottom: {
		marginBottom: constant.SPACING / 2,
	},
	marginVertical: {
		marginVertical: constant.SPACING / 2,
	},
	drawerItem: {
		flexDirection: "row",
		alignItems: "center",
		borderRadius: constant.borderRadius,
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
	},
	label: {
		fontSize: constant.textFontSize,
		color: Colors.white,
		paddingHorizontal: constant.SPACING,
	},
	notificationBadge: {
		paddingVertical: constant.SPACING / 5,
		paddingHorizontal: constant.SPACING / 2,
		borderRadius: constant.borderRadius / 2,
	},
	iconContainer: {
		padding: constant.SPACING / 2.4,
		borderRadius: constant.borderRadius,
		margin: constant.SPACING / 2,
		backgroundColor: Colors.primary,
	},
	separator: {
		width: "100%",
		height: 1,
		backgroundColor: Colors.darkGray,
		marginVertical: constant.SPACING / 2,
	},
	headerTitle: {
		fontSize: constant.titleFontSize,
		color: Colors.white,
	},
	profile: {
		marginVertical: constant.SPACING / 2,
		marginRight: constant.SPACING,
		marginLeft: constant.SPACING / 2,
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: Colors.light,
	},
	profileText: {
		color: Colors.white,
	},
});
