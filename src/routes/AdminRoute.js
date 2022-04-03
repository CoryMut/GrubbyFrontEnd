import React, { useContext } from "react";
import { UserContext } from "../components/UserContext";
import Lottie from "lottie-react";
import purplePlaneData from "../lotties/purple-plane.json";
import { useNavigate } from "react-router-dom";

function AdminRoute({ children }) {
    const navigate = useNavigate();
    const { isAdmin, isLoading, isLoggedIn } = useContext(UserContext);

    if (!isLoggedIn && !isLoading) {
        navigate("/login");
        return;
    } else if (!isAdmin && !isLoading) {
        navigate("/");
        return;
    }

    if (isLoading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", height: "100vh", alignItems: "center" }}>
                <Lottie animationData={purplePlaneData} height={400} width={400} />
            </div>
        );
    }

    return children;
}

export default AdminRoute;
