import { MongoClient, ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import { createToken } from "./token.service.js";

const client = new MongoClient("mongodb+srv://admin:admin@hibridas.h7zhmni.mongodb.net/");
const db = client.db("AH2023");

let isConnected = false;
async function connect() {
    if (!isConnected) {
        await client.connect();
        isConnected = true;
    }
}

//register, login y logout

export async function registerUser({ email, password, name, bio, avatar }) {
    await connect();

    const existingUser = await getUserByEmail(email);
    if (existingUser) throw new Error("El email ya fue utilizado");

    const hashedPass = await bcrypt.hash(password, 10);

    const newUser = {
        email,
        password: hashedPass,
        name: name || "",
        bio: bio || "",
        avatar: avatar || null,
        eliminado: false,
        boards: [],
        createdAt: new Date(),
    };

    await createUser(newUser);

    return { email, name, avatar };
}

export async function loginUser({ email, password }) {
    await connect();

    // console.log("Login request:", { email, password });

    const user = await getUserByEmail(email);
    console.log(" User from DB:", user);

    if (!user) throw new Error("Usuario no encontrado");

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) throw new Error("Credenciales inválidas");

    const token = await createToken(user);

    return {
        ...user,
        password: undefined,
        token,
    };
}

export async function logoutUser(id) {
    await connect();
    return db.collection("users").updateOne({ _id: new ObjectId(id) }, { $set: { token: null } })
}

export async function getAllUsers() {
    const filterMongoDB = { eliminado: { $ne: true } };
    
    await connect();
    return db.collection("users").find(filterMongoDB).toArray()
}

export async function getUserById(id) {
    await connect();
    return db.collection("users").findOne({ _id: new ObjectId(id) })
}

export async function getUserByEmail(email) {
    await connect();
    return db.collection("users").findOne({ email, eliminado: { $ne: true } });
}

export async function createUser(user) {
    await connect();
    return db.collection("users").insertOne(user)
}

// export async function updateUser(id, user){
//     await connect();
//     return db.collection("users").updateOne( { _id: new ObjectId(id) }, { $set: user })
// }

export async function updateUser(id, userData) {
    await connect();

    // Filtrar campos que NO están vacíos
    const dataToUpdate = {};
    if (userData.name) dataToUpdate.name = userData.name;
    if (userData.avatar) dataToUpdate.avatar = userData.avatar;
    if (userData.bio) dataToUpdate.bio = userData.bio;

    // Actualizarlos campos con contenido
    const result = await db
        .collection("users")
        .updateOne({ _id: new ObjectId(id) }, { $set: dataToUpdate });

    return result;
}

export async function deleteUserLog(id) {
    await connect()
    return db.collection("users").updateOne({ _id: new ObjectId(id) }, { $set: { eliminado: true } })
}