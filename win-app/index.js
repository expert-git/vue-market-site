"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const child_process_1 = require("child_process");
const config = require("./config.json");
const firestore_1 = require("@google-cloud/firestore");
const parse = require("csv-parse/lib/es5/sync");
const lodash = require("lodash");
const path = require("path");
const execAsync = util_1.promisify(child_process_1.execFile);
const errorLog = require('log-to-file');
process.on('unhandledRejection', function (err, promise) {
    console.error('Unhandled rejection (promise: ', promise, ', reason: ', err, ').');
});
const db = new firestore_1.Firestore(config);
const basePath = "C:/xlib/";
const fallback = (data) => {
    db.collection("searches").doc(data.q).update({
        finished: true,
        resultData: [],
        resultTotal: 0,
        updatedAt: (+new Date())
    }).catch((err) => console.error(err));
};
const updateStat = (data, cleanRecords, benchmark, meta) => {
    db.collection("hits").add({
        q: data.q,
        meta,
        winAppTime: benchmark,
        totalResponseTime: 0,
        shopsDistribution: {
            aeononlineshopping: cleanRecords.filter(rec => rec.shop === 'aeononlineshopping').length,
            baganmart: cleanRecords.filter(rec => rec.shop === 'baganmart').length,
            bigc: cleanRecords.filter(rec => rec.shop === 'bigc').length,
            delishop: cleanRecords.filter(rec => rec.shop === 'delishop').length,
            epasarcambodia: cleanRecords.filter(rec => rec.shop === 'epasarcambodia').length,
            jd: cleanRecords.filter(rec => rec.shop === 'jd').length,
            larue: cleanRecords.filter(rec => rec.shop === 'larue').length,
            lazada: cleanRecords.filter(rec => rec.shop === 'lazada').length,
            shopcom: cleanRecords.filter(rec => rec.shop === 'shopcom').length,
            shopee: cleanRecords.filter(rec => rec.shop === 'shopee').length,
            tokopedia: cleanRecords.filter(rec => rec.shop === 'tokopedia').length,
            yangonbay: cleanRecords.filter(rec => rec.shop === 'yangonbay').length,
        },
        timestamp: (+new Date())
    }).catch((err) => console.error(err));
};
const runECommerceExe = async (path, query) => {
    const cmd = `${path} "${query}" 1`;
    try {
        return await execAsync(cmd, { shell: true });
    }
    catch (e) {
        const success = (e.code === 1 && e.stderr === '');
        if (success) {
            return e;
        }
        else {
            errorLog(JSON.stringify(e));
            return null;
        }
    }
};
const clean = (records) => {
    return records.filter(function (record) {
        if (record && record.Url) {
            return true;
        }
    }).map((record) => {
        if (record['price Show'] && record['price Show'] !== undefined) {
            record['price Show'] = record['price Show'].replace(/[^0-9]/g, '');
        }
        else
            record['price Show'] = 0;
        record.shop = '';
        if (record.Url.includes('aeononlineshopping')) {
            record.shop = 'aeononlineshopping';
        }
        //bagan
        else if (record.Url.includes('baganmart')) {
            record.shop = 'baganmart';
        }
        // bigc
        else if (record.Url.includes('bigc.co')) {
            record.shop = 'bigc';
        }
        // delishop
        else if (record.Url.includes('delishop')) {
            record.shop = 'delishop';
        }
        // epasar
        else if (record.Url.includes('epasarcambodia')) {
            record.shop = 'epasarcambodia';
        }
        // jd's
        else if (record.Url.includes('jd.co.th')) {
            record.shop = 'jd.co.th';
        }
        else if (record.Url.includes('jd.id')) {
            record.shop = 'jd.id';
        }
        // lazada's
        else if (record.Url.includes('lazada.co.id')) {
            record.shop = 'lazada.co.id';
        }
        else if (record.Url.includes('lazada.com.my')) {
            record.shop = 'lazada.com.my';
        }
        else if (record.Url.includes('lazada.com.ph')) {
            record.shop = 'lazada.com.ph';
        }
        // larue
        else if (record.Url.includes('larue')) {
            record.shop = 'larue';
        }
        // shopcom
        else if (record.Url.includes('shop.com')) {
            record.shop = 'shopcom';
        }
        // shopee's
        else if (record.Url.includes('shopee.co.id')) {
            record.shop = 'shopee.co.id';
        }
        else if (record.Url.includes('shopee.co.th')) {
            record.shop = 'shopee.co.th';
        }
        else if (record.Url.includes('shopee.ph')) {
            record.shop = 'shopee.ph';
        }
        // tokopedia
        else if (record.Url.includes('tokopedia')) {
            record.shop = 'tokopedia';
        }
        // yangonbay
        else if (record.Url.includes('yangonbay')) {
            record.shop = 'yangonbay';
        }
        return record;
    });
};
const getMeta = (records, benchmark, ip) => {
    const getPriceLow = (records) => {
        const res = lodash.maxBy(records, (p) => parseInt(p['price Show']));
        return (res ? res['price Show'] : 0);
    };
    const getPriceHigh = (records) => {
        const res = lodash.minBy(records, (p) => parseInt(p['price Show']));
        return (res ? res['price Show'] : 0);
    };
    const getPriceAvg = (records) => {
        const cleanRecords = records.filter(p => Boolean(parseInt(p['price Show'])));
        const res = lodash.meanBy(cleanRecords, (p) => parseInt(p['price Show']));
        return (res ? res : 0);
    };
    const getHitsExact = (records) => {
        return 0;
    };
    const getHitsPartial = (records) => {
        return 0;
    };
    const getHitsNA = (records) => {
        return 0;
    };
    // console.log("ip address: " + ip);
    let meta = {
        meta: {
            benchmark: benchmark,
            price: {
                low: getPriceLow(records) || 0,
                high: getPriceHigh(records) || 0,
                avg: getPriceAvg(records) || 0,
            },
            hits: {
                exact: getHitsExact(records) || 0,
                partial: getHitsPartial(records) || 0,
                na: getHitsNA(records) || 0
            }
        }
    };
    if (ip && ip.toString() != "") {
        // @ts-ignore
        meta.meta.ip = ip;
    }
    return meta;
};
const insertGlobal = async (data) => {
    const start = +new Date();
    const queryClean = data.q.replace(/[^A-Za-z0-9 ]/g, '');
    const pedaPath = path.resolve(basePath, 'peda/peda.exe');
    const pedbPath = path.resolve(basePath, 'pedb/pedb.exe');
    let pedaTemp = await runECommerceExe(pedaPath, queryClean);
    const pedaOutput = pedaTemp ? pedaTemp.stdout : [];
    let pedbTemp = await runECommerceExe(pedbPath, queryClean);
    const pedbOutput = pedbTemp ? pedbTemp.stdout : [];
    // const pdiOutput = (await runECommerceExe(pdiPath, queryClean)).stdout;
    if (pedaOutput === null && pedbOutput === null) {
        return;
    }
    let options = {
        columns: true,
        skip_empty_lines: true,
        trim: true,
        strict: false,
        skip_lines_with_error: true,
    };
    const pedaRecords = clean(parse(pedaOutput, options));
    const pedbRecords = clean(parse(pedbOutput, options));
    // const pdiRecords = clean(parse(pdiOutput, options));
    //console.log(pedaRecords);
    const cleanRecords = pedaRecords.concat(pedbRecords);
    const benchmark = (((+new Date()) - start) / 1000);
    console.log(`finish search global in ${benchmark.toString()} seconds. Found ${cleanRecords.length}records. [${data.q}]`);
    const meta = getMeta(cleanRecords, benchmark, data.meta.ip);
    updateStat(data, cleanRecords, benchmark, meta);
    (await db.collection("searches").doc(data.q).update({
        finished: true,
        resultData: cleanRecords,
        resultTotal: cleanRecords.length,
        updatedAt: (+new Date()),
        meta: meta,
    }).catch((err) => console.error(err)));
};
db.collection('searches').where('finished', '==', false).onSnapshot(function (snapshot) {
    snapshot.docChanges().forEach(function (changedDoc) {
        if (changedDoc.type === 'added') {
            console.log('start ', changedDoc.doc.data().q);
            insertGlobal(changedDoc.doc.data()).catch((err) => console.error(err));
        }
    });
});
