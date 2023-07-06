export type LtaEndpoint = "bus_stops" | "bus_services";
export type DataMallEndpoint = "BusStops" | "BusRoutes" | "BusServices";
export type DataMallObject<T> = T extends "BusStops"
  ? DataMallBusStop
  : T extends "BusRoutes"
  ? DataMallBusRoute
  : T extends "BusServices"
  ? DataMallBusService
  : never;

export type DataMallBusStop = {
  BusStopCode: BusStopCode;
  RoadName: string;
  Description: string;
  Latitude: number;
  Longitude: number;
};

export type DataMallBusRoute = {
  ServiceNo: string;
  Operator: string;
  Direction: Direction;
  StopSequence: number;
  BusStopCode: BusStopCode;
  Distance: number;
  WD_FirstBus: Time;
  WD_LastBus: Time;
  SAT_FirstBus: Time;
  SAT_LastBus: Time;
  SUN_FirstBus: Time;
  SUN_LastBus: Time;
};

export type DataMallBusService = {
  ServiceNo: string;
  Operator: string;
  Direction: Direction;
  Category: string;
  OriginCode: BusStopCode;
  DestinationCode: BusStopCode;
  AM_Peak_Freq: Frequency;
  AM_Offpeak_Freq: Frequency;
  PM_Peak_Freq: Frequency;
  PM_Offpeak_Freq: Frequency;
  LoopDesc: string;
};

export type DataMallJsonResponse = {
  "odata.metadata": string;
  value: DataMallBusRoute[] | DataMallBusService[] | DataMallBusStop[];
};

export type Time = string;
export type Direction = 1 | 2;
export type BusStopCode = string;
export type Frequency = string;

export type MapArguments = any;
export type MapFunction = (args: MapArguments) => any;
