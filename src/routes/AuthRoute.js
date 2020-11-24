import React from "react";
import { Route } from "react-router-dom";

function AuthRoute({ exact, path, children }) {
    return (
        <>
            <Route exact={exact} path={path}>
                {children}
            </Route>
        </>
    );
}

export default AuthRoute;
