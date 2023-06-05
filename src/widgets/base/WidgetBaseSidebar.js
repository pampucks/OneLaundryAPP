import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Image, SafeAreaView, StyleSheet, Text } from "react-native";
import { Divider, MD2Colors } from "react-native-paper";
import { useFonts } from "expo-font";

const WidgetBaseSidebar = (props) => {
  //   const imageDrawer = "../../../assets/drawer.png";

  const [loaded] = useFonts({
    Josefin: require("../../../assets/fonts/JosefinSans-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Image
        style={styles.imageLogo}
        source={require("../../../assets/drawer.png")}
      />
      <Text style={styles.title}>ONE LAUNDRY</Text>
      <Divider />
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <Divider />
      <Text style={styles.copyright}>
        Kelompok 3 © {new Date().getFullYear()}
      </Text>
    </SafeAreaView>
  );
};

export default WidgetBaseSidebar;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    marginTop: 0,
  },

  imageLogo: {
    resizeMode: "center",
    width: "100%",
    height: "30%",
    alignSelf: "center",
    backgroundColor: "#7286D3",
  },
  title: {
    // fontWeight: "bold",
    textAlign: "center",
    // paddingVertical: 20,
    marginVertical: 20,
    fontSize: 16,
    color: "#7286D3",
    fontFamily: "Josefin",
    backgroundColor: "#fff",
  },
  copyright: {
    // fontWeight: "bold",
    fontSize: 13,
    textAlign: "center",
    color: "#fff",
    paddingVertical: 16,
    fontFamily: "Josefin",
    backgroundColor: "#000",
  },
});
