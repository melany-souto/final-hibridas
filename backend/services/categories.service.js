import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient("mongodb+srv://admin:admin@hibridas.h7zhmni.mongodb.net/");
const db = client.db("AH2023");

let isConnected = false;
async function connect() {
    if (!isConnected) {
        await client.connect();
        isConnected = true;
    }
}

export async function getCategories(filters = {}) {
    const filterMongoDB = { eliminado: { $ne: true }, ...filters };
    await connect();
    return db.collection("categories").find(filterMongoDB).toArray();
}
