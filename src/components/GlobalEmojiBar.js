import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "./UserContext";
import { getUserEmoteData } from "../helpers/GrubbyAPI";

import { makeStyles, createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import { sendUserEmoteData, updateUserEmoteData, deleteReaction } from "../helpers/GrubbyAPI";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
}));

function GlobalEmojiBar({ id, chipData, setChipData }) {
    const classes = useStyles();
    const { user } = useContext(UserContext);
    const [reaction, setReaction] = useState("");
    const [error, setError] = useState(false);

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
                    <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="info">
                            You must be logged in to submit a reaction!
                            <span role="img" aria-label="Winking Face" style={{ marginLeft: "5px" }}>
                                😉
                            </span>
                        </Alert>
                    </Snackbar>
                </div>
            )}
            {!chipData && null}
        </ThemeProvider>
    );
}

export default GlobalEmojiBar;
