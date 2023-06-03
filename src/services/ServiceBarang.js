import AsyncStorage from "@react-native-async-storage/async-storage";
import { ServiceBaseRequest } from "./ServiceBase";
import { CONFIG_BASE_API_URL } from "../config/ConfigBase";

export const ServiceBarangList = (page, terms) => {
  return new Promise(async (resolve, reject) => {
    const config = {
      headers: {
        "x-access-token": await AsyncStorage.getItem("@token"),
        params: { page, terms },
      },
    };

    ServiceBaseRequest.get(`${CONFIG_BASE_API_URL}/barang`, config)
      .then((response) => {
        const { results, ...pagination } = response.data;
        resolve({ results, ...pagination });
      })
      .catch((error) => reject(error));
  });
};

export function ServiceBarangCreate(payload) {
  return new Promise(async (resolve, reject) => {
    const config = {
      headers: {
        "x-access-token": await AsyncStorage.getItem("@token"),
      },
    };

    ServiceBaseRequest.post(`${CONFIG_BASE_API_URL}/barang`, payload, config)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => reject(error));
  });
}

export function ServiceBarangEdit(payload) {
  return new Promise(async (resolve, reject) => {
    const config = {
      headers: {
        "x-access-token": await AsyncStorage.getItem("@token"),
      },
    };

    ServiceBaseRequest.put(
      `${CONFIG_BASE_API_URL}/barang/${payload.kode_barang}`,
      payload,
      config
    )
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => reject(error));
  });
}
