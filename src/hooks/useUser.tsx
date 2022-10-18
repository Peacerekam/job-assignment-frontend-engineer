import axios, { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";
import { setUserToken } from "utils/helpers";

// use this as some base url for axios, check documentaiton
const PROFILE_FETCH_URL = `/api/user`;

export type User = {
  email?: string;
  token?: string;
  username?: string;
  bio?: string;
  image?: string;
  loggedIn: boolean;
};

type UserResponse = {
  user: User;
};

export const useUser = (): User | undefined => {
  const [user, setUser] = useState<User>();

  const handleFetch = useCallback(async () => {
    try {
      const userToken = localStorage.getItem("userToken");
      if (!userToken) {
        setUser({ loggedIn: false });
        return;
      }

      setUserToken(userToken);
      const response: AxiosResponse<UserResponse> = await axios.get(PROFILE_FETCH_URL);
      const { user } = response.data;
      setUser({
        ...user,
        loggedIn: true,
      });
    } catch (err) {
      //
    }
  }, []);

  useEffect(() => {
    handleFetch();
    window.addEventListener("tokenChange", handleFetch);
    return () => window.removeEventListener("tokenChange", handleFetch);
  }, [handleFetch]);

  return user;
};
