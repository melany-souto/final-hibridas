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

//CRUD 
export async function getBoardById(id) {
    await connect();

    const boards = await db.collection("boards").aggregate([
        { $match: { _id: new ObjectId(id), eliminado: { $ne: true } } },
        {
            $lookup: {
                from: "users",
                localField: "sharedWith",
                foreignField: "_id",
                as: "sharedWithUsers"
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "ownerInfo"
            }
        },
        {
            $project: {
                title: 1,
                state: 1,
                recipes: 1,
                owner: 1,
                sharedWith: 1,
                sharedWithUsers: { name: 1, email: 1 },
                "sharedWithUsers._id":1,
                ownerInfo: { name: 1, email: 1 }
            }
        }
    ]).toArray();

    return boards[0];
}

export async function getBoardsByUser(userId) {
    await connect();

    const objectUserId = new ObjectId(userId);

    return db.collection("boards")
        .find({
            $and: [
                { $or: [{ eliminado: false }, { eliminado: { $exists: false } }] },
                {
                    $or: [
                        { owner: objectUserId },
                        { sharedWith: objectUserId }
                    ]
                }
            ]
        })
        .toArray();
}

export async function createBoard(board) {
    await connect();
    return db.collection("boards").insertOne(board);
}

export async function updateBoard(id, board) {
    await connect();
    return db.collection("boards").updateOne(
        { _id: new ObjectId(id) },
        { $set: board }
    );
}

export async function addRecipeToBoard(boardId, recipeId) {
    await connect();

    // console.log(typeof boardId, boardId);       
    // console.log(typeof recipeId, recipeId);     
    // console.log(new ObjectId(recipeId));        
    return db.collection("boards").updateOne(
        { _id: new ObjectId(boardId) },
        { $addToSet: { recipes: new ObjectId(recipeId) } }
    )
}

export async function editBoardState(id, newState) {
    await connect();

    return db.collection("boards").updateOne(
        { _id: new ObjectId(id) },
        { $set: { state: newState } }
    );
}

export async function deleteBoardLog(id) {
    await connect();
    return db.collection("boards").updateOne(
        { _id: new ObjectId(id) },
        { $set: { eliminado: true } }
    );
}

//  Compartir
export async function getBoardsShared(userId) {
    await connect();
    return db.collection("boards").find({
        sharedWith: new ObjectId(userId),
        eliminado: { $ne: true }
    }).toArray();
}

export async function shareBoard(boardId, targetUserId) {
    await connect();
    return db.collection("boards").updateOne(
        { _id: new ObjectId(boardId) },
        { $addToSet: { sharedWith: new ObjectId(targetUserId) } }
    );
}

export async function unshareBoard(boardId, targetUserId) {
    await connect();
    return db.collection("boards").updateOne(
        { _id: new ObjectId(boardId) },
        { $pull: { sharedWith: new ObjectId(targetUserId) } }
    );
}
