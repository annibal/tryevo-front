import { IMask } from "react-imask";

export default function applyMask(str, mask) {
  return IMask.pipe(str || "", mask);
}