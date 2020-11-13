import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../components/UserContext";
import Lottie from "react-lottie";
import purplePlaneData from "../lotties/purple-plane.json";

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: purplePlaneData,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
    },
};

function AdminRoute({ exact, path, children }) {
    const { isAdmin, isLoading, isLoggedIn } = useContext(UserContext);

    if (!isLoggedIn && !isLoading) {
        return <Redirect to="/login?d=upload"></Redirect>;
    } else if (!isAdmin && !isLoading) {
        return <Redirect to="/"></Redirect>;
    }

    return (
        <>
            {isLoading && (
                <div>
                    <Lottie options={defaultOptions} height={400} width={400} />
                </div>
            )}
            {!isLoading && isAdmin && (
                <Route exact={exact} path={path}>
                    {children}
                </Route>
            )}
        </>
    );
}

export default AdminRoute;
