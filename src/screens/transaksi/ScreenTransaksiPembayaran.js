import { useEffect, useMemo, useState } from "react";
import SchemaTransaksi from "../../schema/SchemaTransaksi";
import { Alert, SafeAreaView, ScrollView, View } from "react-native";
import {
  ServiceTransaksiCreate,
  ServiceTransaksiPrint,
} from "../../services/ServiceTransaksi";
import {
  Appbar,
  Button,
  DataTable,
  Divider,
  TextInput,
} from "react-native-paper";
import _ from "lodash";
import { SafeAreaProvider } from "react-native-safe-area-context";

const ScreenTransaksiPembayaran = ({ navigation }) => {
  const [transaksi, setTransaksi] = useState(SchemaTransaksi);
  const [complete, setComplete] = useState(false);
  const [daftarItemCucian, setDaftarItemCucian] = useState([]);

  const handleInput = (name, value) => {
    setTransaksi((values) => ({ ...values, [name]: value }));
  };

  const calculateSubtotal = useMemo(() => {
    const total = _.sumBy(daftarItemCucian, "total_harga");
    handleInput("total", total);
    return total;
  }, [daftarItemCucian]);

  const calculateBayar = useMemo(() => {
    const kembalian = transaksi.dibayar - calculateSubtotal;
    handleInput("kembali", kembalian);
    return kembalian;
  }, [transaksi.dibayar, daftarItemCucian]);

  const askShare = () => {
    const actions = [
      {
        text: "Ya",
        onPress: transaksiShare,
      },
      {
        text: "Batal",
        onPress: () => {},
        style: "cancel",
      },
    ];
    Alert.alert("Share faktur?", null, actions);
  };

  const transaksiPembayaran = () => {
    setComplete(false);

    const debounce = _.debounce(() => {
      item.kode_barang = barang.kode_barang;

      // const payload = {
      //   ...pembelian,
      //   items: [...daftarItemBeli],
      // };

      ServiceTransaksiCreate(payload)
        .then((data) => {
          // TODO: melakukan print/share data
          askShare();
        })
        .catch((error) => console.log(error))
        .finally(() => setComplete(true));
    }, 500);

    debounce();
  };

  const transaksiShare = () => {
    setComplete(false);

    const debounce = _.debounce(() => {
      ServiceTransaksiPrint(transaksi.no_faktur)
        .then(async (blob) => {
          ServiceBaseFileSharing("FAKTUR", blob);
          //clear
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
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#7286d3" }}>
        <Appbar.Header>
          <Appbar.BackAction
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Appbar.Content title="Bayar Cucian" />
        </Appbar.Header>

        <ScrollView
          style={{
            marginVertical: 24,
            marginHorizontal: 24,
          }}
          // contentContainerStyle={{ flex: 1, justifyContent: "center" }}
        >
          {/* <ScreenTransaksiStatusCucian onPress={openStatusCucian} />
        {transaksi.no_faktur && (
          <List.Item
        title={transaksi.nama_customer} */}
          {/* // description={transaksi.noTelepon}
          />
        )} */}
          {/* <Divider />
  
  <ScreenTransaksiPengembalian
  icon="hand-coin-outline"
  title="Pengembalian Barang"
  action={() => openPengembalian()}
  />
<Divider /> */}

          <DataTable>
            <DataTable.Row>
              <DataTable.Title>Total</DataTable.Title>
              <DataTable.Cell numeric>{transaksi.total || 0}</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Title>Kembalian</DataTable.Title>
              <DataTable.Cell numeric>{transaksi.kembali || 0}</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Title>Sisa</DataTable.Title>
              <DataTable.Cell numeric>{transaksi.sisa || 0}</DataTable.Cell>
            </DataTable.Row>
          </DataTable>

          <Divider />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 8,
            }}
          >
            <TextInput
              style={{ flex: 1 }}
              value={transaksi.berat || ""}
              onChangeText={() => {}}
              label="perkilo"
            />

            <TextInput
              style={{ flex: 1 }}
              value={transaksi.uang_muka || ""}
              onChangeText={() => {}}
              label="dibayar"
            />
          </View>

          {/* <View style={{ marginVertical: 16 }}>
          <TextInput
          label="Tanggal"
          editable={false}
          value={`${ServiceBaseHumanDate(transaksi.tanggal_terima) || ""}`}
          right={
            <TextInput.Icon
            onPress={() => setShowDatePicker(true)}
            icon="calendar"
            />
          }
          />
        </View>
        <Divider />
        {showDatePicker && (
          <DateTimePicker
          value={transaksi.tanggal_terima || new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(event, value) => handleInput("tanggal_terima", value)}
          />
        )} */}

          {/* <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 8,
          }}
          >
          <TextInput
          style={{ flex: 1 }}
          value={transaksi.alamat || ""}
          onChangeText={() => {}}
          label="Alamat"
          />
          
          <TextInput
          style={{ flex: 1 }}
          value={transaksi.no_hp || ""}
          onChangeText={() => {}}
          label="Nomor Telepon"
          />
        </View> */}

          <View style={{ marginHorizontal: 16, gap: 16, marginVertical: 24 }}>
            <Button onPress={transaksiPembayaran} mode="contained">
              Lanjut
            </Button>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ScreenTransaksiPembayaran;
