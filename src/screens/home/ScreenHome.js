import React, { useContext } from "react";
import { SafeAreaView, StyleSheet } from "react-native";

import WidgetBaseLogo from "../../widgets/base/WidgetBaseLogo";
import { Button } from "react-native-paper";
import { ContextUserAuthentication } from "../../contexts/ContextUser";

const ScreenHome = ({ navigation }) => {
  const [, setIsAuthenticated] = useContext(ContextUserAuthentication);
  return (
    <SafeAreaView style={styles.container}>
      <WidgetBaseLogo />

      <Button
        onPress={() => {
          setIsAuthenticated(true);
          navigation.navigate("RouterBarang", { screen: "ScreenBarangList" });
        }}
        mode="contained"
        style={{ backgroundColor: "#B2A4FF" }}
      >
        Barang
      </Button>
      <Button
        onPress={() => {
          setIsAuthenticated(true);
          navigation.navigate("RouterTransaksi", {
            screen: "ScreenTransaksiCreate",
          });
        }}
        mode="contained"
        style={{ backgroundColor: "#E8AA42" }}
      >
        Transaksi
      </Button>
      <Button
        onPress={() => {
          // setIsAuthenticated(true);
          // navigation.navigate("RouterLaporan", {screen: "ScreenLaporan"});
        }}
        mode="contained"
        style={{ backgroundColor: "#57C5B6" }}
      >
        Laporan
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    // marginVertical: 30,
    backgroundColor: "#7286d3",
  },
  container: {
    flex: 1,
    backgroundColor: "#7286d3",
    gap: 16,
    // marginHorizontal: 40,
    paddingHorizontal: 50,
    justifyContent: "center",
    height: "100%",
    // width: "100%",
  },
});

export default ScreenHome;
