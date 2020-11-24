import axios from "axios";

export async function getDadJoke() {
    try {
        const result = await axios.get("https://icanhazdadjoke.com/", { headers: { Accept: "text/plain" } });
        return result.data;
    } catch (error) {
        console.error(error);
        throw Error(error);
    }
}
