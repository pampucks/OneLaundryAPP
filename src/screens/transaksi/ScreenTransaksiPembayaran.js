import { useEffect, useState } from "react";
import SchemaTransaksi from "../../schema/SchemaTransaksi";
import { Alert, SafeAreaView } from "react-native";
import { ServiceTransaksiPrint } from "../../services/ServiceTransaksi";
import { Appbar } from "react-native-paper";

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
    const kembalian = pembelian.dibayar - calculateSubtotal;
    handleInput("kembali", kembalian);
    return kembalian;
  }, [pembelian.dibayar, daftarItemCucian]);

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
      pembelian.kodePemasok = pemasok.kodePemasok;

      const payload = {
        ...pembelian,
        items: [...daftarItemBeli],
      };

      ServicePembelianCreate(payload)
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
      ServiceTransaksiPrint(pembelian.faktur)
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

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 8,
          }}
        >
          <TextInput
            style={{ flex: 1 }}
            value={transaksi.no_faktur || ""}
            onChangeText={() => {}}
            label="Nomor Faktur"
          />

          <TextInput
            style={{ flex: 1 }}
            value={transaksi.nama_customer || ""}
            onChangeText={() => {}}
            label="Nama Pelanggan"
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

        <View
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
        </View>

        <View style={{ marginHorizontal: 16, gap: 16, marginVertical: 24 }}>
          <Button onPress={transaksiCreate} mode="contained">
            Lanjut
          </Button>

          {/* <Button
            mode="constained"
            onPress={() => {
              setIsAuthenticated(false);
              navigation.navigate("RouterTransaksi", {
                screen: "ScreenTransaksiStatusCucian",
              });
            }}
          >
            Status Cucian
          </Button> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ScreenTransaksiPembayaran;
