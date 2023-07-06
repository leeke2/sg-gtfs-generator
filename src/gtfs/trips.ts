import {
  DataMallBusRoute,
  DataMallBusService,
  DataMallBusStop,
} from "../types.js";

export const _columns: { [key: string]: any } = {
  route_id: "",
  service_id: "",
  trip_id: "",
  trip_headsign: "", // TODO
  trip_short_name: "",
  direction_id: "",
  block_id: "",
  shape_id: "", // TODO
  wheelchair_accessible: "",
  bikes_allowed: "",
};

export const _map: {
  [key: string]: (
    x: DataMallBusRoute & { trip_id: string; service_id: string }
  ) => any;
} = {
  route_id: (x) => x.ServiceNo,
  service_id: (x) => x.service_id,
  trip_id: (x) => x.trip_id,
  direction_id: (x) => (x.Direction === 1 ? "0" : "1"),
};

export const _iterator = (
  stops: DataMallBusStop[],
  routes: DataMallBusRoute[],
  services: DataMallBusService[]
) => {
  return routes
    .filter((route) => route.StopSequence === 1)
    .map((route) => [
      ...(route.WD_FirstBus != "-"
        ? [
            {
              ...route,
              trip_id: `${route.ServiceNo}_${route.Direction}_WD`,
              service_id: "WD",
            },
          ]
        : []),
      ...(route.SAT_FirstBus != "-"
        ? [
            {
              ...route,
              trip_id: `${route.ServiceNo}_${route.Direction}_SAT`,
              service_id: "SAT",
            },
          ]
        : []),
      ...(route.SUN_FirstBus != "-"
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
