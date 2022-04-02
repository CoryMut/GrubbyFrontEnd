import { useNavigate } from "react-router-dom";

function AuthRoute({ children }) {
    const history = useNavigate();
    if (!localStorage.getItem("_token")) {
        history.push("/");
    }
    return children;
}

export default AuthRoute;
