
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

export async function getAllRecipes(filter = {}) {
    const filterMongoDB = { eliminado: { $ne: true } };

    if (filter.categoryId != undefined) {
        filterMongoDB.categoryId = new ObjectId(filter.categoryId);
    }

    if (filter.difficulty != undefined) {
        filterMongoDB.difficulty = filter.difficulty;
    }

    if (filter.cook_time != undefined) {
        filterMongoDB.cook_time = filter.cook_time;
    }

    if (filter.title && filter.title.trim() !== "") {
        filterMongoDB.title = { $regex: filter.title, $options: 'i' };
    }

    // console.log("FILTRO FINAL MONGO:", filterMongoDB);

    await connect();
    return db.collection("recipes").find(filterMongoDB).toArray()

}

// export async function getRecipeById(id) {
//     await connect();
//     return db.collection("recipes").findOne({ _id: new ObjectId(id) })
// }

export async function getRecipeById(id) {
    await connect();

    const recipe = await db.collection("recipes").findOne({
        _id: new ObjectId(id),
        eliminado: { $ne: true }
    });

    if (!recipe) return null;

    const user = await db.collection("users").findOne({
        _id: new ObjectId(recipe.userId)
    });

    return {
        ...recipe,
        user: user
            ? {
                _id: user._id,
                name: user.name || null,
                email: user.email
            }
            : null
    };
}

export async function getRecipesByUser(userId) {
    await connect();
    return db.collection("recipes")
        .find({ 
            userId: new ObjectId(userId),
            eliminada: { $ne: true }
         })
        .toArray()
}

export async function createRecipe(recipe) {
    await connect();
    return db.collection("recipes").insertOne(recipe)
}

export async function updateRecipe(id, recipe) {
    await connect();
    return db.collection("recipes").updateOne({ _id: new ObjectId(id) }, { $set: recipe });
}

export async function deleteRecipeLog(id) {
    await connect()
    return db.collection("recipes").updateOne({ _id: new ObjectId(id) }, { $set: { eliminado: true } })
}
