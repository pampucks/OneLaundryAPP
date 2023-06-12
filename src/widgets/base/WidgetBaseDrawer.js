import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import { useHookUserAuthenticationInterface } from "../../hooks/HookUser";
import { ContextUserAuthentication } from "../../contexts/ContextUser";
import { Text } from "react-native";
import WidgetBaseSidebar from "./WidgetBaseSidebar";
import {
  RouterUserAuthenticated,
  RouterUserNotAuthenticated,
} from "../../routers/RouterUser";
import { RouterBarangAuthenticated } from "../../routers/RouterBarang";
import { RouterHomeAuthenticated } from "../../routers/RouterHome";
import { RouterTransaksiAuthenticated } from "../../routers/RouterTransaksi";
import { RouterLaporanAuthenticated } from "../../routers/RouterLaporan";

const Drawer = createDrawerNavigator();

const ScreenContoh = () => {
  const [, setIsAuthenticated] = React.useContext(ContextUserAuthentication);
  return (
    <Text style={{ marginTop: 40 }} onPress={() => setIsAuthenticated(false)}>
      Hello Ini sudah login
    </Text>
  );
};

export default function WidgetBaseDrawer() {
  const [isAuthenticated, setIsAuthenticated] =
    useHookUserAuthenticationInterface();
  return (
    <ContextUserAuthentication.Provider
      value={[isAuthenticated, setIsAuthenticated]}
    >
      <NavigationContainer>
        <Drawer.Navigator
          screenOptions={{ headerShown: false }}
          drawerContent={(props) => <WidgetBaseSidebar {...props} />}
          initialRouteName="Home"
        >
          {!isAuthenticated && (
            <>
              <Drawer.Screen
                options={{
                  drawerLabel: "Login",
                }}
                name="RouterUser"
                component={RouterUserNotAuthenticated}
              />
            </>
          )}

          {isAuthenticated && (
            <>
              <Drawer.Screen
                options={{
                  drawerLabel: "Home",
                }}
                name="RouterHome"
                component={RouterHomeAuthenticated}
              />
              <Drawer.Screen
                options={{
                  drawerLabel: "Barang",
                }}
                name="RouterBarang"
                component={RouterBarangAuthenticated}
              />
              <Drawer.Screen
                options={{
                  drawerLabel: "Transaksi",
                }}
                name="RouterTransaksi"
                component={RouterTransaksiAuthenticated}
              />
              {/* <Drawer.Screen
                options={{
                  drawerLabel: "Laporan",
                }}
                name="RouterLaporan"
                component={RouterLaporanAuthenticated}
              /> */}
              <Drawer.Screen
                options={{
                  drawerLabel: "Settings",
                }}
                name="RouterUser"
                component={RouterUserAuthenticated}
              />
            </>
          )}
        </Drawer.Navigator>
      </NavigationContainer>
    </ContextUserAuthentication.Provider>
  );
}
