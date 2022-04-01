import { Firestore } from "@google-cloud/firestore";
import { Car } from "src/models/Car";
import { FirestoreInstance } from "./config/FirestoreInstance";

export class RentCarRepository {

    private readonly nameCollection: string = "rent-car"
    private firebaseDb: Firestore = FirestoreInstance.getInstance()

    constructor() { }

    async listAll(): Promise<Car[]> {
        const docRef = this.firebaseDb.collection(this.nameCollection)

        const cars = await docRef.get()

        if (cars.empty) {
            return null
        }

        return cars.docs.map(c => c.data() as Car)
    }
}