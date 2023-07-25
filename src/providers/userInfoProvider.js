import { doCall } from "./baseProvider";

export const getOwnInfo = async () => {
  const { success, data, error } = await doCall("info/self");
  if (success && data) {
    return data;
  } else {
    throw Error(error?.message || error);
  }
};

export const saveInfoPF = async (body) => {
  const { success, data, error } = await doCall("info/pf", { method: "POST", body });
  if (success && data) {
    return data;
  } else {
    throw Error(error?.message || error);
  }
};

export const saveInfoPJ = async (body) => {
  const { success, data, error } = await doCall("info/pj", { method: "POST", body });
  if (success && data) {
    return data;
  } else {
    throw Error(error?.message || error);
  }
};
