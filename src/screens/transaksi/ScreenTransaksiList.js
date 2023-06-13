// import _ from "lodash";
// import { useContext, useEffect, useState } from "react";
// import { SafeAreaView, ScrollView } from "react-native";
// import { Appbar, DataTable, Searchbar } from "react-native-paper";
// import { ServiceTransaksiList } from "../../services/ServiceTransaksi";
// import WidgetBaseFABCreate from "../../widgets/base/WidgetBaseFABCreate";
// // import { ScrollView } from "react-native-gesture-handler";
// import WidgetBaseLoader from "../../widgets/base/WidgetBaseLoader";
// import {
//   ServiceBaseHumanCurrency,
//   ServiceBaseHumanDate,
// } from "../../services/ServiceBase";
// import { ContextUserAuthentication } from "../../contexts/ContextUser";

// const ScreenTransaksiList = ({ navigation }) => {
//   const [query, setQuery] = useState();
//   const [complete, setComplete] = useState(false);
//   const [daftarTransaksi, setDaftarTransaksi] = useState([]);
//   const [pagination, setPagination] = useState({});
//   const [isAuthenticated, setIsAuthenticated] = useContext(
//     ContextUserAuthentication
//   );

//   const transaksiList = (page, terms) => {
//     setComplete(false);
//     const debounce = _.debounce(() => {
//       ServiceTransaksiList(page ? page : 1, terms ? terms : "")
//         .then(({ results, pagination }) => {
//           setPagination(pagination);
//           setDaftarTransaksi(results);
//         })
//         .catch((error) => console.log(error))
//         .finally(() => setComplete(true));
//     }, 500);

//     debounce();
//   };

//   const paginate = (page) => {
//     transaksiList(page, query);
//   };

//   const search = (e) => {
//     transaksiList(1, e.nativeEvent.text);
//   };

//   const refresh = () => {
//     setQuery("");
//     transaksiList(1, "");
//   };

//   const openTransaksiDetail = _.debounce((no_faktur) => {
//     navigation.navigate("ScreenTransaksiDetail", { no_faktur });
//   }, 100);

//   const openTransaksiCreate = _.debounce(() => {
//     navigation.navigate("ScreenTransaksiCreate");
//   }, 100);

//   //   const openTransaksiCreate = _.debounce(() => {
//   //     setIsAuthenticated(false);
//   //     navigation.navigate("RouterTransaksi", {
//   //       screen: "ScreenTransaksiCreate",
//   //     });
//   //   }, 100);

//   const openTransaksiReporting = _.debounce(() => {
//     navigation.navigate("ScreenTransaksiReporting");
//   }, 100);

//   useEffect(() => {
//     transaksiList();
//   }, []);

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <Appbar.Header>
//         <Appbar.Action icon="menu" onPress={navigation.toggleDrawer} />
//         <Appbar.Content title="Transaksi" />
//         <Appbar.Action
//           icon="table-arrow-right"
//           onPress={() => openTransaksiReporting()}
//         />
//         <Appbar.Action icon="refresh" onPress={refresh} />
//         <Appbar.Action
//           icon="arrow-left"
//           disabled={_.isNull(pagination?.prev)}
//           onPress={() => paginate(pagination?.prev)}
//         />
//         <Appbar.Action
//           icon="arrow-right"
//           disabled={_.isNull(pagination?.next)}
//           onPress={() => paginate(pagination?.next)}
//         />
//       </Appbar.Header>

//       <ScrollView style={{ paddingBottom: 30 }}>
//         <Searchbar
//           placeholder="Search"
//           value={query || ""}
//           onChangeText={(text) => setQuery(text)}
//           onSubmitEditing={search}
//           style={{ marginTop: 16, marginHorizontal: 16 }}
//         />

//         <DataTable>
//           <DataTable.Header>
//             <DataTable.Title>No.Faktur</DataTable.Title>
//             <DataTable.Title>Tanggal</DataTable.Title>
//             <DataTable.Title numeric>Total</DataTable.Title>
//           </DataTable.Header>

//           {complete &&
//             daftarTransaksi.map((transaksi, index) => (
//               <DataTable.Row
//                 key={index}
//                 onPress={() => openTransaksiDetail(transaksi.no_faktur)}
//               >
//                 <DataTable.Cell>{transaksi.no_faktur}</DataTable.Cell>
//                 <DataTable.Cell>
//                   {ServiceBaseHumanDate(transaksi.tanggal_terima)}
//                 </DataTable.Cell>
//                 <DataTable.Cell numeric>
//                   {ServiceBaseHumanCurrency(transaksi.total)}
//                 </DataTable.Cell>
//               </DataTable.Row>
//             ))}
//         </DataTable>
//       </ScrollView>

//       <WidgetBaseFABCreate action={() => openTransaksiCreate()} />
//       <WidgetBaseLoader complete={complete} />
//     </SafeAreaView>
//   );
// };

// export default ScreenTransaksiList;
