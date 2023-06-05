import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ScreenHome from "../screens/home/ScreenHome";

const Stack = createNativeStackNavigator();

export const RouterHomeAuthenticated = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ScreenHome" component={ScreenHome} />
    </Stack.Navigator>
  );
};
