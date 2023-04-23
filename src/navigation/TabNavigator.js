import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
} from "react-native";
import Icon, { Icons } from "../components/Icons";
import Colors from "../constants/Colors";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DailyPrompts from "../screens/DailyPrompts";
import MilestoneTracker from "../screens/MilestoneTracker";
import Messages from "../screens/Messages";
import Calendar from "../screens/Calendar";
import DrawerNavigator from "./DrawerNavigator";

// Contains the screens in the bottom tab navigator
const TabArr = [
  {
    route: "Prompts",
    label: "Prompts",
    type: Icons.MaterialCommunityIcons,
    activeIcon: "thought-bubble",
    inActiveIcon: "thought-bubble-outline",
    component: DrawerNavigator,
    tabBarColor: Colors.lightRed,
  },
  {
    route: "Milestones",
    label: "Milestones",
    type: Icons.Ionicons,
    activeIcon: "ios-trophy",
    inActiveIcon: "ios-trophy-outline",
    component: MilestoneTracker,
    tabBarColor: Colors.lightRed,
  },
  {
    route: "Messages",
    label: "Messages",
    type: Icons.Ionicons,
    activeIcon: "chatbubbles",
    inActiveIcon: "chatbubbles-outline",
    component: Messages,
    tabBarColor: Colors.lightRed,
  },
  {
    route: "Calendar",
    label: "Calendar",
    type: Icons.MaterialCommunityIcons,
    activeIcon: "calendar-heart",
    inActiveIcon: "calendar-heart",
    component: Calendar,
    tabBarColor: Colors.lightRed,
  },
];

// Constants for the animations of the circle
const { width } = Dimensions.get("window");
const MARGIN = 16;
const TAB_BAR_WIDTH = width - 2 * MARGIN;
const TAB_WIDTH = TAB_BAR_WIDTH / TabArr.length;

// Contains the sliding circle
const MyTabBar=({ state, descriptors, navigation })=> {
  const [translateX] = useState(new Animated.Value(0));
  const translateTab = (index) => {
    Animated.spring(translateX, {
      toValue: index * TAB_WIDTH,
      useNativeDriver: true,
    }).start();
  };
  useEffect(() => {
    translateTab(state.index);
  }, [state.index]);
  return (
    <View style={styles.tabBarContainer}>
      <View style={styles.slidingTabContainer}>
        <Animated.View
          style={[
            styles.slidingTab,
            {
              transform: [{ translateX }],
              backgroundColor: TabArr[state.index].tabBarColor,
            },
          ]}
        />
      </View>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
            // :""

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        // console.log("=============================================");
        // console.log(options);
        // console.log("=============================================");
        const tabBarIcon = options.tabBarIcon;
        return (
          <TouchableOpacity
          key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, alignItems: "center" }}
          >
            <TabIcon
              tabIcon={tabBarIcon}
              isFocused={isFocused}
              label={label}
              index={state.index}
              tabColor={options.tabColor}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

// Generating the Tab Icons
const TabIcon = ({ isFocused, tabIcon, label, tabColor }) => {
  const [translateY] = useState(new Animated.Value(0));
  const translateIcon = (val) => {
    Animated.spring(translateY, {
      toValue: val,
      useNativeDriver: true,
    }).start();
  };
  useEffect(() => {
    if (isFocused) {
      translateIcon(-14); //moves up
    } else {
      translateIcon(0); //centered
    }
  }, [isFocused]);
  return (
    <>
      <Animated.View style={{ transform: [{ translateY }] }}>
        <Icon
          name={isFocused ? tabIcon.activeIcon : tabIcon.inActiveIcon}
          type={tabIcon.type}
          size={24}
          color={isFocused ? Colors.white : tabColor}
        />
      </Animated.View>
      <Text style={{ color: isFocused ? tabColor : Colors.white }}>
        {label}
      </Text>
    </>
  );
};

const Tab = createBottomTabNavigator();

// Rendering the Tab Navigator
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <MyTabBar {...props} />}
    >
      {TabArr.map((_, index) => {
        return (
          <Tab.Screen
            key={index}
            name={_.route}
            component={_.component}
            options={{
              tabBarColor: _.tabBarColor,
              tabColor: _.tabBarColor,
              tabBarIcon: {
                activeIcon: _.activeIcon,
                inActiveIcon: _.inActiveIcon,
                type: _.type,
              },
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

// Styling of the tab bar
const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: "row",
    width: TAB_BAR_WIDTH,
    height: 60,
    position: "absolute",
    alignSelf: "center",
    bottom: MARGIN,
    backgroundColor: Colors.tab,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-around",
  },
  slidingTabContainer: {
    width: TAB_WIDTH,
    ...StyleSheet.absoluteFillObject,
    background: Colors.fill,
    alignItems: "center",
  },
  slidingTab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    bottom: 25,
    borderWidth: 4,
    borderColor: Colors.white,
  },
});

export default TabNavigator;
