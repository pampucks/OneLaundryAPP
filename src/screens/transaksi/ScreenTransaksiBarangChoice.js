import { useEffect, useState } from "react";
import { ServiceBaseIsDuplicateArray } from "../../services/ServiceBase";
import _ from "lodash";
import { Appbar, List, TextInput } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import WidgetBarangChoice from "../../widgets/barang/WidgetBarangChoice";
import { ServiceTransaksiCreate } from "../../services/ServiceTransaksi";

const ScreenTransaksiBarangChoice = ({ navigation }) => {
  const [daftarItemCucian, setDaftarItemCucian] = useState([]);
  const [complete, setComplete] = useState(false);

  const handleInputItemBeli = (index, value, item) => {
    setDaftarItemBeli((values) => {
      const qty = parseInt(value);
      const items = [...values];

      if (qty === 0) {
        items.splice(index, 1);
      }

      return items;
    });
  };

  const update = (item) => {
    const debounce = _.debounce(() => {
      setDaftarItemCucian((values) => {
        const items = [...values];
        const b = items.find((value) => value.kode_barang === item.kode_barang);
        const i = items.findIndex(
          (value) => value.kode_barang === item.kode_barang
        );

        return items;
      });
    }, 100);
  };

  const addOrUpdate = (item) => {
    const isDuplicate = ServiceBaseIsDuplicateArray(
      daftarItemCucian,
      item.kode_barang,
      "kode_barang"
    );

    if (isDuplicate) {
      update(item);
    } else {
      add(item);
    }
  };

  const barangChoice = () => {
    setComplete(false);

    const debounce = _.debounce(() => {
      item.kode_barang = barang.kode_barang;

      const payload = {
        ...item,
        items: [...daftarItemCucian],
      };
      ServiceTransaksiCreate(payload)
        .then(() => {
          navigation.navigate("ScreenTransaksiPembayaran");
        })
        .catch((error) => console.log(error))
        .finally(() => setComplete(true));
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
    <SafeAreaProvider style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title="Input Barang Transaksi" />
      </Appbar.Header>
      <WidgetBarangChoice onPress={addOrUpdate} />
      {daftarItemBeli.map((barang, index) => (
        <List.Item
          key={index}
          title={`${barang.namaBarang} #${barang.kodeBarang}`}
          right={(props) => (
            <>
              <TextInput
                mode="outlined"
                onChangeText={(text) =>
                  handleInputItemBeli(index, text, barang)
                }
              />
            </>
          )}
        />
      ))}

      <View style={{ marginHorizontal: 16, gap: 16, marginVertical: 24 }}>
        <Button onPress={barangChoice} mode="contained">
          Lanjut
        </Button>
      </View>
    </SafeAreaProvider>
  );
};

export default ScreenTransaksiBarangChoice;
