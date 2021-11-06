import React, { useState } from "react";
import { getDadJoke } from "../helpers/DadJokeAPI";
import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CachedIcon from "@material-ui/icons/Cached";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    jumbotron: {
        backgroundColor: "white",
        backgroundSize: "cover",
        padding: "10vh 0px",
    },
    speechBubbleImg: {
        maxWidth: "100vw",
        [theme.breakpoints.down("md")]: {
            margin: "3vh 0",
        },
        [theme.breakpoints.down("sm")]: {
            maxWidth: "95vw",
        },
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
    speechIcon: {
        position: "absolute",
        top: "46.5%",
        left: "49.5%",
        cursor: "pointer",
        [theme.breakpoints.down("sm")]: {
            fontSize: "18px",
        },
    },
    speechBubbleContainer: {
        position: "absolute",
        top: "4%",
        left: "31%",
        height: "230px",
        width: "390px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: "black",
        [theme.breakpoints.down("md")]: {
            top: "8%",
            color: "black",
            maxWidth: "70vw",
        },
        [theme.breakpoints.down("sm")]: {
            top: "14%",
            left: "34%",
            color: "black",
            width: "60%",
            height: "30%",
        },
    },
}));

const Secret = () => {
    const classes = useStyles();
    const matches = useMediaQuery("(max-width:320px)");

    const [dadJoke, setDadJoke] = useState("");
    const [error, setError] = useState(false);

    const handleJoke = async () => {
        try {
            let joke = await getDadJoke();
            setDadJoke(joke);
        } catch (error) {
            setError(true);
        }
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setError(false);
    };

    return (
        <div style={{ padding: "4px" }} name="top">
            <div>
                <Grid
                    className={classes.jumbotron}
                    container
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="center"
                >
                    <Grid item>
                        <div style={{ position: "relative" }}>
                            <div className={classes.speechBubbleContainer}>
                                <Typography
                                    className={matches ? classes.verySmallScreens : classes.textTwo}
                                    variant="caption"
                                >
                                    {dadJoke ? (
                                        dadJoke
                                    ) : (
                                        <div>
                                            You can't get rid of me that easily.
                                            <br />
                                            <br />
                                            {/* <span style={{ marginLeft: "9px" }}>Please wear a mask.</span> */}
                                        </div>
                                    )}
                                </Typography>
                            </div>

                            <div>
                                <CachedIcon className={classes.speechIcon} onClick={handleJoke}></CachedIcon>
                            </div>
                            <img
                                className={classes.speechBubbleImg}
                                src="https://grubbythegrape.sfo2.cdn.digitaloceanspaces.com/assets/assets/grubby_crop.png"
                                alt="Grubby with a speech bubble"
                            ></img>
                        </div>
                    </Grid>
                </Grid>
            </div>
            <Snackbar open={error} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    Uh oh, something went wrong. Try again?
                    <span role="img" aria-label="Smiling Face with sweat">
                        😅
                    </span>
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Secret;
