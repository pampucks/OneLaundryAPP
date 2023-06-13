import { useEffect, useState } from "react";
import { Appbar, DataTable } from "react-native-paper";
import { ServiceBarangList } from "../../services/ServiceBarang";
import _ from "lodash";
import { SafeAreaView, ScrollView } from "react-native";
import WidgetBaseLoader from "../../widgets/base/WidgetBaseLoader";
import WidgetBaseFABCreate from "../../widgets/base/WidgetBaseFABCreate";

const ScreenBarangList = ({ navigation }) => {
  const [query, setQuery] = useState();
  const [complete, setComplete] = useState(false);
  const [daftarBarang, setDaftarBarang] = useState([]);
  const [pagination, setPagination] = useState({});

  const barangList = _.debounce((page, terms) => {
    setComplete(false);
    ServiceBarangList(page ? page : 1, terms ? terms : "")
      .then(({ results, pagination }) => {
        setPagination(pagination);
        setDaftarBarang(results);
      })
      .catch((error) => console.log(error))
      .finally(() => setComplete(true));
  }, 500);

  const paginate = (page) => {
    barangList(page, query);
  };

  const search = (e) => {
    barangList(1, e.nativeEvent.text);
  };

  const refresh = () => {
    setQuery("");
    barangList(1, "");
  };

  const openBarangEdit = _.debounce((barang) => {
    navigation.navigate("ScreenBarangEdit", { barang });
  }, 100);

  const openBarangCreate = _.debounce(() => {
    navigation.navigate("ScreenBarangCreate");
  }, 100);

  useEffect(() => {
    barangList();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#537188" }}>
      <Appbar.Header>
        <Appbar.Action
          icon="menu"
          onPress={() => {
            navigation.toggleDrawer();
          }}
        />
        <Appbar.Content title="Barang Laundry" />
        <Appbar.Action icon="refresh" onPress={refresh} />
        {/* <Appbar.Action
          icon="arrow-left"
          disabled={_.isNull(pagination?.prev)}
          onPress={() => paginate(pagination?.prev)}
        />
        <Appbar.Action
          icon="arrow-right"
          disabled={_.isNull(pagination?.next)}
          onPress={() => paginate(pagination?.next)}
        /> */}
      </Appbar.Header>
      <ScrollView style={{ paddingBottom: 30 }}>
        <DataTable>
          <DataTable.Header style={{ borderBottomColor: "#9BA4B5" }}>
            <DataTable.Title textStyle={{ color: "#fff" }}>
              Kode Barang
            </DataTable.Title>
            <DataTable.Title textStyle={{ color: "#fff" }}>
              Nama Barang
            </DataTable.Title>
            <DataTable.Title numeric textStyle={{ color: "#fff" }}>
              Harga Satuan
            </DataTable.Title>
          </DataTable.Header>
          {complete &&
            daftarBarang.map((barang, index) => (
              <DataTable.Row key={index} onPress={() => openBarangEdit(barang)}>
                <DataTable.Cell textStyle={{ color: "#fff" }}>
                  {barang.kode_barang}
                </DataTable.Cell>
                <DataTable.Cell textStyle={{ color: "#fff" }}>
                  {barang.nama_barang}
                </DataTable.Cell>
                <DataTable.Cell textStyle={{ color: "#fff" }} numeric>
                  {barang.hargaSatuan}
                </DataTable.Cell>
              </DataTable.Row>
            ))}
        </DataTable>
      </ScrollView>
      <WidgetBaseFABCreate action={() => openBarangCreate()} />
      <WidgetBaseLoader complete={complete} />
    </SafeAreaView>
  );
};

export default ScreenBarangList;
