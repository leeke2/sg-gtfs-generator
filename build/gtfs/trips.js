export const _columns = {
    route_id: "",
    service_id: "",
    trip_id: "",
    trip_headsign: "",
    trip_short_name: "",
    direction_id: "",
    block_id: "",
    shape_id: "",
    wheelchair_accessible: "",
    bikes_allowed: "",
};
export const _map = {
    route_id: (x) => x.ServiceNo,
    service_id: (x) => x.service_id,
    trip_id: (x) => x.trip_id,
    direction_id: (x) => (x.Direction === 1 ? "0" : "1"),
};
export const _iterator = (stops, routes, services) => {
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
