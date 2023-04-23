import { createDrawerNavigator } from "@react-navigation/drawer";
import DailyPrompts from "../screens/DailyPrompts";
import Test from "../screens/Test";
import { Icons } from "../components/Icons";
import CustomDrawer from "../components/CustomDrawer";
import { Platform, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import Profile from "../screens/Profile";

const Drawer = createDrawerNavigator();
const ScreensArray = [
	{
		route: "Prompt",
		label: "Prompt",
		type: Icons.Feather,
		icon: "home",
		component: DailyPrompts,
	},
	{
		route: "Profile",
		label: "Profile",
		type: Icons.Feather,
		icon: "user",
		component: Profile,
	},
	{
		route: "Test",
		label: "Test",
		type: Icons.Feather,
		icon: "inbox",
		component: Test,
	},
];
const DrawerNavigator = () => {
	return (
		<Drawer.Navigator
			drawerContent={(props) => <CustomDrawer {...props} />}
			screenOptions={{
				drawerStyle: styles.drawerStyles,
				drawerType: "slide",
				overlayColor: "transparent",
				swipeEdgeWidth: Platform.OS === "android" && 180,
				sceneContainerStyle: styles.sceneStyles,
				headerShown: false,
			}}
		>
			{ScreensArray.map((_, index) => (
				<Drawer.Screen
					key={index}
					name={_.route}
					component={_.component}
					options={{ item: _ }}
				/>
			))}
		</Drawer.Navigator>
	);
};

export default DrawerNavigator;
const styles = StyleSheet.create({
	drawerStyles: {
		width: 220,
		backgroundColor: Colors.fill,
		paddingTop: 40,
	},
	sceneStyles: {
		backgroundColor: Colors.fill,
	},
});
