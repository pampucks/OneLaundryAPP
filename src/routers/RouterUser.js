import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ScreenUserLogin from "../screens/user/ScreenUserLogin";
import ScreenUserRegister from "../screens/user/ScreenUserRegister";
import ScreenUserSetting from "../screens/user/ScreenUserSetting";

const Stack = createNativeStackNavigator();

export const RouterUserNotAuthenticated = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ScreenUserLogin" component={ScreenUserLogin} />
      <Stack.Screen name="ScreenUserRegister" component={ScreenUserRegister} />
    </Stack.Navigator>
  );
};

export const RouterUserAuthenticated = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ScreenUserSetting" component={ScreenUserSetting} />
    </Stack.Navigator>
  );
};
