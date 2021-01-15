import React, { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import { logoutUser } from "../helpers/GrubbyAPI";
import { Link } from "react-router-dom";

import useMediaQuery from "@material-ui/core/useMediaQuery";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";

import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Logo from "../components/Logo";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import HomeIcon from "@material-ui/icons/Home";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import CollectionsBookmarkIcon from "@material-ui/icons/CollectionsBookmark";
import PersonIcon from "@material-ui/icons/Person";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SettingsIcon from "@material-ui/icons/Settings";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
        color: "white",
    },
    title: {
        flexGrow: 1,
        textAlign: "center",
        [theme.breakpoints.down("xs")]: {
            marginRight: "20px",
        },
    },
    centerTitle: {
        textAlign: "none",
    },
    appBar: {
        backgroundColor: "#645579",
        zIndex: theme.zIndex.drawer + 1,
        justifyContent: "center",
        position: "sticky",
        top: "0px",
        left: "0px",
        height: "70px",
        [theme.breakpoints.down("md")]: {
            height: "64px",
        },
        borderBottom: "1px solid black",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: "auto",
    },
    list: {
        width: "20vw",
        minWidth: 250,
    },
    listItem: {
        margin: "auto",
    },
    bottomItem: {
        position: "fixed",
        bottom: 0,
        width: drawerWidth,
    },
    button: {
        color: "white",
        textDecoration: "none",
        "&:hover": {
            color: "white",
        },
    },
}));

const NavBar = () => {
    const matches = useMediaQuery("(max-width:320px)");
    const hideButton = useMediaQuery("(max-width:700px)");

    const classes = useStyles();
    const { isLoggedIn, logout, isAdmin } = useContext(UserContext);
    const [menu, setMenu] = useState(false);

    const openMenu = () => {
        setMenu(true);
    };

    const closeMenu = () => {
        setMenu(false);
    };

    const handleLogout = async () => {
        await logoutUser();
        logout();
        closeMenu();
    };

    return (
        <div>
            <AppBar position="sticky" className={classes.appBar} color="inherit" elevation={1}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} aria-label="menu" onClick={openMenu}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={matches ? classes.centerTitle : classes.title}>
                        <Logo></Logo>
                    </Typography>
                    {!isLoggedIn && !hideButton && (
                        <Button component={Link} to="/login" className={classes.button}>
                            Login
                        </Button>
                    )}
                    {isLoggedIn && !hideButton && (
                        <Button onClick={handleLogout} className={classes.button}>
                            Logout
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
            <Drawer
                anchor="left"
                open={menu}
                onClose={closeMenu}
                className={classes.drawer}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerContainer}>
                    <List>
                        <ListItem button onClick={closeMenu}>
                            <ListItemIcon>
                                <ArrowBackIcon></ArrowBackIcon>
                            </ListItemIcon>
                            <ListItemText></ListItemText>
                        </ListItem>

                        <ListItem button component={Link} to="/" onClick={closeMenu}>
                            <ListItemIcon>
                                <HomeIcon></HomeIcon>
                            </ListItemIcon>
                            <ListItemText primary="Home"></ListItemText>
                        </ListItem>

                        <ListItem button component={Link} to="/all?page=1" onClick={closeMenu}>
                            <ListItemIcon>
                                <CollectionsBookmarkIcon></CollectionsBookmarkIcon>
                            </ListItemIcon>
                            <ListItemText primary="All Comics"></ListItemText>
                        </ListItem>

                        {isLoggedIn && (
                            <ListItem button component={Link} onClick={closeMenu} to="/favorites">
                                <ListItemIcon>
                                    <FavoriteIcon></FavoriteIcon>
                                </ListItemIcon>
                                <ListItemText primary="Favorites"></ListItemText>
                            </ListItem>
                        )}

                        {!isLoggedIn && (
                            <ListItem
                                button
                                component={Link}
                                to="/login"
                                onClick={closeMenu}
                                className={classes.bottomItem}
                            >
                                <ListItemIcon>
                                    <PersonIcon></PersonIcon>
                                </ListItemIcon>
                                <ListItemText primary="Login"></ListItemText>
                            </ListItem>
                        )}

                        {isLoggedIn && (
                            <ListItem button onClick={handleLogout} className={classes.bottomItem}>
                                <ListItemIcon>
                                    <ExitToAppIcon></ExitToAppIcon>
                                </ListItemIcon>
                                <ListItemText primary="Logout"></ListItemText>
                            </ListItem>
                        )}

                        {isAdmin && (
                            <ListItem button component={Link} to="/upload" onClick={closeMenu}>
                                <ListItemIcon>
                                    <CloudUploadIcon></CloudUploadIcon>
                                </ListItemIcon>
                                <ListItemText primary="Upload"></ListItemText>
                            </ListItem>
                        )}
                        {isAdmin && (
                            <ListItem button component={Link} to="/admin" onClick={closeMenu}>
                                <ListItemIcon>
                                    <SettingsIcon></SettingsIcon>
                                </ListItemIcon>
                                <ListItemText primary="Admin Portal"></ListItemText>
                            </ListItem>
                        )}
                    </List>
                </div>
            </Drawer>
        </div>
    );
};

export default NavBar;
