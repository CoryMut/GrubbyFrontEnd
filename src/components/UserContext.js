import React, { useState, useEffect, useCallback } from "react";
import { checkTokenStatus } from "../helpers/GrubbyAPI";
import { useHistory } from "react-router-dom";

const UserContext = React.createContext({
    isLoggedIn: false,
    isAdmin: false,
    handleAdmin: () => {},
    token: null,
    login: () => {},
    logout: () => {},
    isLoading: true,
});

function UserProvider(props) {
    const history = useHistory();
    const [token, setToken] = useState(null);
    const [admin, setAdmin] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const login = useCallback((token) => {
        setToken(token);
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setAdmin(false);
        setIsLoading(true);
        setUser(null);
        localStorage.removeItem("_token");
        history.push("/");
    }, [history]);

    const handleAdmin = (status) => {
        setAdmin(status);
    };

    const handleUser = (username) => {
        setUser(username);
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
                handleUser(result.user);
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
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider };
