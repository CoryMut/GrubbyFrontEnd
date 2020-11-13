import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5000";

export async function registerUser(data) {
    try {
        let result = await axios.post(`${BASE_URL}/user/register`, data);
        return result;
    } catch (error) {
        console.error("API Error:", error.response);
        let message = error.response.data.message;
        throw Array.isArray(message) ? message : [message];
    }
}

export async function loginUser(data) {
    try {
        let result = await axios(`${BASE_URL}/login`, {
            method: "post",
            data: data,
            withCredentials: true,
        });
        let { token } = result.data;
        saveToLocalStorage("_token", token);

        return result.data;
    } catch (error) {
        console.error("API Error:", error.response);
        let message = error.response.data.message;
        throw Array.isArray(message) ? message : [message];
    }
}

export async function logoutUser() {
    await axios.get(`${BASE_URL}/logout`, { withCredentials: true });
    return;
}

export async function getUserInfo(username) {
    try {
        let user = await axios.get(`${BASE_URL}/user/${username}`);
        return user;
    } catch (error) {
        console.error("API Error:", error.response);
        let message = error.response.data.message;
        throw Array.isArray(message) ? message : [message];
    }
}

export async function checkTokenStatus(token) {
    try {
        let result = await axios.post(`${BASE_URL}/checkToken`, { _token: token }, { withCredentials: true });
        return result.data;
    } catch (error) {
        console.error("API Error:", error.response);
        let message = error.response.data.error;
        // throw Array.isArray(message) ? message : [message];
        throw message;
    }
}

const saveToLocalStorage = (name, data) => {
    try {
        window.localStorage.setItem(name, data);
        return;
    } catch (error) {
        console.log("error saving to local storage");
        return;
    }
};
