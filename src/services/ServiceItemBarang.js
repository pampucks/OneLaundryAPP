export const ServiceItemBarangList = (page, terms) => {
  return new Promise(async (resolve, reject) => {
    const config = {
      headers: {
        "x-access-token": await AsyncStorage.getItem("@token"),
        params: { page, terms },
      },
    };
    ServiceBaseRequest.get(`${CONFIG_BASE_API_URL}/transaksi`, config)
      .then((response) => {
        const { results, ...pagination } = response.data;
        resolve({ results, ...pagination });
      })
      .catch((error) => reject(error));

    ServiceBaseRequest.get(`${CONFIG_BASE_API_URL}/barang`, config)
      .then((response) => {
        const { results, ...pagination } = response.data;
        resolve({ results, ...pagination });
      })
      .catch((error) => reject(error));
  });
};
