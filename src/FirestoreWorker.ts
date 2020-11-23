// import * as firebase from "firebase/app";

import firebase from 'firebase/app';
import("firebase/auth");
import("firebase/firestore");

const firebaseApp = firebase.initializeApp(require('./firebase.json'));


export const getSearchDoc = async (queryString: string) => {
	try {

		const db = await firebaseApp.firestore();

		const document = await db.collection("searches")
			.doc(queryString).get();

		return document.data();
	} catch (e) {
		console.log(`error ${e}`);
		return null;
	}
};

export const getStatsDoc = async (queryString: string) => {
	try {


		const db = await firebaseApp.firestore();
		const temp = await db.collection("search_stats")
			.doc(queryString);

		// console.log(temp.path);

		const document = await temp.get();

		return document.data();
	} catch (e) {
		console.log(`error ${e}`);
		return null;
	}
};

export const getRates = async (rate: string) => {
	try {
		const db = await firebaseApp.firestore();
		const temp = await db.collection("rates").doc(rate);
		const document = await temp.get();

		return document.data();
	} catch (e) {
		console.log(`error ${e}`);
		return null;
	}
};

export const signUp = async (obj : any, origin : string) => {
	try {
		const db = await firebaseApp.firestore();
		const user = await firebaseApp.auth().createUserWithEmailAndPassword(obj.email, obj.password);
		await user.user.updateProfile({displayName: obj.fname});
		const actionCodeSettings = {
			url: origin + '/login'
		};
		await user.user.sendEmailVerification(actionCodeSettings);
		delete obj.password;
		await db.collection("users").doc(user.user.uid).set(obj);
		return;
	} catch (e) {
		console.log(`error ${e}`);
		throw `${e}`;
	}
};

export const signIn = async (email: string, password: string) => {
	try {
		const user = await firebaseApp.auth().signInWithEmailAndPassword(email, password);
		const userObj =	user.user;
		if (!(userObj.emailVerified)) {
			throw "Email not verified. Please, check your email and use verification link"
		}

		return {user: {fname : userObj.displayName}};
	} catch (e) {
		console.log(`error ${e}`);
		throw `${e}`;
	}
};

export const signOut = async () => {
	try {
		await firebaseApp.auth().signOut();
		return {success: true};
	} catch (e) {
		console.log(`error ${e}`);
		return {success: false, message: e.message};
	}
};


