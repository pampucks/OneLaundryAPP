import _ from "lodash";
import {
  memo,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import SchemaTransaksi from "../../schema/SchemaTransaksi";
import {
  Appbar,
  Button,
  DataTable,
  Divider,
  List,
  TextInput,
} from "react-native-paper";
import { SafeAreaView, ScrollView, View } from "react-native";
import WidgetBaseLoader from "../../widgets/base/WidgetBaseLoader";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  ServiceBaseHumanDate,
  ServiceBaseHumanCurrency,
  ServiceBaseRandomID,
  ServiceBaseIsDuplicateArray,
} from "../../services/ServiceBase";
import { ServiceTransaksiCreate } from "../../services/ServiceTransaksi";
import { ContextUserAuthentication } from "../../contexts/ContextUser";
import ScreenTransaksiStatusCucian from "./ScreenTransaksiStatusCucian";
import ScreenTransaksiPengembalian from "./ScreenTransaksiPengembalian";
import WidgetBarangChoice from "../../widgets/barang/WidgetBarangChoice";
import SchemaPelanggan from "../../schema/SchemaPelanggan";

const ScreenTransaksiCreate = memo(({ navigation }) => {
  const [transaksi, setTransaksi] = useState(SchemaTransaksi);
  const [complete, setComplete] = useState(false);
  const [daftarItemBeli, setDaftarItemBeli] = useState([]);
  const [pelanggan, setPelanggan] = useState(SchemaPelanggan);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [cucian, setCucian] = useState({});
  const [, setIsAuthenticated] = useContext(ContextUserAuthentication);
  const [pengembalian, setPengembalian] = useState();

  const handleInput = (name, value) => {
    if (name === "tanggal_terima") setShowDatePicker(false);
    setTransaksi((values) => ({ ...values, [name]: value }));
  };

  const randomFaktur = () => {
    handleInput("no_faktur", ServiceBaseRandomID("tx"));
  };

  const handleInputItemBeli = (index, value, item) => {
    setDaftarItemBeli((values) => {
      const qty = parseInt(value);
      const items = [...values];

      if (qty === 0) {
        items.splice(index, 1);
      } else {
        items[index].qty = qty;
        // items[index].subtotal = item.jumlah_beli * item.hargaBeli;
      }

      return items;
    });
  };

  const addOrUpdate = useCallback(
    (item) => {
      const isDuplicate = ServiceBaseIsDuplicateArray(
        daftarItemBeli,
        item.kode_barang,
        "kode_barang"
      );
      if (isDuplicate) {
        update(item);
      } else {
        add(item);
      }
    },
    [daftarItemBeli]
  );

  const add = (item) => {
    setTimeout(() => {
      const payload = {
        kode_barang: item.kode_barang,
        nama_barang: item.nama_barang,
        // hargaBeli: item.hargaBeli,
        // jumlahBeli: 1,
        // subtotal: 1 * item.hargaBeli,
      };

      setDaftarItemBeli((values) => [...values, payload]);
    }, 100);
  };

  const update = (item) => {
    setTimeout(() => {
      setDaftarItemBeli((values) => {
        const items = [...values];
        const b = items.find((value) => value.kode_barang === item.kode_barang);
        const i = items.findIndex(
          (value) => value.kode_barang === item.kode_barang
        );
        b.qty = b.qty + 1;
        // b.subtotal = b.jumlahBeli * b.hargaBeli;
        items[i] = b;
        return items;
      });
    }, 100);
  };

  const transaksiCreate = () => {
    setComplete(false);

    const debounce = _.debounce(() => {
      transaksi.kode_pemasok = pelanggan.kode_pelanggan;

      const payload = {
        ...transaksi,
        items: [...daftarItemTransaksi],
      };

      setComplete(false);

      ServiceTransaksiCreate(payload)
        .then((data) => {
          // navigation.navigate("ScreenTransaksiBarangChoice");
          askShare();
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => setComplete(true));
    }, 1000);

    debounce();
  };

  const openStatusCucian = _.debounce((item) => {
    setCucian(item);
    setIsAuthenticated(false);
    navigation.navigate("RouterTransaksi", {
      screen: "ScreenTransaksiStatusCucian",
    });
  }, 100);

  const openPengembalian = _.debounce(() => {
    setPengembalian();
    setIsAuthenticated(false);
    navigation.navigate("RouterTransaksi", {
      screen: "ScreenTransaksiPengembalian",
    });
  }, 100);

  useEffect(() => {
    setComplete(false);
    const debounce = _.debounce(() => setComplete(true), 1000);
    debounce();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#7286d3" }}>
      <Appbar.Header>
        <Appbar.Action
          icon="menu"
          onPress={() => {
            navigation.toggleDrawer();
          }}
        />
        <Appbar.Content title="Buat Transaksi" />
      </Appbar.Header>
      {complete && (
        <ScrollView
          style={{
            marginVertical: 24,
            marginHorizontal: 24,
          }}
          // contentContainerStyle={{ flex: 1, justifyContent: "center" }}
        >
          <ScreenTransaksiStatusCucian onPress={openStatusCucian} />
          {/* {transaksi.no_faktur && (
            <List.Item
              title={transaksi.nama_customer}
              description={transaksi.noTelepon}
            />
          )} */}
          {/* <Divider /> */}

          <ScreenTransaksiPengembalian onPress={openPengembalian} />
          <Divider />

          <View
            style={{
              marginVertical: 16,
              // flexDirection: "row",
              justifyContent: "center",
              gap: 16,
            }}
          >
            <TextInput
              // style={{ flex: 1 }}
              value={`${transaksi.no_faktur || ""}`}
              onChangeText={(text) => handleInput("no_faktur", text)}
              label="Nomor Faktur"
              editable={false}
              right={<TextInput.Icon onPress={randomFaktur} icon="reload" />}
            />

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

            <Divider />

            {/* <TextInput
              style={{ flex: 1 }}
              value={transaksi.nama_customer || ""}
              onChangeText={(text) => handleInput("nama_customer", text)}
              label="Nama Pelanggan"
            /> */}
          </View>

          {/* <View style={{ marginVertical: 16 }}></View> */}
          {/* <Divider /> */}
          {showDatePicker && (
            <DateTimePicker
              value={transaksi.tanggal_terima || new Date()}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(event, value) => handleInput("tanggal_terima", value)}
            />
          )}

          <WidgetBarangChoice onPress={(item) => addOrUpdate(item)} />
          {daftarItemBeli.map((barang, index) => (
            <View key={index}>
              <List.Item
                key={index}
                title={`${barang.nama_barang} #${barang.kode_barang}`}
                // description={ServiceBaseHumanCurrency(item_barang.berat)}
                right={(props) => (
                  <>
                    <TextInput
                      key={index}
                      mode="outlined"
                      value={`${daftarItemBeli[index].qty || ""}`}
                      onChangeText={(text) =>
                        handleInputItemBeli(index, text, barang)
                      }
                    />
                  </>
                )}
              />
            </View>
          ))}
          {/* <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 8,
            }}
          > */}
          {/* <TextInput
              style={{ flex: 1 }}
              value={transaksi.alamat || ""}
              onChangeText={(text) => handleInput("alamat", text)}
              label="Alamat"
            />

            <TextInput
              style={{ flex: 1 }}
              value={transaksi.no_hp || ""}
              onChangeText={(text) => handleInput("no_hp", text)}
              label="Nomor Telepon"
            /> */}
          {/* </View> */}

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
      )}
    </SafeAreaView>
  );
});

export default ScreenTransaksiCreate;
