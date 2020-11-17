import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AdminRoute from "./AdminRoute";

import HomePage from "../components/HomePage";
import UploadForm from "../components/UploadForm";
import Login from "../components/Login";
import Signup from "../components/Signup";
import AllComics from "../components/AllComics";

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
            <Route exact path="/all">
                <AllComics></AllComics>
            </Route>
            <AdminRoute exact path="/upload">
                <UploadForm />
            </AdminRoute>
            <Redirect to="/" />
        </Switch>
    );
};

export default Routes;
