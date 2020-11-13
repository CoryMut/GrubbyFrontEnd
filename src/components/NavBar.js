import React, { useContext } from "react";
import { UserContext } from "./UserContext";
import { logoutUser } from "../helpers/GrubbyAPI";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import Logo from "../components/Logo";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        textAlign: "center",
    },
    color: {
        color: "white",
    },
}));

const NavBar = () => {
    const classes = useStyles();

    const { isLoggedIn, logout, isAdmin } = useContext(UserContext);

    const handleLogout = async () => {
        await logoutUser();
        logout();
    };

    return (
        <div className={classes.root}>
            <AppBar position="sticky" className={classes.color} color="inherit">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        <Logo></Logo>
                    </Typography>
                    {isAdmin && (
                        <Link to="/upload">
                            <Button>Upload</Button>
                        </Link>
                    )}
                    {isLoggedIn && <Button onClick={handleLogout}>Logout</Button>}
                    {!isLoggedIn && <Button href="/login">Login</Button>}
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default NavBar;
