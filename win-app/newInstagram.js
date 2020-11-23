"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = require("./config.json");
const firestore = require("@google-cloud/firestore");
const { Worker } = require('worker_threads');
const db = new firestore.Firestore(config);
let i = 0;
db.collection('searches')
    .where('instagram.finished', '==', false)
    .onSnapshot(function (snapshot) {
    snapshot.docChanges().forEach(async function (changedDoc) {
        if (changedDoc.type === 'added' && i <= 10) {
			i = i + 1;
            const { q: q } = changedDoc.doc.data();
            if (q) {
                const queryClean = q.replace(/[^A-Za-z0-9 ]/g, '');
                console.log('searching instagram for ', q);
                await new Promise((resolve, reject) => {
                    const worker = new Worker('./instagram_worker.js', { query: queryClean });
                    worker.on('message', async (msg) => {
                        await db.collection("searches").doc(q).update({
                            instagram: {
                                count: msg.results.length,
                                data: msg.results,
                                finished: true,
                            },
                        }).catch((err) => console.error(err));
                    });
                });
            }
        }
    });
});
