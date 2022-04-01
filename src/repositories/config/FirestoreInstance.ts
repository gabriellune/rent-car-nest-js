import * as admin from "firebase-admin"
import { Firestore } from "@google-cloud/firestore";
import { Environment } from "roit-environment"

const credential = require('../../../' + Environment.getProperty('credential'))

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