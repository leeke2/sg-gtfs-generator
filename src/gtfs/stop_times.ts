import {
  DataMallBusRoute,
  DataMallBusService,
  DataMallBusStop,
} from "../types.js";

export const _columns: { [key: string]: any } = {
  trip_id: "",
  arrival_time: "",
  departure_time: "",
  stop_id: "",
  stop_sequence: "",
  stop_headsign: "",
  pickup_type: "",
  drop_off_type: "",
  continuous_pickup: "",
  continuous_drop_off: "",
  shape_dist_traveled: "",
  timepoint: "0",
};

export const _map: {
  [key: string]: (
    x: DataMallBusRoute & { trip_id: string; service_id: string }
  ) => any;
} = {
  trip_id: (x) => x.trip_id,
  arrival_time: (x) =>
    x.service_id === "SAT"
      ? `${x.SAT_LastBus.slice(0, 2)}:${x.SAT_LastBus.slice(2, 4)}:00`
      : x.service_id == "SUN"
      ? `${x.SUN_LastBus.slice(0, 2)}:${x.SUN_LastBus.slice(2, 4)}:00`
      : x.service_id == "WD"
      ? `${x.WD_LastBus.slice(0, 2)}:${x.WD_LastBus.slice(2, 4)}:00`
      : "",
  departure_time: (x) =>
    x.service_id === "SAT"
      ? `${x.SAT_LastBus.slice(0, 2)}:${x.SAT_LastBus.slice(2, 4)}:00`
      : x.service_id == "SUN"
      ? `${x.SUN_LastBus.slice(0, 2)}:${x.SUN_LastBus.slice(2, 4)}:00`
      : x.service_id == "WD"
      ? `${x.WD_LastBus.slice(0, 2)}:${x.WD_LastBus.slice(2, 4)}:00`
      : "",
  stop_id: (x) => x.BusStopCode,
  stop_sequence: (x) => x.StopSequence,
  shape_dist_traveled: (x) => x.Distance,
};

export const _iterator = (
  stops: DataMallBusStop[],
  routes: DataMallBusRoute[],
  services: DataMallBusService[]
) => {
  return routes
    .map((route) => [
      ...(route.WD_LastBus != "-"
        ? [
            {
              ...route,
              trip_id: `${route.ServiceNo}_${route.Direction}_WD`,
              service_id: "WD",
            },
          ]
        : []),
      ...(route.SAT_LastBus != "-"
        ? [
            {
              ...route,
              trip_id: `${route.ServiceNo}_${route.Direction}_SAT`,
              service_id: "SAT",
            },
          ]
        : []),
      ...(route.SUN_LastBus != "-"
        ? [
            {
              ...route,
              trip_id: `${route.ServiceNo}_${route.Direction}_SUN`,
              service_id: "SUN",
            },
          ]
        : []),
    ])
    .reduce((a, c) => [...a, ...c], []);
};
