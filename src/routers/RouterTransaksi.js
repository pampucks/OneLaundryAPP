import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ScreenTransaksiCreate from "../screens/transaksi/ScreenTransaksiCreate";

const Stack = createNativeStackNavigator();

export const RouterTransaksiAuthenticated = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="ScreenTransaksiCreate"
        component={ScreenTransaksiCreate}
      />
      {/* <Stack.Screen
        name="ScreenTransaksiBarangChoice"
        component={ScreenTransaksiBarangChoice}
      />
      <Stack.Screen
        name="ScreenTransaksiPembayaran"
        component={ScreenTransaksiPembayaran}
      />
      <Stack.Screen
        name="ScreenTransaksiStatusCucian"
        component={ScreenTransaksiStatusCucian}
      />
      <Stack.Screen
        name="ScreenTransaksiPengembalian"
        component={ScreenTransaksiPengembalian}
      /> */}
    </Stack.Navigator>
  );
};
