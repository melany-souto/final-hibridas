import { call } from "./api.service.js"

export async function getBoardById(id) {
    const uri = `boards/${id}`;
    return call({ uri, method: "GET" });
}

export async function getBoardsByUser(userId) {
    return call({ uri: `boards/user/${userId}`, method: "GET" })
}

export async function createBoard(board) {
    return call({ uri: `boards`, method: "POST", body: board })
}

export async function updateBoard(board, id) {
    return call({ uri: `boards/${id}`, method: "PUT", body: board })
}

export async function editPartialBoard(id, board) {
    return call({ uri: `boards/${id}`, method: "PATCH", body: board })
}

export async function deleteBoardLog(id) {
    return call({ uri: `boards/${id}`, method: "DELETE" })
}

export async function addRecipeToBoard(boardId, recipeId) {
    return call({ uri: `boards/${boardId}/recipes`, method: "PUT", body: { recipeId } });
}

export async function editBoardState(boardId, newState) {
    return call({ uri: `boards/${boardId}/state`, method: "PATCH", body: { state: newState } })
}

//compartir

export async function getBoardShared(userId) {
    return call({ uri: `boards/share/${userId}`, method: "GET" })
}

// export async function sharedBoard(boardId, targetUserId){
//     return call({uri: `boards/${boardId}/share`, method: "POST", body: { targetUserId}})
// }

export async function sharedBoard(boardId, email, token) {
    return call({
        uri: `boards/${boardId}/share`,
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: { email }
    });
}

export async function unshareBoard(boardId, targetUserId) {
    return call({ uri: `boards/${boardId}/share`, method: "DELETE", body: { targetUserId } })
}


