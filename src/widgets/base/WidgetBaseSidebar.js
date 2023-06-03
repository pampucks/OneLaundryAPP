import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Image, SafeAreaView, StyleSheet, Text } from "react-native";
import { Divider, MD2Colors } from "react-native-paper";

const WidgetBaseSidebar = (props) => {
  //   const imageDrawer = "../../../assets/drawer.png";

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Image
        style={styles.imageLogo}
        source={require("../../../assets/drawer.png")}
      />
      <Text style={styles.title}>ONE LAUNDRY</Text>

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
    height: "20%",
    alignSelf: "center",
    backgroundColor: "#E1965F",
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 20,
    fontSize: 16,
    backgroundColor: "#E1965F",
  },
  copyright: {
    fontSize: 16,
    textAlign: "center",
    color: "gray",
    paddingVertical: 16,
  },
});
