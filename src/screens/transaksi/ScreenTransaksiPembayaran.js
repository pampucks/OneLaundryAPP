import { useState } from "react";
import SchemaTransaksi from "../../schema/SchemaTransaksi";

const ScreenTransaksiPembayaran = ({ navigation }) => {
  const [transaksi, setTransaksi] = useState(SchemaTransaksi);
  const [complete, setComplete] = useState(false);
  const [daftarItemCucian, setDaftarItemCucian] = useState([]);

  const handleInput = (name, value) => {
    setTransaksi((values) => ({ ...values, [name]: value }));
  };
};

const transaksiPembayaran = () => {};

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
      onPress: pembelianShare,
    },
    {
      text: "Batal",
      onPress: () => {},
      style: "cancel",
    },
  ];
  Alert.alert("Share faktur?", null, actions);
};

const pembelianShare = () => {
  setComplete(false);

  const debounce = _.debounce(() => {
    ServicePembelianShare(pembelian.faktur)
      .then(async (blob) => {
        ServiceBaseFileSharing("FAKTUR", blob);
        //clear
      })
      .catch((error) => console.log(error))
      .finally(() => setComplete(true));
  }, 500);

  debounce();
};

export default ScreenTransaksiPembayaran;
