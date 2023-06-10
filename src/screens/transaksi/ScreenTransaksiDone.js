import _ from "lodash";
import { useState, useEffect, useContext } from "react";
import { Modal, ScrollView } from "react-native";
import {
  ActivityIndicator,
  Appbar,
  Button,
  DataTable,
  List,
  Portal,
  Provider,
  Searchbar,
} from "react-native-paper";

import { ServiceBarangList } from "../../services/ServiceBarang";
import SchemaTransaksi from "../../schema/SchemaTransaksi";
import SchemaBarang from "../../schema/SchemaBarang";
import { ServiceTransaksiList } from "../../services/ServiceTransaksi";
import { ContextUserAuthentication } from "../../contexts/ContextUser";
const ScreenTransaksiDone = ({ navigation }) => {
  const [daftarCucian, setDaftarCucian] = useState([]);
  const [complete, setComplete] = useState(false);
  const [visible, setVisible] = useState(false);
  const [, setIsAuthenticated] = useContext(ContextUserAuthentication);
  const [transaksi, setTransaksi] = useState(SchemaTransaksi);
  const [barang, setBarang] = useState(SchemaBarang);
  const [status, setStatus] = useState(false);

  const cucianDone = () => {
    setComplete(true);

    const debounce = _.debounce(() => {
      ServiceTransaksiList(item)
        .then(({ results }) => {
          setDaftarCucian(results);
          navigation.navigate("ScreenTransaksiCreate");
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => setComplete(true));
    }, 500);

    debounce();
  };

  //   const handleStatusChange = (item) => {
  //     if (item === "status_cucian") setStatus(true);
  //     setIsAuthenticated(false);
  //     navigation.navigate("RouterTransaksi", { screen: "ScreenTransaksiDone" });
  //   };

  const item = {
    no_faktur: transaksi.no_faktur,
    nama_barang: barang.nama_barang,
    status_cucian: transaksi.status_cucian,
  };

  useEffect(() => {
    cucianDone();
  }, []);

  return (
    <>
      <Provider>
        <Portal>
          <Modal
            animationType="fade"
            style={{ backgroundColor: "#ffffff" }}
            visible={visible}
          >
            <Appbar.Header>
              <Appbar.Action
                icon="arrow-left"
                onPress={() => setVisible(false)}
              />
              <Appbar.Content title="Status Cucian" />
            </Appbar.Header>

            {complete && (
              <ScrollView
                contentContainerStyle={{
                  paddingBottom: 24,
                }}
              >
                <Searchbar
                  placeholder="Search"
                  onChangeText={(text) => {}}
                  onSubmitEdit={() => {}}
                  style={{
                    marginHorizontal: 16,
                    marginVertical: 16,
                  }}
                />

                <DataTable>
                  <DataTable.Header>
                    <DataTable.Title>Nomor Faktur</DataTable.Title>
                    <DataTable.Title>Nama Barang</DataTable.Title>
                    <DataTable.Title>Status</DataTable.Title>
                  </DataTable.Header>

                  {daftarCucian.map((item, index) => (
                    <DataTable.Row
                      key={index}
                      onPress={() => {
                        _.debounce(() => {
                          onPress(item);
                          setVisible(false);
                        }, 100)();
                      }}
                    >
                      <DataTable.Cell>{item.no_faktur}</DataTable.Cell>
                      <DataTable.Cell>{item.nama_barang}</DataTable.Cell>
                      <DataTable.Cell>{item.status_cucian}</DataTable.Cell>
                      {/* <DataTable.Cell>
                        {status && (
                          <Button onPress={handleStatusChange}>Sudah</Button>
                        )}
                      </DataTable.Cell> */}
                    </DataTable.Row>
                  ))}
                </DataTable>
                <Button onPress={cucianDone}>Lanjut</Button>
              </ScrollView>
            )}
            {/* <WidgetBaseLoader complete={complete} /> */}
          </Modal>
        </Portal>

        <List.Section style={{ paddingHorizontal: 16 }}>
          <List.Item
            title="Status Cucian"
            onPress={() => setVisible(true)}
            left={() => (
              <>
                {!complete && <ActivityIndicator animating={!complete} />}
                {complete && <List.Icon icon="dishwasher" />}
              </>
            )}
          ></List.Item>
        </List.Section>
      </Provider>
    </>
  );
};

export default ScreenTransaksiDone;
