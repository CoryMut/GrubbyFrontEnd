import axios from "axios";
const BASE_URL = process.env.REACT_APP_SERVER_URL;
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID || "something_secret_and_secure_for_clients";

axios.defaults.headers.common["Authorization"] = CLIENT_ID;
axios.defaults.withCredentials = true;

export async function getLeaderboardData() {
    try {
        let result = await axios.get(`${BASE_URL}/trivia`);
        return result.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function updateLeaderboardData(data) {
    try {
        let result = await axios.put(`${BASE_URL}/trivia`, data);
        return result.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getUserInfo(id) {
    try {
        let result = await axios.get(`${BASE_URL}/trivia/${id}`);
        return result.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getQuestion() {
    try {
        let result = await axios.get(`${BASE_URL}/trivia/question`);
        return result.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function addUserToLeaderboard(id, name) {
    try {
        let result = await axios(`${BASE_URL}/trivia/add`, {
            method: "post",
            data: { id: id, name: name },
            withCredentials: true,
        });
        return result.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
