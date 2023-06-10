import { useContext, useEffect, useState } from "react";
import SchemaTransaksi from "../../schema/SchemaTransaksi";
import {
  Appbar,
  Button,
  DataTable,
  Divider,
  List,
  TextInput,
} from "react-native-paper";
import App from "../../../App";
import DateTimePicker from "@react-native-community/datetimepicker";
import _ from "lodash";
import { ServiceTransaksiCreate } from "../../services/ServiceTransaksi";
import { ServiceBaseHumanDate } from "../../services/ServiceBase";
import { SafeAreaView, ScrollView, View } from "react-native";
import ScreenTransaksiStatusCucian from "./ScreenTransaksiStatusCucian";
import ScreenTransaksiPengembalian from "./ScreenTransaksiPengembalian";
import { ContextUserAuthentication } from "../../contexts/ContextUser";

const ScreenTransaksiCreate = ({ navigation }) => {
  const [transaksi, setTransaksi] = useState(SchemaTransaksi);
  const [complete, setComplete] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [cucian, setCucian] = useState({});
  const [, setIsAuthenticated] = useContext(ContextUserAuthentication);
  const [pengembalian, setPengembalian] = useState();

  const handleInput = (name, value) => {
    if (name === "tanggal_terima") setShowDatePicker(false);
    setTransaksi((values) => ({ ...values, [name]: value }));
  };

  const transaksiCreate = () => {
    setComplete(false);
    const debounce = _.debounce(() => {
      ServiceTransaksiCreate(transaksi)
        .then(() => {
          navigation.navigate("ScreenTransaksiBarangChoice");
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

      <ScrollView
        style={{
          marginVertical: 24,
          marginHorizontal: 24,
        }}
        // contentContainerStyle={{ flex: 1, justifyContent: "center" }}
      >
        <ScreenTransaksiStatusCucian onPress={openStatusCucian} />
        {transaksi.no_faktur && (
          <List.Item
            title={transaksi.nama_customer}
            // description={transaksi.noTelepon}
          />
        )}
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

        <View style={{ marginVertical: 16 }}>
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
        )}

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

export default ScreenTransaksiCreate;
