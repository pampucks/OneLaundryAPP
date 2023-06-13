import _ from "lodash";
import { useContext, useEffect, useState } from "react";
import { Alert, SafeAreaView } from "react-native";
import { ScrollView } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import WidgetBaseLogo from "../../widgets/base/WidgetBaseLogo";
import { ServiceUserLogin } from "../../services/ServiceUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WidgetBaseLoader from "../../widgets/base/WidgetBaseLoader";
import { ContextUserAuthentication } from "../../contexts/ContextUser";
import { color } from "react-native-reanimated";

const ScreenUserLogin = ({ navigation }) => {
  const [, setIsAuthenticated] = useContext(ContextUserAuthentication);

  const [user, setUser] = useState({ email: "", password: "" }); // TODO: add schema user
  const [complete, setComplete] = useState(false);

  const handleChange = (name, value) => {
    setUser((values) => ({ ...values, [name]: value }));
  };

  const userLogin = () => {
    setComplete(false);
    const debounce = _.debounce(() => {
      ServiceUserLogin(user)
        .then(async (token) => {
          await AsyncStorage.setItem("@token", token);
          Alert.alert("Berhasil", "Anda berhasil login.");
          setIsAuthenticated(true);
          navigation.navigate("RouterHome");
        })
        .catch((error) => console.log(error))
        .finally(() => {
          setComplete(true);
        });
    }, 500);

    debounce();
  };

  useEffect(() => {
    setComplete(false);
    const debounce = _.debounce(() => {
      setComplete(true);
    }, 500);

    debounce();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#7286d3" }}>
      {complete && (
        <ScrollView
          contentContainerStyle={{
            gap: 16,
            marginHorizontal: 40,
            justifyContent: "center",
            height: "100%",
          }}
        >
          <WidgetBaseLogo />
          <TextInput
            // mode="outlined"
            label="Email"
            placeholder="Masukan email"
            value={user.email}
            onChangeText={(text) => handleChange("email", text)}
          />
          <TextInput
            // mode="outlined"
            label="Password"
            value={user.password}
            secureTextEntry={true}
            onChangeText={(text) => handleChange("password", text)}
          />
          <Button
            onPress={userLogin}
            mode="contained"
            style={{ backgroundColor: "#B2A4FF" }}
          >
            Login
          </Button>
          <Button
            onPress={() => {
              navigation.navigate("ScreenUserRegister");
            }}
            mode="contained"
            style={{ backgroundColor: "#57C5B6" }}
          >
            Register
          </Button>
        </ScrollView>
      )}

      <WidgetBaseLoader complete={complete} />
    </SafeAreaView>
  );
};

export default ScreenUserLogin;
