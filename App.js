import "react-native-gesture-handler";

import * as React from "react";
import { Button, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import ScreenUserLogin from "./src/screens/user/ScreenUserLogin";
import { RouterUserNotAuthenticated } from "./src/routers/RouterUser";
import WidgetBaseSidebar from "./src/widgets/base/WidgetBaseSidebar";
import WidgetBaseDrawer from "./src/widgets/base/WidgetBaseDrawer";

const Drawer = createDrawerNavigator();

export default function App() {
  return <WidgetBaseDrawer />;
}
