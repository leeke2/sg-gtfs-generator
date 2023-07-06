import { XMLParser } from "fast-xml-parser";
import got from "got";
import fs from "fs";
export async function fetchDatamall(endpoint, params = {}) {
    async function _fetch(skip = 0) {
        return got
            .get(`http://datamall2.mytransport.sg/ltaodataservice/${endpoint}`, {
            headers: {
                AccountKey: process.env.DATAMALL_ACCOUNT_KEY,
            },
            searchParams: {
                $skip: `${skip}`,
            },
        })
            .json();
    }
    let skip = 0;
    let data = [];
    while (true) {
        const newData = await _fetch(skip);
        if (newData.value.length == 0) {
            break;
        }
        data = [...data, ...newData.value];
        skip += 500;
    }
    return data;
}
export async function fetchLta(endpoint) {
    const parser = new XMLParser({
        attributeNamePrefix: "",
        ignoreAttributes: false,
        parseAttributeValue: false,
        allowBooleanAttributes: true,
    });
    return got
        .get(`https://www.lta.gov.sg/map/busService/${endpoint}.xml`)
        .text()
        .then((data) => parser.parse(data));
}
export async function downloadKml(serviceNo, direction, outputDir) {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const url = `https://www.lta.gov.sg/map/busService/bus_route_kml/${serviceNo}-${direction}.kml`;
    const fileName = `${outputDir}/${serviceNo}-${direction}.kml`;
    const downloadStream = got.stream(url);
    const fileWriterStream = fs.createWriteStream(fileName);
    downloadStream.on("error", (error) => {
        console.error(`Download failed: ${serviceNo}-${direction} ${error.message}`);
    });
    fileWriterStream.on("error", (error) => {
        console.error(`Could not write file to system: ${error.message}`);
    });
    downloadStream.pipe(fileWriterStream);
    await delay(1000);
}
