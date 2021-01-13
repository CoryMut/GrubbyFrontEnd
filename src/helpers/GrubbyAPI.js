import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5000";

export async function registerUser(data) {
    try {
        let result = await axios.post(`${BASE_URL}/user/register`, data);

        let { token } = result.data;
        saveToLocalStorage("_token", token);

        return result.data;
    } catch (error) {
        console.error("API Error:", error.response);
        let message = error.response.data.error.message;
        throw message;
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
        console.log(error.response.data.error.message);
        // let message = error.response.data.message;
        let message = error.response.data.error.message;
        console.log(message);
        throw message;
        // throw Array.isArray(message) ? message : [message];
    }
}

export async function logoutUser() {
    try {
        await axios.get(`${BASE_URL}/logout`, { withCredentials: true });
        return;
    } catch (error) {
        console.error(error);
        return;
    }
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

export async function getLatestComic() {
    try {
        let result = await axios.get(`${BASE_URL}/comic/latest`);
        return result.data.comic;
    } catch (error) {
        console.error("API Error:", error.response);
    }
}

export async function getAllComics(page) {
    try {
        let result = await axios.get(`${BASE_URL}/comic/all?page=${page}`, { withCredentials: true });
        return result.data;
    } catch (error) {
        console.error("API Error:", error.response);
    }
}

export async function getAllAdminComics() {
    try {
        let result = await axios.get(`${BASE_URL}/admin/comics`, { withCredentials: true });
        return result.data;
    } catch (error) {
        console.error("API Error:", error.response);
    }
}

export async function getPreviousComic(id) {
    try {
        let result = await axios.get(`${BASE_URL}/comic/${id}`);
        return result.data.comic;
    } catch (error) {
        console.error("API Error:", error.response);
    }
}

export async function getCharacters() {
    try {
        let result = await axios.get(`${BASE_URL}/comic/characters`, { withCredentials: true });
        return result.data;
    } catch (error) {
        console.error("API Error:", error.response);
        return;
    }
}

export async function searchComics(searchTerm, page = 1) {
    try {
        let result = await axios.get(
            `${BASE_URL}/comic/search`,
            {
                params: {
                    searchTerm,
                    page,
                },
            },
            { withCredentials: true }
        );
        return result.data;
    } catch (error) {
        console.error("API Error:", error.response);
        return;
    }
}

export async function updateComic(comic_id, data) {
    try {
        let result = await axios.patch(`${BASE_URL}/comic/${comic_id}`, { data: data }, { withCredentials: true });
        return result.data;
    } catch (error) {
        console.error("API Error:", error.response);
        return;
    }
}

export async function getGlobalEmote(emotes, id) {
    try {
        let labels = [];
        emotes.forEach((emote) => {
            labels.push(emote.label);
        });
        labels = labels.join("&");
        let result = await axios.get(`${BASE_URL}/comic/${id}/emotes`, {
            params: {
                labels,
            },
        });
        console.log(result);
        return result.data.emotes;
    } catch (error) {
        console.error("API Error:", error.response);
        return;
    }
}

export async function getUserEmoteData(id, user) {
    try {
        let result = await axios.get(`${BASE_URL}/comic/${id}/${user}`);
        return result.data.reaction;
    } catch (error) {
        console.error("API Error:", error.response);
        return;
    }
}

export async function sendUserEmoteData(data) {
    try {
        let { id, user } = data;
        let result = await axios.post(`${BASE_URL}/comic/${id}/${user}`, { data });
        return result.data.reaction;
    } catch (error) {
        console.error("API Error:", error.response);
        return;
    }
}

export async function updateUserEmoteData(data) {
    try {
        let { id, user } = data;
        let result = await axios.patch(`${BASE_URL}/comic/${id}/${user}`, { data });
        return result.data.reaction;
    } catch (error) {
        console.error("API Error:", error.response);
        return;
    }
}

export async function deleteReaction(data) {
    try {
        let { id, user } = data;
        await axios.delete(`${BASE_URL}/comic/${id}/${user}`, { data });
        return;
    } catch (error) {
        console.error("API Error:", error.response);
        return;
    }
}

export async function deleteComic(comic_id) {
    try {
        let result = await axios.delete(`${BASE_URL}/comic/${comic_id}`);
        return result.message;
    } catch (error) {
        console.error("API Error:", error.response);
        return;
    }
}

export async function createFavorite(comic_id, username) {
    try {
        let result = await axios.post(`${BASE_URL}/comic/${comic_id}/favorite/${username}`);
        return result.message;
    } catch (error) {
        console.error("API Error:", error.response);
        return;
    }
}

export async function getFavoriteStatus(comic_id, username) {
    try {
        let result = await axios.get(`${BASE_URL}/comic/${comic_id}/favorite/${username}`);
        return result.data;
    } catch (error) {
        console.error("API Error:", error.response);
        return;
    }
}

export async function deleteFavorite(comic_id, username) {
    try {
        let result = await axios.delete(`${BASE_URL}/comic/${comic_id}/favorite/${username}`);
        return result.message;
    } catch (error) {
        console.error("API Error:", error.response);
        return;
    }
}

export async function getFavorites(username) {
    try {
        let result = await axios.get(`${BASE_URL}/user/favorites/${username}`);
        return result.data.favorites;
    } catch (error) {
        console.error("API Error:", error.response);
        return;
    }
}

export async function googleLogin(idToken) {
    try {
        let result = await axios.post(`${BASE_URL}/auth/google`, { token: idToken });
        let { token } = result.data;
        saveToLocalStorage("_token", token);

        return result.data;
    } catch (error) {
        console.error("API Error:", error.response);
        let message = error.response.data.message;
        throw Array.isArray(message) ? message : [message];
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
