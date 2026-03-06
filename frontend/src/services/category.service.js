import { call } from "./api.service";

export async function getCategories(filter = {}) {
  try {
    // Convertimos el filter en query string
    const query = new URLSearchParams(filter).toString();
    const uri = query ? `categories?${query}` : "categories";

    const data = await call({ uri, method: "GET" });
    return data || [];
  } catch (err) {
    console.error("Error en fectch de categories:", err);
    return [];
  }
}
