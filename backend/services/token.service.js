
import { MongoClient, ObjectId } from "mongodb"
import jwt from "jsonwebtoken"

const client= new MongoClient ("mongodb+srv://admin:admin@hibridas.h7zhmni.mongodb.net/");
const db= client.db ("AH2023");
const tokens = db.collection("tokens");

const SECRET_KEY = "SecretKey"

let isConnected = false; 

async function connect(){
    if(!isConnected){
        await client.connect();
        isConnected=true;
    }
}

export async function createToken(user){
    await connect();

    const userTok = { id: user._id, email: user.email}
    const token = jwt.sign(userTok, SECRET_KEY, { expiresIn: "1d", })

    await tokens.updateOne(
        { user_id: user._id },
        { $set: { token: token, user_id: user._id }},
        { upsert: true }
    );

    return token;
}


// export function validateToken(token){
//     try{
//         return jwt.verify(token, SECRET_KEY);
//     } catch ( error ) {
//         return null;
//     }
// }


export async function validateToken(token) {
    try {
        await connect();
        const playload = jwt.verify(token, SECRET_KEY);
        const session = await tokens.findOne({ token: token, user_id: new ObjectId(playload.id) });

        if (!session) throw new Error("Token inválido");

        if (playload.exp < (new Date().getTime() / 1000)) throw new Error("Token expirado");

        return playload;
    } catch (error) {
        return null;
    }
}