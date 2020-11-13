import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import HomePage from "../components/HomePage";
import UploadForm from "../components/UploadForm";
import Login from "../components/Login";
import Signup from "../components/Signup";

import AdminRoute from "./AdminRoute";

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/">
                <HomePage />
            </Route>
            <Route exact path="/login">
                <Login></Login>
            </Route>
            <Route exact path="/signup">
                <Signup></Signup>
            </Route>
            <AdminRoute exact path="/upload">
                <UploadForm />
            </AdminRoute>
            <Redirect to="/" />
        </Switch>
    );
};

export default Routes;
