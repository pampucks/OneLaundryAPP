import _ from "lodash";
import { useEffect, useState } from "react";
import { ServiceBarangCreate } from "../../services/ServiceBarang";
import { Appbar, Button, TextInput } from "react-native-paper";
import SchemaBarang from "../../schema/SchemaBarang";
import WidgetBaseLoader from "../../widgets/base/WidgetBaseLoader";
import { SafeAreaView, ScrollView, View } from "react-native";

const ScreenBarangCreate = ({ navigation }) => {
  const [barang, setBarang] = useState(SchemaBarang);
  const [complete, setComplete] = useState(false);

  const handleInput = (name, value) => {
    setBarang((values) => ({ ...values, [name]: value }));
  };

  const barangCreate = () => {
    setComplete(false);
    const debounce = _.debounce(() => {
      ServiceBarangCreate(barang)
        .then(() => {
          navigation.goBack();
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => setComplete(true));
    }, 1000);
    debounce();
  };

  useEffect(() => {
    setComplete(false);
    const debounce = _.debounce(() => setComplete(true), 1000);
    debounce();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#7286d3" }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Tambah Barang" />
      </Appbar.Header>

      {complete && (
        <ScrollView
          style={{
            marginVertical: 24,
            marginHorizontal: 24,
          }}
        >
          <View style={{ gap: 24 }}>
            <TextInput
              // mode="outlined"
              value={barang.kode_barang || ""}
              onChangeText={(text) => handleInput("kode_barang", text)}
              label="Kode Barang"
            />

            <TextInput
              // mode="outlined"
              value={barang.nama_barang || ""}
              onChangeText={(text) => handleInput("nama_barang", text)}
              label="Nama Barang"
            />

            <TextInput
              value={`${barang.hargaSatuan || ""}`}
              onChangeText={(text) =>
                handleInput("hargaSatuan", parseInt(text))
              }
              returnKeyType={"next"}
              keyboardType={"numeric"}
              label="Harga Satuan"
            />

            <Button
              onPress={barangCreate}
              mode="contained"
              style={{ backgroundColor: "#3F3193" }}
            >
              Simpan
            </Button>
          </View>
        </ScrollView>
      )}

      <WidgetBaseLoader complete={complete} />
    </SafeAreaView>
  );
};

export default ScreenBarangCreate;
