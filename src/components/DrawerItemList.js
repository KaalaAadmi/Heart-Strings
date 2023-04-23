import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "./Icons";
import Colors from "../constants/Colors";

const DrawerItem = ({
  label,
  onPress,
  tabBarTestID,
  type,
  name,
  activeItemColor,
  styles,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      testID={tabBarTestID}
      accessibilityRole="button"
      style={[styles.drawerItem, { backgroundColor: activeItemColor }]}
    >
      <View style={styles.iconContainer}>
        <Icon type={type} name={name} color={Colors.white} />
      </View>
        <Text style={[styles.label]}>{label}</Text>
    </TouchableOpacity>
  );
};

const DrawerItemList = ({ state, descriptors, navigation, styles }) => {
  return (
    <View style={styles.view}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const { options } = descriptors[route.key];

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const drawerItem = options.item;
        const activeItemColor = isFocused ? Colors.primary : null;

        return (
          <DrawerItem
            key={index}
            label={drawerItem.label}
            tabBarTestID={options.tabBarTestID}
            onPress={onPress}
            name={drawerItem.icon}
            type={drawerItem.type}
            activeItemColor={activeItemColor}
            styles={styles}
          />
        );
      })}
    </View>
  );
};

export default DrawerItemList;

const styles = StyleSheet.create({});
