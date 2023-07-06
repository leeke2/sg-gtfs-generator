#!/usr/bin/env node

// import yargs from "yargs";
// import { hideBin } from "yargs/helpers";

import { fetchDatamall } from "./api.js";
import fs from "fs";
import { URL } from "url";
import { MapFunction, MapArguments } from "./types.js";
import archiver from "archiver";

// yargs(hideBin(process.argv))
//   // Use the commands directory to scaffold.
//   .commandDir("commands")
//   // Enable strict mode.
//   .strict()
//   // Useful aliases.
//   .alias({ h: "help" }).argv;

const stops = await fetchDatamall("BusStops");
console.log(stops.filter((stop) => stop.BusStopCode === "03371"));

// const routes = await fetchDatamall("BusRoutes");
// const services = await fetchDatamall("BusServices");

// const zipPath = new URL("../output/sg-gtfs.zip", import.meta.url).pathname;
// const output = fs.createWriteStream(zipPath);
// const archive = archiver("zip", { zlib: { level: 9 } });

// // listen for all archive data to be written
// // 'close' event is fired only when a file descriptor is involved
// output.on("close", function () {
//   console.log(archive.pointer() + " total bytes");
//   console.log(
//     "archiver has been finalized and the output file descriptor has closed."
//   );
// });

// // This event is fired when the data source is drained no matter what was the data source.
// // It is not part of this library but rather from the NodeJS Stream API.
// // @see: https://nodejs.org/api/stream.html#stream_event_end
// output.on("end", function () {
//   console.log("Data has been drained");
// });

// // good practice to catch warnings (ie stat failures and other non-blocking errors)
// archive.on("warning", function (err) {
//   if (err.code === "ENOENT") {
//     // log warning
//   } else {
//     // throw error
//     throw err;
//   }
// });

// // good practice to catch this error explicitly
// archive.on("error", function (err) {
//   throw err;
// });

// // pipe archive data to the file
// archive.pipe(output);

// const gtfsTemplatePath = new URL("./gtfs", import.meta.url).pathname;
// fs.readdir(gtfsTemplatePath, async (err, files) => {
//   await Promise.all(
//     files.map(async (file) => {
//       const f = await import(
//         new URL(`./gtfs/${file}`, import.meta.url).pathname
//       );
//       const headers = Object.keys(f._columns)
//         .map((item) => item as string)
//         .join(",");

//       const rows = f
//         ._iterator(stops, routes, services)
//         .map((args: MapArguments) => {
//           let out = { ...f._columns };

//           for (const [column, fn] of Object.entries(f._map)) {
//             out[column] = (fn as MapFunction)(args);
//           }

//           return Object.keys(f._columns)
//             .map((key) => out[key] as string)
//             .join(",");
//         });

//       archive.append([headers, ...rows].join("\r\n"), {
//         name: file.replace(".js", ".txt"),
//       });
//     })
//   );
//   // finalize the archive (ie we are done appending files but streams have to finish yet)
//   // 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
//   archive.finalize();
// });
