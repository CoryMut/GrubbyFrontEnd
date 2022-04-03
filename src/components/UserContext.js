import React, { useState, useEffect, useCallback } from "react";
import { checkTokenStatus, getFavorites } from "../helpers/GrubbyAPI";
import { useNavigate } from "react-router-dom";

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
    const navigate = useNavigate();
    const [token, setToken] = useState(null);
    const [admin, setAdmin] = useState(false);
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [favorites, setFavorites] = useState([]);
    const [favLoading, setFavLoading] = useState(true);
    const [recentLogin, setRecentLogin] = useState(false);
    const [recentLogout, setRecentLogout] = useState(false);
    const [displayName, setDisplayName] = useState(null);

    const login = useCallback((token) => {
        setToken(token);
        handleLoading(false);
        setRecentLogout(false);
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setAdmin(false);
        setIsLoading(true);
        setUser(null);
        setUserId(null);
        setFavorites([]);
        setRecentLogout(true);
        localStorage.removeItem("_token");
        navigate("/");
    }, [navigate]);

    const silentLogout = useCallback(() => {
        setToken(null);
        setAdmin(false);
        setIsLoading(true);
        setUser(null);
        setFavorites([]);
        localStorage.removeItem("_token");
        navigate("/");
    }, [navigate]);

    const handleAdmin = (status) => {
        setAdmin(status);
    };

    const handleUser = (username, name, id) => {
        setUser(() => username);
        setDisplayName(() => name);
        setUserId(() => id);
    };

    const handleLoading = (status) => {
        setTimeout(() => {
            setIsLoading(status);
        }, 800);
    };

    useEffect(() => {
        async function statusCheck() {
            try {
                const storedData = localStorage.getItem("_token");

                login(storedData);

                if (!storedData) {
                    return;
                }
                let result = await checkTokenStatus(storedData);
                handleUser(result.user, result.name, result.id);
                handleAdmin(result.isAdmin);
                handleLoading(false);
                return;
            } catch (error) {
                silentLogout();
                handleLoading(false);
                return;
            }
        }
        statusCheck();
    }, [login, logout, silentLogout]);

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
                    console.error(error);
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
                userId: userId,
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
