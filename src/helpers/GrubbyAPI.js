import axios from "axios";

// const BASE_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5000";
const BASE_URL = process.env.REACT_APP_SERVER_URL;
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID || "something_secret_and_secure_for_clients";

axios.defaults.headers.common["Authorization"] = CLIENT_ID;
axios.defaults.timeout = 3000;

export async function registerUser(data) {
    try {
        let result = await axios.post(`${BASE_URL}/user/register`, data);

        // let { token } = result.data;
        // saveToLocalStorage("_token", token);

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
        // let message = error.response.data.message;
        let message = error.response.data.error.message;
        throw message;
        // throw Array.isArray(message) ? message : [message];
    }
}

export async function logoutUser() {
    try {
        await axios.get(`${BASE_URL}/logout`, { withCredentials: true });
        return;
    } catch (error) {
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

export async function getAllComics(offset, sort) {
    try {
        // let result = await axios.get(`${BASE_URL}/comic/all?page=${page}&sort=${sort}`, { withCredentials: true });
        let result = await axios.get(`${BASE_URL}/comic/all?offset=${offset}&sort=${sort}`, { withCredentials: true });

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

export async function getComic(id) {
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

export async function searchComics(searchTerm, currentCount = 0, sort = "false") {
    try {
        let result = await axios.get(
            `${BASE_URL}/comic/search`,
            {
                params: {
                    searchTerm,
                    offset: currentCount,
                    sort,
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
        let result = await axios.post(`${BASE_URL}/auth/google`, { token: idToken }, { withCredentials: true });
        let { token } = result.data;
        saveToLocalStorage("_token", token);

        return result.data;
    } catch (error) {
        console.error("API Error:", error.response);
        let message = error.response.data.message;
        throw Array.isArray(message) ? message : [message];
    }
}

export async function resendEmail(email) {
    try {
        let result = await axios.get(`${BASE_URL}/resend-email`, { params: { email } }, { withCredentials: true });

        return result.data;
    } catch (error) {
        console.error("API Error:", error.response);
        let message = error.response.data.error.message;
        throw Array.isArray(message) ? message : [message];
    }
}

export async function resendPassword(email) {
    try {
        let result = await axios.get(
            `${BASE_URL}/resend-email/password`,
            { params: { email } },
            { withCredentials: true }
        );
        return result.data;
    } catch (error) {
        console.error("API Error:", error.response);
        let message = error.response.data.error.message;
        throw Array.isArray(message) ? message : [message];
    }
}

export async function resetPassword(id, token, password) {
    try {
        let result = await axios.post(`${BASE_URL}/reset-password`, { id, token, password }, { withCredentials: true });
        return result.data;
    } catch (error) {
        console.error("API Error:", error.response);
        let message = error.response.data.error.message;
        throw Array.isArray(message) ? message : [message];
    }
}

export async function getComicInfo(id) {
    try {
        let result = await axios.get(`${BASE_URL}/comic/${id}`);
        return result.data.comic;
    } catch (error) {
        console.error("API Error:", error.response);
        return;
    }
}

const saveToLocalStorage = (name, data) => {
    try {
        window.localStorage.setItem(name, data);
        return;
    } catch (error) {
        console.error("error saving to local storage");
        return;
    }
};
