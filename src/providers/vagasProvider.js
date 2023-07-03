import { doCall } from "./baseProvider";

export const getVagas = async ({ search }) => {
  const { success, data } = await doCall('vagas.json');

  if (success) {
    return data;
  }
}