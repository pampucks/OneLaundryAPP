import { useEffect, useState } from "react";
import { ServiceBaseIsDuplicateArray } from "../../services/ServiceBase";
import _ from "lodash";
import { Appbar, List, TextInput } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import WidgetBarangChoice from "../../widgets/barang/WidgetBarangChoice";

const ScreenTransaksiBarangChoice = ({ navigation }) => {
  const [daftarItemBeli, setDaftarItemBeli] = useState([]);
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

  const addOrUpdate = (item) => {
    const isDuplicate = ServiceBaseIsDuplicateArray(
      daftarItemBeli,
      item.kodeBarang,
      "kodeBarang"
    );

    if (isDuplicate) {
      update(item);
    } else {
      add(item);
    }
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
          description={`${barang.hargaBeli}`}
          right={(props) => (
            <>
              <TextInput
                mode="outlined"
                value={`${barang.jumlahBeli || ""}`}
                onChangeText={(text) =>
                  handleInputItemBeli(index, text, barang)
                }
              />
            </>
          )}
        />
      ))}
    </SafeAreaProvider>
  );
};

export default ScreenTransaksiBarangChoice;
