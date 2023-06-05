import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";

import WidgetBaseLogo from "../../widgets/base/WidgetBaseLogo";
import { Button } from "react-native-paper";

export default ScreenHome = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <WidgetBaseLogo />

      <Button
        onPress={() => {
          navigation.navigate("ScreenBarangList");
        }}
        mode="contained"
        style={{ backgroundColor: "#B2A4FF" }}
      >
        Barang
      </Button>
      <Button
        onPress={() => {
          //   navigation.navigate("ScreenTransaksiCreate");
        }}
        mode="contained"
        style={{ backgroundColor: "#E8AA42" }}
      >
        Transaksi
      </Button>
      <Button
        onPress={() => {
          //   navigation.navigate("ScreenLaporan");
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
