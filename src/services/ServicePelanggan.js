import AsyncStorage from "@react-native-async-storage/async-storage";
import { ServiceBaseRequest } from "./ServiceBase";
import { CONFIG_BASE_API_URL } from "../config/ConfigBase";

export const ServicePelangganList = (page, terms) => {
  return new Promise(async (resolve, reject) => {
    const config = {
      headers: {
        "x-access-token": await AsyncStorage.getItem("@token"),
        params: { page, terms },
      },
    };

    ServiceBaseRequest.get(`${CONFIG_BASE_API_URL}/pelanggan`, config)
      .then((response) => {
        const { results, ...pagination } = response.data;
        resolve({ results, ...pagination });
      })
      .catch((error) => reject(error));
  });
};

export const ServicePelangganCreate = (payload) => {
  return new Promise(async (resolve, reject) => {
    const config = {
      headers: {
        "x-access-token": await AsyncStorage.getItem("@token"),
      },
    };

    ServiceBaseRequest.post(`${CONFIG_BASE_API_URL}/pelanggan`, payload, config)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => reject(error));
  });
};

export function ServicePelangganEdit(payload) {
  return new Promise(async (resolve, reject) => {
    const config = {
      headers: {
        "x-access-token": await AsyncStorage.getItem("@token"),
      },
    };

    ServiceBaseRequest.put(
      `${CONFIG_BASE_API_URL}/pelanggan/${payload.kode_pelanggan}`,
      payload,
      config
    )
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => reject(error));
  });
}

export const ServicePelangganDelete = (kode_pelanggan) => {
  return new Promise(async (resolve, reject) => {
    const config = {
      headers: {
        "x-access-token": await AsyncStorage.getItem("@token"),
      },
    };

    ServiceBaseRequest.delete(
      `${CONFIG_BASE_API_URL}/pelanggan/${kode_pelanggan}`,
      config
    )
      .then((response) => {
        resolve(null);
      })
      .catch((error) => reject(error));
  });
};
