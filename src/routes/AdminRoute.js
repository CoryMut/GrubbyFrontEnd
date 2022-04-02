import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import { UserContext } from "../components/UserContext";
import Lottie from "lottie-react";
import purplePlaneData from "../lotties/purple-plane.json";

function AdminRoute({ exact, path, children }) {
    const { isAdmin, isLoading, isLoggedIn } = useContext(UserContext);

    if (!isLoggedIn && !isLoading) {
        return <Navigate to="/login?d=upload"></Navigate>;
    } else if (!isAdmin && !isLoading) {
        return <Navigate to="/"></Navigate>;
    }

    return (
        <div>
            {isLoading && (
                <div style={{ display: "flex", justifyContent: "center", height: "100vh", alignItems: "center" }}>
                    <Lottie animationData={purplePlaneData} height={400} width={400} />
                </div>
            )}
            {!isLoading && isAdmin && (
                <Route exact={exact} path={path}>
                    {children}
                </Route>
            )}
        </div>
    );
}

export default AdminRoute;
