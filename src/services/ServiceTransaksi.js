import AsyncStorage from "@react-native-async-storage/async-storage";
import { CONFIG_BASE_API_URL } from "../config/ConfigBase";
import { ServiceBaseRequest } from "./ServiceBase";

export const ServiceTransaksiList = (page, terms) => {
  return new Promise(async (resolve, reject) => {
    const config = {
      headers: {
        "x-access-token": await AsyncStorage.getItem("@token"),
      },
      params: { page, terms },
    };

    ServiceBaseRequest.get(`${CONFIG_BASE_API_URL}/transaksi`, config)
      .then((response) => {
        const { results, ...pagination } = response.data;
        resolve({ results, pagination });
      })
      .catch((error) => reject(error));
  });
};

export const ServiceTransaksiCreate = (payload) => {
  return new Promise(async (resolve, reject) => {
    const config = {
      headers: {
        "x-access-token": await AsyncStorage.getItem("@token"),
      },
    };

    ServiceBaseRequest.post(`${CONFIG_BASE_API_URL}/transaksi`, payload, config)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => reject(error));
  });
};

export const ServiceTransaksiDetail = (faktur) => {
  return new Promise(async (resolve, reject) => {
    const config = {
      headers: {
        "x-access-token": await AsyncStorage.getItem("@token"),
      },
    };

    ServiceBaseRequest.get(`${CONFIG_BASE_API_URL}/transaksi/${faktur}`, config)
      .then((response) => {
        const { items, ...pembelian } = response.data;
        resolve({ pembelian, items });
      })
      .catch((error) => reject(error));
  });
};

export const ServiceTransaksiPrint = (faktur) => {
  return new Promise(async (resolve, reject) => {
    const config = {
      headers: {
        "x-access-token": await AsyncStorage.getItem("@token"),
      },
      responseType: "blob",
    };

    ServiceBaseRequest.post(
      `${CONFIG_BASE_API_URL}/transaksi/${faktur}/faktur-excel`,
      null,
      config
    )
      .then((response) => {
        resolve(response);
      })
      .catch((error) => reject(error));
  });
};

export const ServiceTransaksiReport = (payload) => {
  return new Promise(async (resolve, reject) => {
    const config = {
      headers: {
        "x-access-token": await AsyncStorage.getItem("@token"),
      },
      responseType: "blob",
    };

    ServiceBaseRequest.post(
      `${CONFIG_BASE_API_URL}/transaksi/report-period-excel`,
      payload,
      config
    )
      .then((response) => {
        resolve(response);
      })
      .catch((error) => reject(error));
  });
};

export const ServiceTransaksiShare = (faktur) => {
  return new Promise(async (resolve, reject) => {
    const config = {
      headers: {
        "x-access-token": await AsyncStorage.getItem("@token"),
      },
      responseType: "blob",
    };

    ServiceBaseRequest.post(
      `${CONFIG_BASE_API_URL}/transaksi/${faktur}/faktur-excel`,
      null,
      config
    )
      .then((response) => {
        resolve(response);
      })
      .catch((error) => reject(error));
  });
};
