import { ServiceBaseRandomID } from "../services/ServiceBase";

export default {
  no_faktur: ServiceBaseRandomID("tx"),
  tanggal_terima: new Date(),
  dibayar: 0,
  berat: 0,
  kembali: 0,
  total_harga: 0,
  status_cucian: "",
  status_pengembalian: "",
};
