import React, { useState, useContext } from "react";
import { UserContext } from "./UserContext";

import { makeStyles, createTheme, ThemeProvider } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import IconButton from "@material-ui/core/IconButton";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";

import useMediaQuery from "@material-ui/core/useMediaQuery";

import { sendUserEmoteData, updateUserEmoteData, deleteReaction } from "../helpers/GrubbyAPI";

import CustomSnackBar from "../components/CustomSnackBar";

import MobileRandomComicButton from "../components/MobileRandomComicButton";

const theme = createTheme({
    palette: {
        primary: {
            main: "#e0e0e0",
            // main: "#e1bee7",
        },
        secondary: {
            main: "#FFFFFF",
        },
    },
});

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        listStyle: "none",
        padding: theme.spacing(0.5),
        margin: 0,
        backgroundColor: "transparent",
        boxShadow: "none",
        marginBottom: "1vh",
        width: "100%",
    },
    chip: {
        margin: theme.spacing(0.5),
        // width: "60px",
        width: "fit-content",
        border: "1px solid rgba(0,0,0,0.1)",
    },
    leftArrow: {
        float: "left",
        margin: 0,
    },
    rightArrow: {
        float: "right",
    },
    invisibleRight: {
        visibility: "hidden",
        float: "right",
    },
    invisibleLeft: {
        visibility: "hidden",
        float: "left",
    },
    hide: {
        display: "none",
    },
    arrowWrapper: {
        width: "100%",
        margin: "0.5vh 0",
        padding: theme.spacing(0.5),
        display: "flex",
    },
    arrow: {
        fontSize: "1.5em",
    },
    random: {
        // flexGrow: 1,
        margin: "auto",
    },
    skipArrows: {
        maxWidth: "60px",
    },
    selected: {
        margin: theme.spacing(0.5),
        // width: "60px",
        width: "fit-content",
        border: "1px solid black",
        "&:focus": {
            backgroundColor: "#FFFFFF !important",
        },
    },
}));

function GlobalEmojiBar({
    id,
    chipData,
    setChipData,
    count,
    handleNextComic,
    handlePreviousComic,
    handleRandomComic,
    handleFirstComic,
    handleLastComic,
    handleError,
    isLoading,
    reaction,
    setReaction,
    randomComic,
    prevComic,
    firstComic,
    lastComic,
}) {
    const classes = useStyles();
    const matches = useMediaQuery("(max-width:900px)");

    const { user } = useContext(UserContext);
    const [error, setError] = useState(false);

    const rightArrow = isLoading || id === count ? classes.invisibleRight : classes.rightArrow;
    const leftArrow = id === 1 ? classes.invisibleLeft : classes.leftArrow;

    const handleClick = async (newReaction) => {
        if (!user) {
            setError(true);
            return;
        }

        if (reaction !== "" && reaction === newReaction) {
            await deleteReaction({ user, id });
            let newChipData = chipData.map((data) => {
                if (data.label === reaction) {
                    return { ...data, count: data.count - 1 };
                } else {
                    return data;
                }
            });
            setChipData(() => [...newChipData]);
            setReaction(() => "");
        } else if (user && reaction) {
            let oldReaction = reaction;
            setReaction(() => newReaction);
            await updateUserEmoteData({ user, id, reaction: newReaction });
            let newChipData = chipData.map((data) => {
                if (data.label === oldReaction) {
                    return { ...data, count: data.count - 1 };
                } else if (data.label === newReaction) {
                    return { ...data, count: data.count + 1 };
                } else {
                    return data;
                }
            });
            setChipData(() => [...newChipData]);
        } else if (user && !reaction) {
            setReaction(() => newReaction);
            await sendUserEmoteData({ user, id, reaction: newReaction });
            let newChipData = chipData.map((data) => {
                if (data.label === newReaction) {
                    return { ...data, count: data.count + 1 };
                } else {
                    return data;
                }
            });
            setChipData(() => [...newChipData]);
        }
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setError(false);
    };

    return (
        <div>
            <div className={matches ? classes.arrowWrapper : classes.hide}>
                <IconButton
                    onClick={() => (Object.keys(firstComic).length !== 0 ? handleFirstComic() : handleError())}
                    className={matches ? leftArrow : classes.hide}
                >
                    <SkipPreviousIcon className={classes.skipArrows} />
                </IconButton>
                <IconButton
                    onClick={() => (Object.keys(prevComic).length !== 0 ? handlePreviousComic(id - 1) : handleError())}
                    className={matches ? leftArrow : classes.hide}
                >
                    <ArrowBackIcon className={classes.arrow} />
                </IconButton>
                <IconButton
                    onClick={Object.keys(randomComic).length !== 0 ? handleRandomComic : handleError}
                    className={classes.random}
                >
                    <MobileRandomComicButton visible={matches ? true : false} />
                </IconButton>
                <IconButton
                    onClick={() =>
                        Object.keys(prevComic).length !== 0 || id === 1 ? handleNextComic(id + 1) : handleError()
                    }
                    className={matches ? rightArrow : classes.hide}
                >
                    <ArrowForwardIcon className={classes.arrow} />
                </IconButton>
                <IconButton
                    onClick={() => (Object.keys(firstComic).length !== 0 ? handleLastComic() : handleError())}
                    className={matches ? rightArrow : classes.hide}
                >
                    <SkipNextIcon />
                </IconButton>
            </div>
            <ThemeProvider theme={theme}>
                {chipData && (
                    <div>
                        <Paper component="ul" className={classes.root}>
                            {chipData.map((data) => {
                                return (
                                    <li key={data.key}>
                                        <Chip
                                            avatar={
                                                <span
                                                    role="img"
                                                    style={{
                                                        fontSize: "1rem",
                                                        backgroundColor: "transparent",
                                                        marginRight: "0 !important",
                                                        marginBottom: "5px",
                                                    }}
                                                    aria-labelledby={data.label}
                                                    className={classes.chipFocus}
                                                >
                                                    <img
                                                        srcSet={data.icon}
                                                        style={{ width: "24px", height: "24px" }}
                                                        alt={data.label}
                                                    />
                                                </span>
                                            }
                                            label={data.count}
                                            className={reaction === data.label ? classes.selected : classes.chip}
                                            clickable={true}
                                            // color={reaction === data.label ? "primary" : "secondary"}
                                            color={"secondary"}
                                            onClick={() => handleClick(data.label)}
                                        />
                                    </li>
                                );
                            })}
                        </Paper>

                        <CustomSnackBar
                            open={error}
                            autoHideDuration={6000}
                            onClose={handleClose}
                            severity="info"
                            emoji="😉"
                            emojiLabel="Winking Face"
                            message={"You must be logged in to submit a reaction!"}
                            encloseMessage={false}
                        />
                    </div>
                )}
                {!chipData && null}
            </ThemeProvider>
        </div>
    );
}

export default GlobalEmojiBar;
