import { call } from "./api.service"

export function registerUser({ email, password }) {
    return call({
        uri: "auth/register",
        method: "POST",
        body: { email, password }
    });
}

// LOGIN
export async function loginUser({ email, password }) {
    return call({
        uri: "auth/login",
        method: "POST",
        body: { email, password }
    })
}