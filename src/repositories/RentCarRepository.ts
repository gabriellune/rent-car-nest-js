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

    async getCarByCode(registerCode: number): Promise<Car> {
        const docRef = this.firebaseDb.collection(this.nameCollection)
        .where("registerCode", "==", registerCode)

        const car = await docRef.get()

        if (car.empty) {
            return null
        }
        return car.docs[0].data() as Car
    }

    async rentOrGiveBackCar(car: Car): Promise<any> {
        const docRef = await this.firebaseDb.collection(this.nameCollection)

        docRef.doc(car.registerCode.toString()).update(JSON.parse(JSON.stringify(car)))
    }

    async listAvailable(): Promise<Car[]> {
        const docRef = this.firebaseDb.collection(this.nameCollection)
        .where("available", "==", true)

        const cars = await docRef.get()

        if (cars.empty) {
            return null
        }

        return cars.docs.map(c => c.data() as Car)
    }

    async createCar(payload: Car): Promise<void> {
        await this.firebaseDb.collection(this.nameCollection).doc(payload.registerCode.toString()).set(payload)
    }

    async checkUserHasRentedCar(email: string): Promise<Car> {
        const docRef = this.firebaseDb.collection(this.nameCollection)
        .where("rentBy", "==", email)

        const car = await docRef.get()

        if (car.empty) {
            return null
        }
        return car.docs[0].data() as Car
    }
}