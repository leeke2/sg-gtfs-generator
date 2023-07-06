import {
  DataMallBusRoute,
  DataMallBusService,
  DataMallBusStop,
} from "../types.js";

function getDate(offsetDays: number = 0) {
  const date = new Date(
    new Date().getTime() + offsetDays * 24 * 60 * 60 * 1000
  );
  var mm = date.getMonth() + 1; // getMonth() is zero-based
  var dd = date.getDate();

  return [
    date.getFullYear(),
    (mm > 9 ? "" : "0") + mm,
    (dd > 9 ? "" : "0") + dd,
  ].join("");
}

export const _columns: { [key: string]: any } = {
  service_id: "",
  monday: "0",
  tuesday: "0",
  wednesday: "0",
  thursday: "0",
  friday: "0",
  saturday: "0",
  sunday: "0",
  start_date: getDate(),
  end_date: getDate(7),
};

export const _map: {
  [key: string]: (x: {
    service_id: string;
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  }) => any;
} = {
  service_id: (x) => x.service_id,
  monday: (x) => x.monday,
  tuesday: (x) => x.tuesday,
  wednesday: (x) => x.wednesday,
  thursday: (x) => x.thursday,
  friday: (x) => x.friday,
  saturday: (x) => x.saturday,
  sunday: (x) => x.sunday,
};

export const _iterator = (
  stops: DataMallBusStop[],
  routes: DataMallBusRoute[],
  services: DataMallBusService[]
) => {
  return [
    {
      service_id: "WD",
      monday: "1",
      tuesday: "1",
      wednesday: "1",
      thursday: "1",
      friday: "1",
      saturday: "0",
      sunday: "0",
    },
    {
      service_id: "SAT",
      monday: "0",
      tuesday: "0",
      wednesday: "0",
      thursday: "0",
      friday: "0",
      saturday: "1",
      sunday: "0",
    },
    {
      service_id: "SUN",
      monday: "0",
      tuesday: "0",
      wednesday: "0",
      thursday: "0",
      friday: "0",
      saturday: "0",
      sunday: "1",
    },
  ];
};
