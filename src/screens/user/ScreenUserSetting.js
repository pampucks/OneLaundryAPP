import { useContext, useState } from "react";
import { ContextUserAuthentication } from "../../contexts/ContextUser";
import {
  SafeAreaView,
  ScrollView,
  ScrollViewBase,
  StyleSheet,
} from "react-native";
import { Appbar, List } from "react-native-paper";

const ScreenUserSetting = ({ navigation }) => {
  const [complete, setComplete] = useState(false);
  const [, setIsAuthenticated] = useContext(ContextUserAuthentication);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#7286d3" }}>
      <Appbar.Header>
        <Appbar.Action
          icon="menu"
          onPress={() => {
            navigation.toggleDrawer();
          }}
        />
        <Appbar.Content title="Settings" />
      </Appbar.Header>

      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        <List.Item
          style={styles.border}
          onPress={() => {
            setIsAuthenticated(false);
            navigation.navigate("RouterUser", { screen: "ScreenUserLogin" });
          }}
          title="Logout"
          description="Logout app"
          left={(props) => <List.Icon {...props} icon="logout-variant" />}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ScreenUserSetting;

const styles = StyleSheet.create({
  border: {
    borderColor: "#000",
    borderWidth: 1,
    width: "35%",
    backgroundColor: "#9BA4B5",
    borderBottomRightRadius: 10,
  },
});
