import { doCall } from "./baseProvider";

export const getVagas = async () => {
  const { success, data } = await doCall('vagas');

  if (success) {
    return data;
  }
}