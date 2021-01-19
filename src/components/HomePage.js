// This is the landing page for the app.

import React, { useEffect, useContext } from "react";

import DisplayComic from "./DisplayComic";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import { UserContext } from "../components/UserContext";

import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import Link from "@material-ui/core/Link";
import { Link as RRLink } from "react-router-dom";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    jumbotron: {
        minHeight: "100vh",
        backgroundColor: "white",
        backgroundSize: "cover",
        padding: "10vh 0px",
        borderTop: "1px solid black",
    },
    section1: {
        backgroundRepeat: "repeat",
        backgroundColor: "#645579",
        minHeight: "calc(99vh - 70px)",
        [theme.breakpoints.down("md")]: {
            minHeight: "calc(99vh - 64px)",
        },
        padding: "4vh 0 4vh 0",
        display: "flex",
        alignItems: "center",
    },
    h1: {
        fontSize: "32px",
        color: "black",
    },
    main: {
        height: "25vh",
        backgroundColor: "white",
        borderRadius: "10px",
        padding: "2vw",
        maxWidth: "100vw",
    },
    text: {
        maxWidth: "300px",
        position: "absolute",
        top: "15%",
        left: "40%",
        fontFamily: "comicfont",
        [theme.breakpoints.down("md")]: {
            margin: "2vh 0",
        },
        [theme.breakpoints.down("xs")]: {
            fontSize: "9px",
            left: "42.5%",
            top: "13%",
            margin: "0 0",
            maxWidth: "175px",
        },
    },
    textTwo: {
        fontFamily: "comicfont",
        margin: "10px",
        [theme.breakpoints.down("xs")]: {
            fontSize: "9px",
        },
    },
    verySmallScreens: {
        fontFamily: "comicfont",
        fontSize: "7px",
    },
    comicfont: {
        fontFamily: "comicfont",
        color: "black",
        margin: "2vh 0 5vh 0",
        [theme.breakpoints.down("sm")]: {
            fontSize: "50px",
        },
    },
    comicFontSmall: {
        fontFamily: "comicfont",
        color: "black",
        margin: "2vh 0 5vh 0",
        fontSize: "40px",
    },
    friends: {
        maxWidth: "80vw",
        userSelect: "none",
    },
    about: {
        width: "600px",
        fontFamily: "Helvetica",
        padding: "4vh",
        maxWidth: "100vw",
        lineHeight: 1.7,
        [theme.breakpoints.down("md")]: {
            margin: "3rem 0",
        },
        [theme.breakpoints.down("sm")]: {
            // maxWidth: "80vw",
            margin: "3rem 0",
        },
    },
    authorImg: {
        width: "4rem",
        maxWidth: "100vw",
        border: "1px solid black",
        borderRadius: "50%",
        float: "right",
        margin: "auto",
        userSelect: "none",
    },
    socialIcons: {
        fontSize: "4rem",
        margin: "auto",
    },
    twitterlink: {
        textDecoration: "none",
        margin: "auto",
        "&:hover": {
            color: "#08a0e9",
        },
    },
    instagramlink: {
        textDecoration: "none",
        margin: "auto",
        "&:hover": {
            color: "#DD2A7B",
        },
    },
    tumblrlink: {
        textDecoration: "none",
        margin: "auto",
    },
    policy: {
        cursor: "pointer",
    },
}));

const HomePage = () => {
    const classes = useStyles();
    const { recentLogin, setRecentLogin, recentLogout, setRecentLogout, displayName } = useContext(UserContext);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setRecentLogin(false);
        setRecentLogout(false);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <Snackbar
                open={recentLogin}
                autoHideDuration={5000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                style={{ marginTop: "5%" }}
            >
                <Alert onClose={handleClose} severity="success">
                    Welcome Back, {displayName}!
                </Alert>
            </Snackbar>
            <Snackbar
                open={recentLogout}
                autoHideDuration={5000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                style={{ marginTop: "5%" }}
            >
                <Alert onClose={handleClose} severity="success">
                    Log out successful. Have a good day!
                </Alert>
            </Snackbar>
            <div className={classes.section1} name="section1">
                <Grid container direction="column" justify="space-evenly" alignItems="center">
                    <div style={{ height: "100%", display: "flex", alignItems: "center" }}>
                        <DisplayComic></DisplayComic>
                    </div>

                    <div name="latest_comic"></div>
                </Grid>
            </div>
            <div name="top">
                <div>
                    <Grid
                        className={classes.jumbotron}
                        container
                        direction="row"
                        justify="space-evenly"
                        alignItems="center"
                    >
                        <Grid item>
                            <img
                                src="https://grubbythegrape.sfo2.cdn.digitaloceanspaces.com/assets/assets/promo.jpg"
                                alt="Grubby with his friends Richard and Dennis"
                                className={classes.friends}
                            />
                        </Grid>
                        <Grid item>
                            <Typography variant="body1" component="div" className={classes.about} align="center">
                                Hi it’s me, the author, Ian. <br /> Some context, Grubby the Grape lives with his
                                roommate Dennis and his best friend Richard who doesn’t live with them but does sleep in
                                the guest bedroom. Grubby’s wacky, Richard’s street smart, and Dennis has a child. I
                                update Grubby every Monday and Wednesday so stop on by and feel free to make an account
                                where you can react using emojis or favorite comics to save em for later. BYE!
                            </Typography>
                            <Grid container direction="row" alignItems="center">
                                <Link
                                    target="_blank"
                                    href="https://twitter.com/TheFantasticIan"
                                    rel="noreferrer"
                                    color="inherit"
                                    className={classes.twitterlink}
                                >
                                    <TwitterIcon className={classes.socialIcons}></TwitterIcon>
                                </Link>
                                <Link
                                    target="_blank"
                                    href="https://www.instagram.com/thefantastician/"
                                    rel="noreferrer"
                                    underline="none"
                                    color="inherit"
                                    className={classes.instagramlink}
                                >
                                    <InstagramIcon className={classes.socialIcons}></InstagramIcon>
                                </Link>
                                <Link
                                    target="_blank"
                                    href="https://ianportfoliolite.tumblr.com/"
                                    rel="noreferrer"
                                    underline="none"
                                    color="inherit"
                                    className={classes.tumblrlink}
                                >
                                    <img
                                        className={classes.authorImg}
                                        src="https://grubbythegrape.sfo2.cdn.digitaloceanspaces.com/assets/assets/author.jpg"
                                        alt="A cartoon of the author, Ian Mutchler"
                                    />
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>
                    <RRLink to="/privacy">
                        <Typography variant="caption" component="div" className={classes.policy} align="center">
                            Privacy Policy
                        </Typography>
                    </RRLink>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
