const url = "http://localhost:3333/api";

export function call({ uri, method = "GET", body = undefined }) {
    const token = JSON.parse(localStorage.getItem("token"))
    //  const token = localStorage.getItem("token");


    return fetch(`${url}/${uri}`, {
        method, //method: method
        headers: {
            "Content-Type": "application/json",
            "Authorization": token ? `Bearer ${token}` : ""
        },
        body: body ? JSON.stringify(body) : undefined
    })
        .then(async (res) => {
            if (!res.ok) {
                if (res.status === 401) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("session");
                    window.location.href = "/login";
                }
                const error = await res.json();
                throw { status: res.status, ...error };
            }
            return res.json()
        })
}

//     return fetch(`${url}/${uri}`, {
//         method, //method: method
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": "Bearer " + token
//         },
//         body: body ? JSON.stringify(body) : undefined
//     })
//     .then( async res => {
//         if(!res.ok) throw await res.json()
//         return res.json()
//     } )
// } 