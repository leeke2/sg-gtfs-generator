function getMeanFrequency(f) {
    const out = Math.trunc((f
        .split("-")
        .map((x) => x.trim())
        .map((x) => parseInt(x))
        .reduce((a, c) => a + c, 0) /
        2.0) *
        60.0);
    if (isNaN(out)) {
        console.log(f);
    }
    return out;
}
export const _columns = {
    trip_id: "",
    start_time: "",
    end_time: "",
    headway_secs: "",
    exact_times: "",
};
export const _map = {
    trip_id: (x) => x.trip_id,
    start_time: (x) => x.start_time,
    end_time: (x) => x.end_time,
    departure_time: (x) => x.end_time,
    headway_secs: (x) => x.headway,
};
export const _iterator = (stops, routes, services) => {
    return routes
        .filter((route) => route.StopSequence === 1)
        .map((route) => {
        let out = [];
        let service = services.filter((service) => service.ServiceNo == route.ServiceNo &&
            service.Direction == route.Direction)[0];
        const days = ["WD", "SAT", "SUN"];
        const periods = {
            AM_Peak: ["06:30:00", "08:30:00"],
            AM_Offpeak: ["08:31:00", "16:59:00"],
            PM_Peak: ["17:00:00", "19:00:00"],
            PM_Offpeak: ["19:01:00", "27:00:00"],
        };
        for (const day of days) {
            for (const period of Object.keys(periods)) {
                if (route[`${day}_FirstBus`] === "-") {
                    continue;
                }
                if (service[`${period}_Freq`] === "-") {
                    continue;
                }
                if (period === "AM_Peak") {
                    // For services that start before am peak period
                    const firstBus = parseInt(route[`${day}_FirstBus`]);
                    if (firstBus < 630 && service.AM_Offpeak_Freq != "-") {
                        const headway = getMeanFrequency(service.AM_Offpeak_Freq);
                        const firstBusStr = route[`${day}_FirstBus`];
                        out.push({
                            ...route,
                            trip_id: `${route.ServiceNo}_${route.Direction}_${day}`,
                            service_id: day,
                            start_time: `${firstBusStr.slice(0, 2)}:${firstBusStr.slice(2, 4)}:00`,
                            end_time: "06:29:00",
                            headway: headway,
                        });
                    }
                }
                const headway = getMeanFrequency(service[`${period}_Freq`]);
                if (period === "PM_Offpeak") {
                    const lastBus = route[`${day}_LastBus`];
                    out.push({
                        ...route,
                        trip_id: `${route.ServiceNo}_${route.Direction}_${day}`,
                        service_id: day,
                        start_time: periods[period][0],
                        end_time: `${lastBus.slice(0, 2)}:${lastBus.slice(2, 4)}:00`,
                        headway: headway,
                    });
                }
                else {
                    out.push({
                        ...route,
                        trip_id: `${route.ServiceNo}_${route.Direction}_${day}`,
                        service_id: day,
                        start_time: periods[period][0],
                        end_time: periods[period][1],
                        headway: headway,
                    });
                }
            }
        }
        return out;
    })
        .reduce((a, c) => [...a, ...c], []);
};
