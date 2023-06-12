import _ from "lodash";
import { useState, useEffect } from "react";
import { Modal, ScrollView } from "react-native";
import {
  ActivityIndicator,
  Appbar,
  DataTable,
  List,
  Portal,
  Provider,
  Searchbar,
} from "react-native-paper";
import WidgetBaseLoader from "../base/WidgetBaseLoader";
import { ServicePelangganList } from "../../services/ServicePelanggan";

const WidgetPelangganChoice = ({ onPress }) => {
  const [daftarPelanggan, setDaftarPelanggan] = useState([]);
  const [complete, setComplete] = useState(false);
  const [visible, setVisible] = useState(false);

  const pelangganList = () => {
    setComplete(false);

    const debounce = _.debounce(() => {
      ServicePelangganList()
        .then(({ results }) => {
          setDaftarPelanggan(results);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => setComplete(true));
    }, 500);

    debounce();
  };

  useEffect(() => {
    pelangganList();
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
              <Appbar.Content title="Pilih Pelanggan" />
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
                    <DataTable.Title>Kode Pelanggan</DataTable.Title>
                    <DataTable.Title>Nama Pelanggan</DataTable.Title>
                    <DataTable.Title>Alamat</DataTable.Title>
                    <DataTable.Title>Telepon</DataTable.Title>
                  </DataTable.Header>

                  {daftarPelanggan.map((pelanggan, index) => (
                    <DataTable.Row
                      key={index}
                      onPress={() => {
                        _.debounce(() => {
                          onPress(pelanggan);
                          setVisible(false);
                        }, 100)();
                      }}
                    >
                      <DataTable.Cell>
                        {pelanggan.kode_pelanggan}
                      </DataTable.Cell>
                      <DataTable.Cell>
                        {pelanggan.nama_pelanggan}
                      </DataTable.Cell>
                      <DataTable.Cell>
                        {pelanggan.alamat_pelanggan}
                      </DataTable.Cell>
                      <DataTable.Cell>
                        {pelanggan.telepon_pelanggan}
                      </DataTable.Cell>
                    </DataTable.Row>
                  ))}
                </DataTable>
              </ScrollView>
            )}
            <WidgetBaseLoader complete={complete} />
          </Modal>
        </Portal>

        <List.Section style={{ paddingHorizontal: 16 }}>
          <List.Item
            title="Pilih Pelanggan"
            onPress={() => setVisible(true)}
            left={() => (
              <>
                {!complete && <ActivityIndicator animating={!complete} />}
                {complete && <List.Icon icon="account" />}
              </>
            )}
          ></List.Item>
        </List.Section>
      </Provider>
    </>
  );
};

export default WidgetPelangganChoice;
