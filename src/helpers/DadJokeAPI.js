import axios from "axios";

export async function getDadJoke() {
    try {
        const instance = axios.create();
        delete instance.defaults.headers.common["Authorization"];
        const result = await instance.get("https://icanhazdadjoke.com/", { headers: { Accept: "text/plain" } });
        return result.data;
    } catch (error) {
        console.error(error);
        throw Error(error);
    }
}
