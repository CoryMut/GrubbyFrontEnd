import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "./UserContext";
import { getUserEmoteData } from "../helpers/GrubbyAPI";

import { makeStyles, createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import IconButton from "@material-ui/core/IconButton";

import useMediaQuery from "@material-ui/core/useMediaQuery";

import { sendUserEmoteData, updateUserEmoteData, deleteReaction } from "../helpers/GrubbyAPI";

import CustomSnackBar from "../components/CustomSnackBar";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#e1bee7",
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
    },
    arrow: {
        fontSize: "2.5em",
    },
}));

function GlobalEmojiBar({ id, chipData, setChipData, count, handleNextComic, handlePreviousComic }) {
    const classes = useStyles();
    const matches = useMediaQuery("(max-width:900px)");

    const { user } = useContext(UserContext);
    const [reaction, setReaction] = useState("");
    const [error, setError] = useState(false);

    const rightArrow = id === count ? classes.invisibleRight : classes.rightArrow;
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

    useEffect(() => {
        async function getEmoteData() {
            try {
                if (user) {
                    if (id === null) {
                        return;
                    }
                    let result = await getUserEmoteData(id, user);
                    setReaction(() => result);
                } else {
                    // setReaction(() => "");
                    return;
                }
            } catch (error) {
                return;
            }
        }
        getEmoteData();
    }, [user, id]);

    return (
        <div>
            <div className={matches ? classes.arrowWrapper : classes.hide}>
                <IconButton onClick={() => handlePreviousComic(id - 1)} className={matches ? leftArrow : classes.hide}>
                    <ArrowBackIcon className={classes.arrow} />
                </IconButton>
                <IconButton className={matches ? rightArrow : classes.hide} onClick={() => handleNextComic(id + 1)}>
                    <ArrowForwardIcon className={classes.arrow} />
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
                                                    style={{ fontSize: "1rem", backgroundColor: "transparent" }}
                                                    aria-labelledby={data.label}
                                                >
                                                    {data.icon}
                                                </span>
                                            }
                                            label={data.count}
                                            className={classes.chip}
                                            clickable={true}
                                            color={reaction === data.label ? "primary" : "secondary"}
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
