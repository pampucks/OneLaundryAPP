import _ from "lodash";
import { useEffect, useState } from "react";
import { ServicePelangganCreate } from "../../services/ServicePelanggan";
import { Appbar, Button, TextInput } from "react-native-paper";
import SchemaPelanggan from "../../schema/SchemaPelanggan";
import WidgetBaseLoader from "../../widgets/base/WidgetBaseLoader";
import { SafeAreaView, ScrollView, View } from "react-native";

const ScreenPelangganCreate = ({ navigation }) => {
  const [pelanggan, setPelanggan] = useState(SchemaPelanggan);
  const [complete, setComplete] = useState(false);

  const handleInput = (name, value) => {
    setPelanggan((values) => ({ ...values, [name]: value }));
  };

  const pelangganCreate = () => {
    setComplete(false);
    const debounce = _.debounce(() => {
      ServicePelangganCreate(pelanggan)
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
        <Appbar.Content title="Tambah Pelanggan" />
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
              value={pelanggan.kode_pelanggan || ""}
              onChangeText={(text) => handleInput("kode_pelanggan", text)}
              label="Kode Pelanggan"
            />

            <TextInput
              value={pelanggan.nama_pelanggan || ""}
              onChangeText={(text) => handleInput("nama_pelanggan", text)}
              label="Nama Pelanggan"
            />

            <TextInput
              value={pelanggan.alamat_pelanggan || ""}
              onChangeText={(text) => handleInput("alamat_pelanggan", text)}
              label="Alamat Pelanggan"
            />

            <TextInput
              value={pelanggan.telepon_pelanggan || ""}
              onChangeText={(text) => handleInput("telepon_pelanggan", text)}
              label="Telepon Pelanggan"
            />

            {/* <TextInput
              value={`${pemasok.hargaBeli || ""}`}
              onChangeText={(text) => handleInput("hargaBeli", parseInt(text))}
              returnKeyType={"next"}
              keyboardType={"numeric"}
              label="Harga Beli"
            />

            <TextInput
              value={`${pemasok.hargaJual || ""}`}
              onChangeText={(text) => handleInput("hargaJual", parseInt(text))}
              returnKeyType={"next"}
              keyboardType={"numeric"}
              label="Harga Jual"
            />

            <TextInput
              value={`${pemasok.jumlahPemasok || ""}`}
              onChangeText={(text) =>
                handleInput("jumlahPemasok", parseInt(text))
              }
              keyboardType={"numeric"}
              label="Jumlah Pemasok"
            /> */}
            <Button
              onPress={pelangganCreate}
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

export default ScreenPelangganCreate;
