import React from "react";
import "./App.css";

import NavBar from "./components/NavBar";
import Routes from "./routes/routes";

import { UserProvider } from "./components/UserContext";

function App() {
    return (
        <div className="App">
            <UserProvider>
                <NavBar></NavBar>
                <Routes></Routes>
            </UserProvider>
        </div>
    );
}

export default App;
