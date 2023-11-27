import { useGetData } from "@/hooks/useGetData";
import { GoogleGeoCodeResponse } from "@/types";
import { Location } from "@/types/Event";
import { PrettyPrint } from "@/utils/PrettyPrint";

const baseAddress = "https://maps.googleapis.com/maps/api/geocode/json";

export const Geocoder = ({ location }: { location: Location }) => {
  const address = [...Object.values(location)].join(" ");

  const url = `${baseAddress}?address=${encodeURI(address)}`;

  const data = useGetData<GoogleGeoCodeResponse>(url);

  if (data?.status === "OK") {
    const loc = data.results[0].geometry.location;
    return PrettyPrint(loc);
  }

  return null;
};
