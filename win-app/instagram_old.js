"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const child_process_1 = require("child_process");
const config = require("./config.json");
const firestore_1 = require("@google-cloud/firestore");
const parse = require("csv-parse/lib/es5/sync");
// import * as lodash from 'lodash';
// import * as path from "path";
const execAsync = util_1.promisify(child_process_1.execFile);
process.on('unhandledRejection', function (err, promise) {
    console.error('Unhandled rejection (promise: ', promise, ', reason: ', err, ').');
});
const db = new firestore_1.Firestore(config);
const fallback = async (data) => {
    await db.collection("searches").doc(data.q).update({
        finished: true,
        instagram: {
            data: [],
            finished: true,
        },
        resultData: [],
        resultTotal: 0,
        updatedAt: (+new Date())
    });
};
const clean = (records) => {
    return records.filter(function (record) {
        if (record && record.Image && record.Image.length > 0 &&
            record["Profile Url"] && record["Profile Url"].includes('instagram.com')) {
            return true;
        }
    });
};
const runPDI = async (query) => {
    const csvParseOptions = {
        columns: true,
        skip_empty_lines: true,
        trim: true,
        strict: false,
        skip_lines_with_error: true,
    };
    try {
        const output = (await execAsync(`C:/xlib/pdi/pdi.exe "${query}" -p`, { shell: true })).stdout.trim();
        console.log("profiles found for " + query + ": " + output.length + "\n}");
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
        stores = stores.filter(store => {
            return store.profile != null && store.profile.trim() !== "" && store.products.length > 0;
        });
        return stores;
    }
    catch (e) {
        const success = (e.code === 1 && e.stderr === '');
        if (success) {
            console.log(JSON.stringify(e));
            return [];
        }
        else {
            console.log(JSON.stringify(e));
            return [];
        }
    }
};
db.collection('searches')
    .where('instagram.finished', '==', false)
    .onSnapshot(function (snapshot) {
    snapshot.docChanges().forEach(async function (changedDoc) {
        if (changedDoc.type === 'added') {
            const { q: q } = changedDoc.doc.data();
            if (q) {
                const queryClean = q.replace(/[^A-Za-z0-9 ]/g, '');
                console.log('searching instagram for ', q);
                const instagramResults = await runPDI(queryClean);
                console.log("results found for " + q + ": " + instagramResults.length);
                await db.collection("searches").doc(q).update({
                    instagram: {
                        count: instagramResults.length,
                        data: instagramResults,
                        finished: true,
                    },
                }).catch((err) => console.error(err));
            }
        }
    });
});
