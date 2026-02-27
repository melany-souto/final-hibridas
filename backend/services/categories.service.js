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

// export async function getCategoryById(id) {
//     await connect();
//     return db.collection("categories").findOne({ _id: new ObjectId(id) });
// }

// export async function createCategory(category) {
//     await connect();
//     return db.collection("categories").insertOne(category);
// }

// export async function updateCategory(id, category) {
//     await connect();
//     return db.collection("categories").updateOne(
//         { _id: new ObjectId(id) },
//         { $set: category }
//     );
// }

// export async function deleteCategoryLog(id) {
//     await connect();
//     return db.collection("categories").updateOne(
//         { _id: new ObjectId(id) },
//         { $set: { eliminado: true } }
//     );
// }