import React, { lazy, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

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
// const AskGrubby = lazy(() => import("../components/FoodAdvice/AskGrubby"));

const AppRoutes = () => {
    return (
        <Suspense fallback={<PaperPlaneLottie delay={800} />}>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/secret" element={<Secret />} />
                <Route path="/verify/:status" element={<VerifyUser />} />
                <Route path="/resend-email" element={<ResendEmailForm type="verification" />} />
                <Route path="/reset" element={<ResendEmailForm type="password" />} />
                <Route path="/reset-password/:id/:token" element={<ResendEmailForm type="password" />} />
                <Route path="/all" element={<AllComics />} />
                <Route path="/trivia" element={<CardGame />} />
                <Route
                    path="/favorites"
                    element={
                        <AuthRoute>
                            <Favorites />
                        </AuthRoute>
                    }
                />
                {/* <AuthRoute path="/favorites" element={<Favorites />} /> */}
                {/* <AdminRoute path="/upload" element={<UploadForm />} />
                <AdminRoute path="/admin" element={<AdminRoute />} /> */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
