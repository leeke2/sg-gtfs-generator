import {
  DataMallBusRoute,
  DataMallBusService,
  DataMallBusStop,
} from "../types.js";

export const _columns: { [key: string]: any } = {
  route_id: "",
  agency_id: "",
  route_short_name: "",
  route_long_name: "",
  route_desc: "",
  route_type: "3",
  route_url: "",
  route_color: "",
  route_text_color: "",
  route_sort_order: "",
  continuous_pickup: "",
  continuous_drop_off: "",
  network_id: "",
};

export const _map: { [key: string]: (x: DataMallBusService) => any } = {
  route_id: (x) => x.ServiceNo,
  agency_id: (x) => x.Operator,
  route_short_name: (x) => x.ServiceNo,
};

export const _iterator = (
  stops: DataMallBusStop[],
  routes: DataMallBusRoute[],
  services: DataMallBusService[]
) => {
  return services.filter((service) => service.Direction == 1);
};
