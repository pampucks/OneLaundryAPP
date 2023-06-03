import AsyncStorage from "@react-native-async-storage/async-storage";
import _ from "lodash";
import { useEffect, useState } from "react";

export const useHookUserAuthenticationInterface = () => {
  const [isAuthenticated, setIsAuthenticated] = useState();

  useEffect(() => {
    const debounce = _.debounce(async () => {
      const token = await AsyncStorage.getItem("@token");
      setIsAuthenticated(token ? true : false);
    }, 500);

    debounce();
  }, []);

  return [isAuthenticated, setIsAuthenticated];
};
