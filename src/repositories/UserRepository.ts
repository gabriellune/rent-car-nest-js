import { Firestore } from "@google-cloud/firestore";
import { User } from "src/models/User";
import { FirestoreInstance } from "./config/FirestoreInstance";

export class UserRepository {

    private readonly nameCollection: string = "user"
    private firebaseDb: Firestore = FirestoreInstance.getInstance()

    constructor() { }

    async create(payload: User): Promise<void> {
        await this.firebaseDb.collection(this.nameCollection).add(payload)
    }

    async findByEmail(email: string): Promise<User> {
        const docRef = this.firebaseDb.collection(this.nameCollection)
            .where("email", "==", email)

        const user = await docRef.get()

        if (user.empty) {
            return null
        }

        return user.docs[0].data() as User
    }
}