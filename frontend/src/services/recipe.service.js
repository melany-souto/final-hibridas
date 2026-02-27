import { call } from "./api.service.js"

// export async function getRecipes( filter = "" ){
//     const uri = filter
//         ?`recipes?categoryId=${filter}`
//         : `recipes`;
//     return call({ uri, method: "GET"})
// }

export async function getRecipes(categoryId = "") {
  const uri = categoryId ? `recipes?categoryId=${categoryId}` : `recipes`;
  return call({ uri, method: "GET" });
}

export async function getRecipesByUser(userId) {
    return call({ uri: `recipes/users/${userId}`, method: "GET"})
}

export async function getRecipeById(id) {
    return call({ uri: `recipes/${id}`, method: "GET"})
}

export async function createRecipe(recipe){
    return call({ uri: `recipes`, method: "POST", body: recipe })
}

export async function editRecipe(recipe, id){
    return call({ uri: `recipes/${id}`, method: "PUT", body: recipe})
}

export async function editPartialRecipe(id, recipe){
    return call({ uri: `recipes/${id}`, method: "PATCH", body: recipe})
}

export async function deleteRecipeLog(id){
    return call({ uri: `recipes/${id}`, method: "DELETE"})
   
}


