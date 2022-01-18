import React, { lazy, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import PaperPlaneLottie from "../components/PaperPlaneLottie";

import AdminRoute from "./AdminRoute";
import AuthRoute from "./AuthRoute";

import Login from "../components/Login";
import Signup from "../components/Signup";
import HomePage from "../components/HomePage";

// import PrivacyPolicy from "../components/PrivacyPolicy";
// import Secret from "../components/Secret";
// import VerifyUser from "../components/VerifyUser";
// import ResendEmailForm from "../components/ResendEmailForm";
// import ResetPasswordForm from "../components/ResetPasswordForm";

// import AdminPortal from "../components/AdminPortal";
// import Favorites from "../components/Favorites";
// import AllComics from "../components/AllComics";
// import UploadForm from "../components/UploadForm";

const AdminPortal = lazy(() => import("../components/AdminPortal"));
const Favorites = lazy(() => import("../components/Favorites"));
const AllComics = lazy(() => import("../components/AllComics"));
const UploadForm = lazy(() => import("../components/UploadForm"));
const PrivacyPolicy = lazy(() => import("../components/PrivacyPolicy"));
const Secret = lazy(() => import("../components/Secret"));
const VerifyUser = lazy(() => import("../components/VerifyUser"));
const ResendEmailForm = lazy(() => import("../components/ResendEmailForm"));
const ResetPasswordForm = lazy(() => import("../components/ResetPasswordForm"));
const CardGame = lazy(() => import("../components/CardGame/CardGame"));
const AskGrubby = lazy(() => import("../components/FoodAdvice/AskGrubby"));

const Routes = () => {
    return (
        <Suspense fallback={<PaperPlaneLottie delay={800} />}>
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
                <Route exact path="/privacy">
                    <PrivacyPolicy />
                </Route>
                <Route exact path="/secret">
                    <Secret />
                </Route>
                <Route path="/verify/:status">
                    <VerifyUser />
                </Route>
                <Route exact path="/resend-email">
                    <ResendEmailForm type="verification" />
                </Route>
                <Route exact path="/reset">
                    <ResendEmailForm type="password" />
                </Route>
                <Route path="/reset-password/:id/:token">
                    <ResetPasswordForm type="password" />
                </Route>
                <Route exact path="/all">
                    <AllComics />
                </Route>
                <Route exact path="/trivia">
                    <CardGame />
                </Route>
                {/* <Route exact path="/food-advice">
                    <AskGrubby />
                </Route> */}
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
        </Suspense>
    );
};

export default Routes;
