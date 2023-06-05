import { Image, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useFonts } from "expo-font";

const WidgetBaseLogo = () => {
  const [loaded] = useFonts({
    Josefin: require("../../../assets/fonts/JosefinSans-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../../assets/logo.png")}
      />
      <Text
        variant="titleMedium"
        style={{ fontFamily: "Josefin", color: "#fff" }}
      >
        ONE LAUNDRY
      </Text>
      <Text variant="bodySmall" style={{ color: "#f7f3ea" }}>
        By Kelompok 3 {new Date().getFullYear()}
      </Text>
    </View>
  );
};

export default WidgetBaseLogo;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  image: {
    resizeMode: "center",
    width: 160,
    height: 160,
    alignSelf: "center",
    marginBottom: 30,
    // borderRadius: 20,
    // backgroundColor: "#D3A03E",
  },
});
