import {
  DataMallBusRoute,
  DataMallBusService,
  DataMallBusStop,
} from "../types.js";

export const _columns: { [key: string]: any } = {
  stop_id: "",
  stop_code: "",
  stop_name: "",
  tts_stop_name: "",
  stop_desc: "",
  stop_lat: "",
  stop_lon: "",
  zone_id: "",
  stop_url: "",
  location_type: "",
  parent_station: "",
  stop_timezone: "",
  wheelchair_boarding: "1",
  level_id: "",
  platform_code: "",
};

export const _map: { [key: string]: (x: DataMallBusStop) => any } = {
  stop_id: (x) => x.BusStopCode,
  stop_name: (x) => x.Description,
  stop_desc: (x) => (x.RoadName !== x.Description ? x.RoadName : ""),
  stop_lat: (x) => x.Latitude,
  stop_lon: (x) => x.Longitude,
};

export const _iterator = (
  stops: DataMallBusStop[],
  routes: DataMallBusRoute[],
  services: DataMallBusService[]
) => {
  return stops;
};
