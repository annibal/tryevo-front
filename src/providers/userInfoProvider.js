import { doCall } from "./baseProvider"

export const getOwnInfo = async () => {
  const { success, data, error } = await doCall('info/self');
  if (success && data) {
    return data;
  } else {
    throw Error(error?.message || error);
  }
}