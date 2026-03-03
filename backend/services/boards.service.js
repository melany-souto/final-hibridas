
// import { MongoClient, ObjectId } from "mongodb";

// const client= new MongoClient ("mongodb+srv://admin:admin@hibridas.h7zhmni.mongodb.net/");
// const db= client.db ("AH2023");

// let isConnected = false;
// async function connect(){
//     if(!isConnected){
//         await client.connect();
//         isConnected = true;
//     }
// }

// // export async function getAllBoards( filter= {} ){
// //     const filterMongoDB = { eliminado: {$ne:true} };

// //     if (filter.name && filter.name.trim() !== "" ){
// //         filterMongoDB.name = {$regex:filter.name, $options: 'i'};
// //     }

// //     await connect();
// //     return db.collection("recipes").find(filterMongoDB).toArray()

// // }

// export async function getBoardById(id){
//     await connect();
//     return db.collection("boards").findOne( { _id: new ObjectId(id) } )
// }

// export async function getBoardsByUser(userId) {
//     await connect();
//     return db.collection("boards").find( { userId: userId } ).toArray()
// }

// export async function createBoard(board){
//     await connect();
//     return db.collection("boards").insertOne(board)
// }

// export async function updateBoard(id, board){
//     await connect();
//     return db.collection("boards").updateOne( { _id: new ObjectId(id) }, { $set:board })
// }

// export async function deleteBoardLog(id){
//     await connect()
//     return db.collection("boards").updateOne( { _id: new ObjectId(id) }, { $set: { eliminado:true } })
// }


// // funcion compartir

// export async function getBoardsShared( userId ) {
//     await connect();
//     return db.collection("boards").find({ 
//         sharedWith: userId,
//         eliminado: { $ne: true } 
//     }).toArray()
// }

// export async function shareBoard( boardId, targetUserId ) {
//     await connect();
//     return db.collection("boards").updateOne(
//         { _id: new ObjectId(boardId) },
//         { addToSet: {sharedWith: targetUserId } }
//     )
// }

// export async function unsharedBoard( boardId, targetUserId ) {
//     await connect();
//     return db.collection("boards").find(
//         { _id: new ObjectId(boardId) },
//         { $pull: { sharedWith: targetUserId } },
//     )
// }



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

// ─── CRUD ────────────────────────────────

export async function getBoardById(id) {
    await connect();
    return db.collection("boards").findOne({ _id: new ObjectId(id) });
}

export async function getBoardsByUser(userId) {
    await connect();
    return db.collection("boards")
        .find({
            owner: new ObjectId(userId),
            eliminado: { $ne: true }
        }).toArray();
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

    console.log(typeof boardId, boardId);       // debe ser string
    console.log(typeof recipeId, recipeId);     // debe ser string
    console.log(new ObjectId(recipeId));        // debe mostrar ObjectId válido
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

// ─── Compartir ───────────────────────────

export async function getBoardsShared(userId) {
    await connect();
    return db.collection("boards").find({
        sharedWith: new ObjectId(userId),
        eliminado: { $ne: true }
    }).toArray();
}

// export async function getBoardsShared(userId) {
//     await connect();
//     console.log("sharedWith:", board.sharedWith);
//     const boards = db.collection("boards").aggregate([
//         { $match: { 
//             sharedWith: new ObjectId(userId), 
//             eliminado: { $ne: true } 
//             } 
//         },
//         {
//             $lookup: {
//                 from: "users",
//                 localField: "owner",
//                 foreignField: "_id",
//                 as: "ownerInfo"
//             }
//         }
//     ]).toArray();
//     return boards;
// }

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
