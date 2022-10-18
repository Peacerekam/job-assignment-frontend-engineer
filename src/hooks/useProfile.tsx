import axios, { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";

// use this as some base url for axios, check documentaiton
const PROFILE_FETCH_URL = `/api/profiles`;

type Profile = {
  username: string;
  bio: string;
  image: string;
  following: boolean;
};

type ProfileResponse = {
  profile: Profile;
};

export const useProfile = (username: string): Profile | undefined => {
  const [profile, setProfile] = useState<Profile>();

  const handleFetch = useCallback(async () => {
    const profileURL = `${PROFILE_FETCH_URL}/${username}`;
    const response: AxiosResponse<ProfileResponse> = await axios.get(profileURL);
    setProfile(response.data.profile);
  }, [username]);

  useEffect(() => {
    handleFetch();
    window.addEventListener("favorited", handleFetch);
    return () => {
      window.removeEventListener("favorited", handleFetch);
    };
  }, [handleFetch]);

  return profile;
};
