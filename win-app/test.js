const fs = require('fs');
const util = require('util');
const path = require('path');
const parse = require('csv-parse/lib/sync');
const {exec} = require('child_process');
const sleep = require('sleep-promise');
const config = require('./config');
const execAsync = util.promisify(require('child_process').execFile);
const block = require('cli-interact').question;
const errorLog = require('log-to-file');
const _ = require('lodash');
const moment = require('moment');

process.on('unhandledRejection', function(err, promise) {
  console.error('Unhandled rejection (promise: ', promise, ', reason: ', err, ').');
});


function removeDuplicates(myArr, prop) {
  return myArr.filter((obj, pos, arr) => {
    return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
  });
}

const Firestore = require('@google-cloud/firestore');
const db = new Firestore(config);

const app = async () => {
  const startTimestamp = () => {
    const m = moment().utcOffset(0);
    m.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    return parseInt(m.format('x'))
  };

  const endTimestamp = () => {
    const m = moment().utcOffset(0);
    m.set({ hour: 23, minute: 59, second: 59, millisecond: 0 });
    return parseInt(m.format('x'))
  };

  const hitsRef = db.collection('hits');
  const query = hitsRef.where('timestamp', '>', startTimestamp()).where('timestamp', '<', endTimestamp());
  const querySnapshot = await query.get();

  const docs = [];
  querySnapshot.forEach((doc) => docs.push(doc.data()));
  const qArr = docs.map(doc => doc.q);

  const docsUnique = removeDuplicates(docs, 'q');

  const qOccurrences = _.countBy(qArr);
  const countSorted = _.fromPairs(_.sortBy(_.toPairs(qOccurrences), 1).reverse());
  const first10 = {};
  let i = 0;
  for(let k in countSorted) {
    if(i === 20) break;

    first10[k] = countSorted[k];
    i++
  }

  let baganmartOccurrence = 0;
  let shopcomOccurrence = 0;
  let delishopOccurrence = 0;
  let shopeeOccurrence = 0;
  let tokopediaOccurrence = 0;
  let lazadaOccurrence = 0;

  for(let doc of docsUnique) {
    baganmartOccurrence = baganmartOccurrence + doc.shopsDistribution.baganmart;
    shopcomOccurrence = shopcomOccurrence + doc.shopsDistribution.shopcom;
    delishopOccurrence = delishopOccurrence + doc.shopsDistribution.delishop;
    shopeeOccurrence = shopeeOccurrence + doc.shopsDistribution.shopee;
    tokopediaOccurrence = tokopediaOccurrence + doc.shopsDistribution.tokopedia;
    lazadaOccurrence = lazadaOccurrence + doc.shopsDistribution.lazada
  }

  const data = {
    status: 'ok',
    dailyUsers: docs.length,
    top10: {
      monthly: ['test', 'test'],
      weekly: ['test', 'test'],
      yesterday: ['test', 'test'],
      daily: ['test', 'test']
    },
    todayStat: [
      {
        q: 'tea',
        shop: 'tokopedia',
        winAppTimeLow: 2000,
        winAppTimeHigh: 2000,
        winAppTimeAvg: 2000,
        loadingLow: 1000,
        loadingHigh: 1000,
        loadingAvg: 1000,
        priceLow: 1000,
        priceHigh: 1000,
        priceAvg: 1000,
        hitsExact: 1000,
        hitsPartial: 1000,
        hitsNA: 0
      }
    ],
    occurrences: {
      baganmartOccurrence: baganmartOccurrence,
      shopcomOccurrence: shopcomOccurrence,
      delishopOccurrence: delishopOccurrence,
      shopeeOccurrence,
      tokopediaOccurrence,
      lazadaOccurrence
    }
  }
};

/*const app = async () => {
  var searchesDelete = db.collection('searches').where('q','==', 'tea');
  await searchesDelete.get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      doc.ref.delete();
    });
  });
  var searchesDelete = db.collection('hits').where('q','==', 'tea');
  await searchesDelete.get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      doc.ref.delete();
    });
  });

  await db.collection("searches").doc('tea').create({
    q: 'tea',
    finished: false,
    resultData: [],
    meta: {
      ip: '35.34.12.12'
    }
  })
}*/

app().then(process.exit);
