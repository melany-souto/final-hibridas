// import { call } from "./api.service";

// // Si quieres filtrar categorías desde el backend, puedes pasar filter={} (por ahora lo ignoramos)
// export async function getCategories(filter = {}) {
//   try {
//     const data = await call({ uri: "categories", method: "GET" });
//     return data || [];
//   } catch (err) {
//     console.error("Error fetching categories:", err);
//     return [];
//   }
// }

import { call } from "./api.service";

export async function getCategories(filter = {}) {
  try {
    // Convertimos el filter en query string
    const query = new URLSearchParams(filter).toString(); // { type: "vegan" } => "type=vegan"
    const uri = query ? `categories?${query}` : "categories";

    const data = await call({ uri, method: "GET" });
    return data || [];
  } catch (err) {
    console.error("Error fetching categories:", err);
    return [];
  }
}
