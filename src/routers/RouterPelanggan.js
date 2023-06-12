import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ScreenPelangganList from "../screens/pelanggan/ScreenPelangganList";
import ScreenPelangganCreate from "../screens/pelanggan/ScreenPelangganCreate";
import ScreenPelangganEdit from "../screens/pelanggan/ScreenPelangganEdit";

const Stack = createNativeStackNavigator();

export const RouterPelangganAuthenticated = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="ScreenPelangganList"
        component={ScreenPelangganList}
      />
      <Stack.Screen
        name="ScreenPelangganCreate"
        component={ScreenPelangganCreate}
      />
      <Stack.Screen
        name="ScreenPelangganEdit"
        component={ScreenPelangganEdit}
      />
    </Stack.Navigator>
  );
};
