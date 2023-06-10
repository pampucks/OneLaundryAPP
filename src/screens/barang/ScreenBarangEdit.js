import { useEffect, useState } from "react";
import { Appbar, Button, TextInput } from "react-native-paper";
import {
  ServiceBarangDelete,
  ServiceBarangEdit,
} from "../../services/ServiceBarang";
import { Alert, SafeAreaView, View } from "react-native";
import _ from "lodash";
import WidgetBaseLoader from "../../widgets/base/WidgetBaseLoader";
import { ScrollView } from "react-native-gesture-handler";

const ScreenBarangEdit = ({ navigation, route }) => {
  const [complete, setComplete] = useState(false);
  const [barang, setBarang] = useState({});

  const handleInput = (name, value) => {
    setBarang((values) => ({ ...values, [name]: value }));
  };

  const barangEdit = () => {
    setComplete(false);
    const debounce = _.debounce(() => {
      ServiceBarangEdit(barang)
        .then(() => {
          Alert.alert("Notifikasi", "Berhasil");
          navigation.goBack();
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => setComplete(true));
    }, 1000);

    debounce();
  };

  const askDelete = () => {
    const actions = [
      {
        text: "Ya",
        onPress: () => barangDelete(),
      },
      {
        text: "Batal",
        style: "cancel",
      },
    ];

    Alert.alert("Konfirmasi", "Ingin dihapus?", actions);
  };

  const barangDelete = () => {
    const debounce = _.debounce(() => {
      ServiceBarangDelete(barang.kode_barang)
        .then(() => {
          Alert.alert("Notifikasi", "Berhasil");
          navigation.goBack();
        })
        .catch((error) => {
          console.log(error);
        });
    }, 100);

    debounce();
  };

  useEffect(() => {
    setComplete(false);
    const debounce = _.debounce(() => {
      setBarang(route.params.barang);
      setComplete(true);
    }, 1000);
    debounce();
  }, [route.params.barang]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#7286d3" }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Edit Barang" />
        <Appbar.Action icon="trash-can-outline" onPress={askDelete} />
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
              value={barang.kode_barang || ""}
              onChangeText={(text) => handleInput("kode_barang", text)}
              label="Kode Barang"
              disabled
            />
            <TextInput
              value={barang.nama_barang || ""}
              onChangeText={(text) => handleInput("nama_barang", text)}
              label="Nama Barang"
            />

            <Button
              onPress={barangEdit}
              mode="contained"
              style={{ backgroundColor: "#3F3193" }}
            >
              Simpan Perubahan
            </Button>
          </View>
        </ScrollView>
      )}
      <WidgetBaseLoader complete={complete} />
    </SafeAreaView>
  );
};

export default ScreenBarangEdit;
