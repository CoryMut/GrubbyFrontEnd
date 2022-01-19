import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../UserContext";
import { makeStyles } from "@material-ui/core/styles";
import { addUserToLeaderboard } from "./api/CardGameAPI";
import Filter from "bad-words";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CachedIcon from "@material-ui/icons/Cached";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Slide from "@material-ui/core/Slide";
import { Button, Input, Link, TextField } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import Eyes from "./BlinkEyes";

import "./css/JustGrubby.css";

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
        userSelect: "none",
        pointerEvents: "none",
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
    slide: {
        animation: "slide 0.5s forwards",
        animationDelay: "2s",
    },
    bringItButton: {
        fontFamily: "comicfont",
        backgroundColor: "#645579",
        color: "white",
        "&:hover": {
            background: "#f00",
        },
    },
    normalButton: {
        fontFamily: "comicfont",
        backgroundColor: "#645579",
        color: "white",

        "&:hover": {
            color: "black",
            textDecoration: "none",
        },
    },
    outlineButton: {
        fontFamily: "comicfont",
        borderColor: "#645579",
        border: "1px solid",
        color: "black",
    },
}));

const JustGrubby = ({
    startGame,
    setStartGame,
    reset,
    setReset,
    setShowRules,
    newPlayer,
    setNewPlayer,
    setUserInfo,
    appearOnLeaderboards,
    setAppearOnLeaderboards,
}) => {
    const { displayName, userId } = useContext(UserContext);
    const classes = useStyles();
    const matches = useMediaQuery("(max-width:320px)");

    const [bringTheGrub, setBringTheGrub] = useState(false);
    const [startButtonText, setStartButtonText] = useState("BRING IT ON!");
    const [grubbyText, setGrubbyText] = useState("You ready to play?");

    const [startProcess, setStartProcess] = useState(false);

    const [open, setOpen] = useState(false);
    const [newOpen, setNewOpen] = useState(false);

    const [name, setName] = useState(displayName);
    const [nameError, setNameError] = useState("");

    const handleNewPlayer = () => {
        setNewOpen(true);
    };

    const handleNewClose = () => {
        setNewOpen(false);
        setName(displayName);
        setNameError("");
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const askToLogin = () => {
        handleClickOpen();
    };

    const handleStart = () => {
        setStartProcess(true);
    };

    const handleRules = () => {
        setShowRules(true);
    };

    const handleName = (event) => {
        const filter = new Filter();

        if (filter.isProfane(event.target.value)) {
            setName("Not funny!");
            return;
        }
        setName(event.target.value);
    };

    const registerUser = async () => {
        try {
            let result = await addUserToLeaderboard(userId, name);
            setUserInfo(result);
            setNewPlayer(false);
            handleNewClose();
            handleStart();
        } catch (error) {
            console.log(error);
            setNameError("Name already taken");
        }
    };

    const doNotAppear = () => {
        setAppearOnLeaderboards(() => ({ userChose: false }));
        setUserInfo({ coins: 0, wins: 0 });
        handleClose();
        handleNewClose();
        handleStart();
    };

    useEffect(() => {
        let grubTimer = setTimeout(() => {
            setBringTheGrub(true);
        }, [500]);

        return () => clearTimeout(grubTimer);
    }, []);

    useEffect(() => {
        if (startProcess) {
            setGrubbyText(`Fine. Let's do this!`);
            let grubTimer = setTimeout(() => {
                setBringTheGrub(false);
                setTimeout(() => {
                    setStartGame(true);
                }, [150]);
            }, [1200]);

            return () => clearTimeout(grubTimer);
        }
    }, [startProcess, setStartGame]);

    useEffect(() => {
        if (reset) {
            setStartButtonText("BRING IT ON!");
            setGrubbyText("You ready to play?");
            setStartProcess(false);
            setReset(false);
            setBringTheGrub(true);
        }
    }, [reset, setReset]);

    return (
        <Slide direction="right" in={bringTheGrub} timeout={500}>
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
                                <Eyes />
                                <div className={classes.speechBubbleContainer}>
                                    <Typography
                                        className={matches ? classes.verySmallScreens : classes.textTwo}
                                        variant="caption"
                                    >
                                        <div style={{ transform: "rotate(-25deg)" }}>
                                            {grubbyText}
                                            <br />
                                            <br />
                                            {!startProcess && (
                                                <Button
                                                    className={classes.bringItButton}
                                                    variant="contained"
                                                    onMouseEnter={() => setStartButtonText("LAST CHANCE, LOSER!")}
                                                    onMouseLeave={() => setStartButtonText("BRING IT ON!")}
                                                    onClick={
                                                        userId
                                                            ? newPlayer
                                                                ? handleNewPlayer
                                                                : handleStart
                                                            : appearOnLeaderboards.userChose === false
                                                            ? handleStart
                                                            : askToLogin
                                                    }
                                                >
                                                    {startButtonText}
                                                </Button>
                                            )}
                                            <br />
                                            <br />
                                            {!startProcess && (
                                                <p>
                                                    (But Grubby, what are the{" "}
                                                    <Link onClick={handleRules} style={{ cursor: "pointer" }}>
                                                        Rules?
                                                    </Link>
                                                    )
                                                </p>
                                            )}
                                        </div>
                                    </Typography>
                                </div>

                                {/*  */}
                                <img
                                    className={classes.speechBubbleImg}
                                    src="https://grubbythegrape.sfo2.cdn.digitaloceanspaces.com/assets/assets/no_eyes.jpg"
                                    // src="https://grubbythegrape.sfo2.cdn.digitaloceanspaces.com/assets/assets/grubby_crop.png"
                                    alt="Grubby with a speech bubble"
                                />
                            </div>
                            <Dialog
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">{"Appear on Leaderboards?"}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        You can play the game without an account. However, you will not appear on the
                                        leaderboards. If you do login, the coins you earn will come directly from Grubby
                                        (and influence his ranking). <br /> <br />
                                        Would you like to login or play without appearing on the leaderboards?
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={doNotAppear} variant="outlined" className={classes.outlineButton}>
                                        I just want to play!
                                    </Button>
                                    <Link
                                        component={Button}
                                        href="/login?d=trivia"
                                        className={classes.normalButton}
                                        autoFocus
                                    >
                                        Login, please!
                                    </Link>
                                </DialogActions>
                            </Dialog>
                            <Dialog
                                open={newOpen}
                                onClose={handleNewClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">{"Appear on Leaderboards?"}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        If you would like to show up on the leaderboards, what would you like to be
                                        called?
                                        <div className="text-center">
                                            <Input
                                                value={name}
                                                onChange={handleName}
                                                inputProps={{ style: { textAlign: "center" } }}
                                                error={nameError}
                                            />
                                            <div>
                                                {nameError && (
                                                    <small style={{ color: "red" }} className="mt-1">
                                                        <ErrorOutlineIcon />
                                                        {nameError}
                                                    </small>
                                                )}
                                            </div>
                                        </div>
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={doNotAppear} variant="outlined" className={classes.outlineButton}>
                                        No thanks, no leaderboards for me!
                                    </Button>
                                    <Button onClick={registerUser} variant="outlined" className={classes.normalButton}>
                                        Call me {name}!
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </Slide>
    );
};

export default JustGrubby;
