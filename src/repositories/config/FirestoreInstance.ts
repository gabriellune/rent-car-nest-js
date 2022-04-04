import { Firestore } from "@google-cloud/firestore";
import * as admin from "firebase-admin";

const credential = require('../../../credential.json')

export class FirestoreInstance {

    private static instance: FirestoreInstance = new FirestoreInstance()

    private firestore: Firestore;

    constructor() {
        admin.initializeApp({
            credential: admin.credential.cert(credential)
        });
        this.firestore = admin.firestore();
        this.firestore.settings({
            ignoreUndefinedProperties: true
        })
    }

    public static getInstance(): Firestore {
        return this.instance.firestore;
    }
}