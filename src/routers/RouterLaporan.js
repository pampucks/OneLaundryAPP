import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ScreenLaporanTransaksi from "../screens/laporan/ScreenLaporanTransaksi";

const Stack = createNativeStackNavigator();

export const RouterLaporanAuthenticated = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="ScreenLaporanTransaksi"
        component={ScreenLaporanTransaksi}
      />
    </Stack.Navigator>
  );
};
