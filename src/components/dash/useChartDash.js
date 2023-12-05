import useFetch from "../../providers/useFetch";

export default function useChartDash({ chartFeature, accountType, params }) {
  const dataResponse = useFetch("GET", `/dashboard/${accountType}/${chartFeature}`, params);
  dataResponse.enabled = true;

  if (!dataResponse.loading) {
    if (dataResponse.error?.toString().toLowerCase().includes("sem permiss")) {
      dataResponse.enabled = false;
    }

    if (!dataResponse.data) {
      dataResponse.data = []
    }
  }

  return dataResponse;
}