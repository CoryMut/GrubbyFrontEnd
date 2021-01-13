import React, { useState, useEffect, useCallback } from "react";
import { checkTokenStatus, getFavorites } from "../helpers/GrubbyAPI";
import { useHistory } from "react-router-dom";

const UserContext = React.createContext({
    isLoggedIn: false,
    isAdmin: false,
    handleAdmin: () => {},
    token: null,
    login: () => {},
    logout: () => {},
    isLoading: true,
    favorites: [],
    setFavorites: () => {},
    favLoading: true,
    recentLogin: false,
    setRecentLogin: () => {},
    recentLogout: false,
    setRecentLogout: () => {},
    displayName: null,
    setDisplayName: () => {},
});

function UserProvider(props) {
    const history = useHistory();
    const [token, setToken] = useState(null);
    const [admin, setAdmin] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [favorites, setFavorites] = useState([]);
    const [favLoading, setFavLoading] = useState(true);
    const [recentLogin, setRecentLogin] = useState(false);
    const [recentLogout, setRecentLogout] = useState(false);
    const [displayName, setDisplayName] = useState(null);

    const login = useCallback((token) => {
        setToken(token);
        setRecentLogout(false);
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setAdmin(false);
        setIsLoading(true);
        setUser(null);
        setFavorites([]);
        setRecentLogout(true);
        localStorage.removeItem("_token");
        history.push("/");
    }, [history]);

    const handleAdmin = (status) => {
        setAdmin(status);
    };

    const handleUser = (username, name) => {
        setUser(() => username);
        setDisplayName(() => name);
    };

    const handleLoading = (status) => {
        setTimeout(() => {
            setIsLoading(status);
        }, 800);
    };

    useEffect(() => {
        const storedData = localStorage.getItem("_token");

        login(storedData);
        async function statusCheck() {
            try {
                const storedData = localStorage.getItem("_token");

                login(storedData);
                if (!storedData) {
                    throw Error("No token");
                }
                let result = await checkTokenStatus(storedData);
                handleUser(result.user, result.name);
                handleAdmin(result.isAdmin);
                handleLoading(false);
                return;
            } catch (error) {
                if (error.status === 401) {
                    logout();
                }
                handleLoading(false);
                return;
            }
        }
        statusCheck();
    }, [login, logout]);

    useEffect(() => {
        async function checkFavorites() {
            if (!user) {
                return;
            } else if (user) {
                try {
                    let userFavorites = await getFavorites(user);
                    setFavorites(() => userFavorites);
                    setFavLoading(() => false);
                } catch (error) {
                    console.log(error);
                    return;
                }
            }
        }

        checkFavorites();
    }, [user]);

    return (
        <UserContext.Provider
            value={{
                isLoggedIn: Boolean(token),
                isAdmin: admin,
                handleAdmin: handleAdmin,
                login: login,
                logout: logout,
                isLoading: isLoading,
                user: user,
                handleUser: handleUser,
                favorites: favorites,
                setFavorites: setFavorites,
                favLoading: favLoading,
                recentLogin: recentLogin,
                setRecentLogin: setRecentLogin,
                recentLogout: recentLogout,
                setRecentLogout: setRecentLogout,
                displayName: displayName,
                setDisplayName: setDisplayName,
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider };
