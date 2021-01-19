import React from "react";
import { Route, useHistory } from "react-router-dom";

function AuthRoute({ exact, path, children }) {
    const history = useHistory();
    if (!localStorage.getItem("_token")) {
        history.push("/");
    }
    return (
        <Route exact={exact} path={path}>
            {children}
        </Route>
    );
}

export default AuthRoute;
