import { useNavigate } from "react-router-dom";

function AuthRoute({ children }) {
    const navigate = useNavigate();
    if (!localStorage.getItem("_token")) {
        navigate("/");
    }
    return children;
}

export default AuthRoute;
