import { call } from "./api.service"

export async function getUsers(filter={}){
    return call({ uri: `users`, method: "GET"})
}

export async function getUserById(id) {
    return call({ uri: `users/${id}`, method: "GET" })
}

export async function saveUser(user){
    return call({ uri: `users`, method: "POST", body: user })
}

export async function editUser(user, id){
    return call({ uri: `users/${id}`, method: "PUT", body: user })
}

export async function editPartialUser(user, id){
    return call({ uri: `users/${id}`, method: "PATCH", body: user })
}

export async function deleteUserLog(id){
    return call({ uri: `users/${id}`, method: "DELETE" })
}






// export async function addToFav(idUser, idStudy){
//     return call({ uri: `users/${idUser}`, method: "POST", body: idStudy })
// }

// export async function getFavs(user){
//     return call({ uri: `users/${user}`, method: "GET" })
// }


// route.get("/:idUser/favoritos", controller.getFavs)
// route.post("/:idUser/favoritos", controller.addToFav)