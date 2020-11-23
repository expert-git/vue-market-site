"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parse = require("csv-parse/lib/es5/sync");
const { workerData, parentPort } = require('worker_threads');
const util = require('util');
const execAsync = util.promisify(require('child_process').execFile);
const query = workerData;
const csvParseOptions = {
    columns: true,
    skip_empty_lines: true,
    trim: true,
    strict: false,
    skip_lines_with_error: true,
};
const clean = (records) => {
    return records.filter(function (record) {
        if (record && record.Image && record.Image.length > 0 &&
            record["Profile Url"] && record["Profile Url"].includes('instagram.com')) {
            return true;
        }
    });
};
(async function () {
    try {
        const output = (await execAsync(`C:/xlib/pdi/pdi.exe "${query}" -p`, { shell: true })).stdout.trim();
        const profiles = output.toString().split('\n');
        let stores = await Promise.all(profiles.map(async (profile) => {
            try {
                if (profile != null && profile.trim().length > 0) {
                    const response = (await execAsync(`C:/xlib/pdi/pdi.exe "${profile.trim()}" 10`, { shell: true })).stdout;
                    return {
                        profile: profile,
                        products: clean(parse(response, csvParseOptions)),
                    };
                }
                else {
                    return {
                        profile: null,
                        products: [],
                    };
                }
            }
            catch (e) {
                return {
                    profile: null,
                    products: [],
                };
            }
        }));
        const results = stores.filter(store => {
            // @ts-ignore
            return store.profile != null && store.profile.trim() !== "" && store.products.length > 0;
        });
        parentPort.postMessage({ results: results });
    }
    catch (e) {
        throw e;
    }
})();