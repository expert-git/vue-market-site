// import * as firebase from "firebase/app";
export const getDocument = async (queryString: string) => {
	const firebase = await import("firebase/app");

	await import("firebase/firestore");

	const firebaseApp = firebase.initializeApp({
		projectId: "driven-manifest-244106",
	});

	const db = await firebaseApp.firestore();

	const document = await db.collection("searches")
		.doc(queryString).get();

	return document.data();
};

