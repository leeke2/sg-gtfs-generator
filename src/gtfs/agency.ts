import {
  DataMallBusRoute,
  DataMallBusService,
  DataMallBusStop,
} from "../types.js";

function hashmap(mapping: { [key: string]: any }) {
  return (x: string) => mapping[x];
}

export const _columns: { [key: string]: any } = {
  agency_id: "",
  agency_name: "",
  agency_url: "",
  agency_timezone: "Asia/Singapore",
  agency_lang: "en-SG",
  agency_phone: "",
  agency_fare_url: "",
  agency_email: "",
};

export const _map: { [key: string]: (x: string) => string | undefined } = {
  agency_id: (x) => x,
  agency_name: hashmap({
    GAS: "Go Ahead Singapore",
    SBST: "SBS Transit",
    SMRT: "SMRT Corporation",
    TTS: "Tower Transit Singapore",
  }),
  agency_url: hashmap({
    GAS: "https://go-aheadsingapore.com/",
    SBST: "https://www.sbstransit.com.sg/",
    SMRT: "https://www.smrt.com.sg/",
    TTS: "https://towertransit.sg/",
  }),
  agency_phone: hashmap({
    GAS: "1800-812-6469",
    SBST: "1800-287-2727",
    SMRT: "1800-336-8900",
    TTS: "1800-248-0950",
  }),
};

export const _iterator = (
  stops: DataMallBusStop[],
  routes: DataMallBusRoute[],
  services: DataMallBusService[]
) => {
  return [...new Set(services.map((service) => service.Operator))];
};
