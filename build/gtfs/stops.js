export const _columns = {
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
export const _map = {
    stop_id: (x) => x.BusStopCode,
    stop_name: (x) => x.Description,
    stop_desc: (x) => (x.RoadName !== x.Description ? x.RoadName : ""),
    stop_lat: (x) => x.Latitude,
    stop_lon: (x) => x.Longitude,
};
export const _iterator = (stops, routes, services) => {
    return stops;
};
