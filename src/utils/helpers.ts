import axios from "axios";

type Suffix = "th" | "st" | "nd" | "rd" | "th";

export const nth = (d: number): Suffix => {
  if (d > 3 && d < 21) return "th";
  switch (d % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

export const getFormattedDate = (dateString?: string): string => {
  if (!dateString) return "";
  const date = new Date(dateString ?? "");
  const month = date.toLocaleString("en", { month: "long" });
  const day = date.getDate();
  const suffix = nth(day);
  return `${month} ${day}${suffix}`;
};

export const getMockedFullName = (username?: string): string => {
  if (!username) return "";
  const capitalizedUsername = username.charAt(0).toUpperCase() + username.slice(1);
  return `${capitalizedUsername} Smith`;
};

export const setUserToken = (token: string): void => {
  axios.defaults.headers["Authorization"] = token;
  localStorage.setItem("userToken", token);
  window.dispatchEvent(new Event("tokenChange"));
};
