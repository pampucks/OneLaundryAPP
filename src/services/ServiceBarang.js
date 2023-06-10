import AsyncStorage from "@react-native-async-storage/async-storage";
import { ServiceBaseGetToken, ServiceBaseRequest } from "./ServiceBase";
import { CONFIG_BASE_API_URL } from "../config/ConfigBase";

export const ServiceBarangList = (page, terms) => {
  return new Promise(async (resolve, reject) => {
    let params = { page, terms };
    const config = {
      headers: {
        "x-access-token": await ServiceBaseGetToken(),
        params,
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
        "x-access-token": await ServiceBaseGetToken(),
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
        "x-access-token": await ServiceBaseGetToken(),
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

export function ServiceBarangDelete(kode_barang) {
  return new Promise(async (resolve, reject) => {
    const config = {
      headers: {
        "x-access-token": await ServiceBaseGetToken(),
      },
    };

    ServiceBaseRequest.delete(
      `${CONFIG_BASE_API_URL}/barang/${kode_barang}`,
      config
    )
      .then((response) => {
        resolve(null);
      })
      .catch((error) => reject(error));
  });
}
