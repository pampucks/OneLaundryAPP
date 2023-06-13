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
import { Alert, Platform, SafeAreaView, ScrollView, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  ServiceBaseHumanDate,
  ServiceBaseHumanCurrency,
  ServiceBaseRandomID,
  ServiceBaseIsDuplicateArray,
  ServiceBaseFileSharing,
} from "../../services/ServiceBase";
import {
  ServiceTransaksiCreate,
  ServiceTransaksiShare,
} from "../../services/ServiceTransaksi";
import { ContextUserAuthentication } from "../../contexts/ContextUser";
import ScreenTransaksiStatusCucian from "./ScreenTransaksiStatusCucian";
import ScreenTransaksiPengembalian from "./ScreenTransaksiPengembalian";
import WidgetBarangChoice from "../../widgets/barang/WidgetBarangChoice";
import SchemaPelanggan from "../../schema/SchemaPelanggan";
import WidgetPelangganChoice from "../../widgets/pelanggan/WidgetPelangganChoice";
import { SafeAreaProvider } from "react-native-safe-area-context";

const ScreenTransaksiCreate = ({ navigation }) => {
  const [dataTransaksi, setDataTransaksi] = useState({});
  const [complete, setComplete] = useState(false);
  const [daftarItemBarang, setDaftarItemBarang] = useState([]);
  const [pelanggan, setPelanggan] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  //   const [cucian, setCucian] = useState({});
  //   const [, setIsAuthenticated] = useContext(ContextUserAuthentication);
  //   const [pengembalian, setPengembalian] = useState();
  //   const [total, setTotal] = useState(0);

  const handleInput = (name, value) => {
    if (name === "tanggal_terima") setShowDatePicker(false);
    setDataTransaksi((values) => ({ ...values, [name]: value }));
  };

  const handleInputItemBarang = (index, value, item) => {
    setDaftarItemBarang((values) => {
      const qty = parseInt(value);
      const items = [...values];

      if (qty === 0) {
        items.splice(index, 1);
      } else {
        items[index].qty = qty;
        items[index].subtotal = item.qty * item.hargaSatuan;
      }

      return items;
    });
  };

  const randomFaktur = () => {
    handleInput("no_faktur", ServiceBaseRandomID("TX"));
  };

  const addPelanggan = (pelanggan) => {
    const debounce = _.debounce(() => setPelanggan(pelanggan), 100);
    debounce();
  };

  const update = (item) => {
    const debounce = _.debounce(() => {
      setDaftarItemBarang((values) => {
        const items = [...values];
        const b = items.find((value) => value.kode_barang === item.kode_barang);
        const i = items.findIndex(
          (value) => value.kode_barang === item.kode_barang
        );
        b.qty = b.qty + 1;
        b.subtotal = b.qty * b.hargaSatuan;
        items[i] = b;
        return items;
      });
    }, 100);

    debounce();
  };

  const add = (item) => {
    const debounce = _.debounce(() => {
      const payload = {
        kode_barang: item.kode_barang,
        nama_barang: item.nama_barang,
        hargaSatuan: item.hargaSatuan,
        qty: 1,
        subtotal: 1 * item.hargaSatuan,
        // hargaBeli: item.hargaBeli,
        // jumlahBeli: 1,
        // subtotal: 1 * item.hargaBeli,
      };

      setDaftarItemBarang((values) => [...values, payload]);
    }, 100);

    debounce();
  };

  const addOrUpdate = (item) => {
    const isDuplicate = ServiceBaseIsDuplicateArray(
      daftarItemBarang,
      item.kode_barang,
      "kode_barang"
    );
    if (isDuplicate) {
      update(item);
    } else {
      add(item);
    }
  };

  //     setDaftarItemBarang((values) => [...values, payload]);
  //   }, 100);
  // };

  const calculateSubtotal = useMemo(() => {
    const total = _.sumBy(daftarItemBarang, "subtotal");
    handleInput("total", total);
    return total;
  }, [daftarItemBarang]);

  const calculateBayar = useMemo(() => {
    const kembalian = dataTransaksi.dibayar - calculateSubtotal;
    handleInput("kembali", kembalian);
    return kembalian;
  }, [dataTransaksi.dibayar, daftarItemBarang]);

  const askShare = () => {
    const actions = [
      {
        text: "Ya",
        onPress: dataTransaksiShare,
      },
      {
        text: "Batal",
        onPress: () => {},
        style: "cancel",
      },
    ];
    Alert.alert("Share faktur?", null, actions);
  };

  const dataTransaksiShare = () => {
    setComplete(false);

    const debounce = _.debounce(() => {
      ServiceTransaksiShare(dataTransaksi.no_faktur)
        .then(async (blob) => {
          ServiceBaseFileSharing("NO_FAKTUR", blob);
          // clear
        })
        .catch((error) => console.log(error))
        .finally(() => setComplete(true));
    }, 500);

    debounce();
  };

  const dataTransaksiCreate = () => {
    setComplete(false);

    const debounce = _.debounce(() => {
      dataTransaksi.kode_pelanggan = pelanggan.kode_pelanggan;

      const payload = {
        ...dataTransaksi,
        items: [...daftarItemBarang],
      };

      ServiceTransaksiCreate(payload)
        .then((data) => {
          // navigation.navigate("ScreenTransaksiBarangChoice");
          askShare();
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => setComplete(true));
    }, 500);

    debounce();
  };

  // const openStatusCucian = _.debounce((item) => {
  //   setCucian(item);
  //   setIsAuthenticated(false);
  //   navigation.navigate("RouterTransaksi", {
  //     screen: "ScreenTransaksiStatusCucian",
  //   });
  // }, 100);

  // const openPengembalian = _.debounce(() => {
  //   setPengembalian();
  //   setIsAuthenticated(false);
  //   navigation.navigate("RouterTransaksi", {
  //     screen: "ScreenTransaksiPengembalian",
  //   });
  // }, 100);

  // const cucianPerkilo = () => {
  //   let jumlah = 0;
  //   if (beratKilo <= 1) {
  //     jumlah = 5000;
  //   } else {
  //     jumlah = 5000 + (beratKilo - 1) * 5000;
  //   }
  //   setHarga(jumlah);
  // };

  const clear = () => {
    setDaftarItemBeli([]);
    setPelanggan(SchemaPelanggan);
    setComplete(true);
    setDataTransaksi(SchemaTransaksi);
  };

  useEffect(() => {
    setComplete(false);
    const debounce = _.debounce(() => setComplete(true), 500);
    debounce();
  }, []);

  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: "#7286d3" }}>
      <Appbar.Header>
        <Appbar.Action
          icon="menu"
          onPress={() => {
            navigation.toggleDrawer();
          }}
        />
        <Appbar.Content title="Buat Transaksi" />
        <Appbar.Action icon="trash-can-outline" onPress={clear} />
      </Appbar.Header>
      {complete && (
        <ScrollView
          style={{
            marginVertical: 8,
            marginHorizontal: 24,
          }}
          // contentContainerStyle={{ flex: 1, justifyContent: "center" }}
        >
          {/* <ScreenTransaksiStatusCucian onPress={openStatusCucian} /> */}
          {/* {dataTransaksi.no_faktur && (
            <List.Item
              title={dataTransaksi.nama_customer}
              description={dataTransaksi.noTelepon}
            />
          )} */}
          {/* <Divider /> */}

          {/* <ScreenTransaksiPengembalian onPress={openPengembalian} />
          <Divider /> */}

          <View
            style={{
              marginVertical: 8,
              // flexDirection: "row",
              justifyContent: "center",
              gap: 16,
            }}
          >
            <TextInput
              // style={{ flex: 1 }}
              value={`${dataTransaksi.no_faktur || ""}`}
              onChangeText={(text) => handleInput("no_faktur", text)}
              label="Nomor Faktur"
              editable={false}
              right={<TextInput.Icon onPress={randomFaktur} icon="reload" />}
            />

            <TextInput
              label="Tanggal"
              editable={false}
              value={`${
                ServiceBaseHumanDate(dataTransaksi.tanggal_terima) || ""
              }`}
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
              value={dataTransaksi.nama_customer || ""}
              onChangeText={(text) => handleInput("nama_customer", text)}
              label="Nama Pelanggan"
            /> */}
          </View>

          {/* <View style={{ marginVertical: 16 }}></View> */}
          {/* <Divider /> */}
          {showDatePicker && (
            <DateTimePicker
              value={dataTransaksi.tanggal_terima || new Date()}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(event, value) => handleInput("tanggal_terima", value)}
            />
          )}

          <WidgetPelangganChoice onPress={(item) => addPelanggan(item)} />
          {!_.isEmpty(pelanggan.kode_pelanggan) && (
            <List.Item
              title={`${pelanggan.nama_pelanggan} ${pelanggan.alamat_pelanggan} ${pelanggan.telepon_pelanggan}`}
            />
          )}

          <WidgetBarangChoice onPress={(item) => addOrUpdate(item)} />
          {daftarItemBarang.map((barang, index) => (
            <View key={index}>
              <List.Item
                style={{ marginVertical: -16 }}
                key={index}
                title={`${barang.nama_barang} #${barang.kode_barang}`}
                description={ServiceBaseHumanCurrency(barang.hargaSatuan)}
                right={(props) => (
                  <>
                    <TextInput
                      key={index}
                      mode="outlined"
                      value={`${daftarItemBarang[index].qty || ""}`}
                      onChangeText={(text) =>
                        handleInputItemBarang(index, text, barang)
                      }
                    />
                  </>
                )}
              />
            </View>
          ))}

          <DataTable>
            <DataTable.Row>
              <DataTable.Title>Total</DataTable.Title>
              <DataTable.Cell numeric>
                {ServiceBaseHumanCurrency(calculateSubtotal) || 0}
              </DataTable.Cell>
            </DataTable.Row>
            {/* <DataTable.Row>
              <DataTable.Title>Sisa</DataTable.Title>
              <DataTable.Cell numeric>total</DataTable.Cell>
            </DataTable.Row> */}
            <DataTable.Row>
              <DataTable.Title>Kembali</DataTable.Title>
              <DataTable.Cell numeric>
                {/* {ServiceBaseHumanCurrency(calculateBayar) || 0} */}
              </DataTable.Cell>
            </DataTable.Row>
          </DataTable>

          <View
            style={{
              // flexDirection: "row",
              // justifyContent: "center",
              gap: 8,
              marginVertical: 8,
            }}
          >
            <TextInput
              style={{ flex: 1 }}
              value={dataTransaksi.dibayar || ""}
              error={calculateBayar < 0}
              onChangeText={(text) => handleInput("dibayar", parseInt(text))}
              label="Bayar"
            />

            {/* <TextInput
              style={{ flex: 1 }}
              value={dataTransaksi.berat || ""}
              onChangeText={(text) => handleInput("berat", parseInt(text))}
              label="PerKilo"
            /> */}
          </View>

          <View style={{ marginHorizontal: 16, gap: 16, marginVertical: 24 }}>
            <Button onPress={dataTransaksiCreate} mode="contained">
              Simpan
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
    </SafeAreaProvider>
  );
};

export default ScreenTransaksiCreate;
