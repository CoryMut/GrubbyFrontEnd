import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AdminRoute from "./AdminRoute";
import AuthRoute from "./AuthRoute";

import UploadForm from "../components/UploadForm";
import Login from "../components/Login";
import Signup from "../components/Signup";
import AllComics from "../components/AllComics";
import HomePage from "../components/HomePage";
import AdminPortal from "../components/AdminPortal";
import Favorites from "../components/Favorites";

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
            <AuthRoute exact path="/favorites">
                <Favorites />
            </AuthRoute>
            <AdminRoute exact path="/upload">
                <UploadForm />
            </AdminRoute>
            <AdminRoute exact path="/admin">
                <AdminPortal />
            </AdminRoute>
            <Redirect to="/" />
        </Switch>
    );
};

export default Routes;
