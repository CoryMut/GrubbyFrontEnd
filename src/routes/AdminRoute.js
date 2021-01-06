import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../components/UserContext";
import Lottie from "lottie-react";
import purplePlaneData from "../lotties/purple-plane.json";

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
                    <Lottie animationData={purplePlaneData} height={400} width={400} />
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
