import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    comicWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    arrow: {
        cursor: "pointer",
        display: "inline-block !important",
        visibility: "visible !important",
    },
    invisible: {
        visibility: "hidden",
    },
    hide: {
        display: "none",
    },
    lottie: {
        width: "100%",
        marginTop: "2vh",
    },
    transparent: {
        opacity: 0,
    },
    wrapper: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "50vw",
        [theme.breakpoints.down("md")]: {
            maxWidth: "100vw",
            margin: "0 3vw",
        },
        margin: "auto",
    },
    font: {
        fontFamily: "comicfont",
    },
    bubbleWrapper: {
        borderRadius: "6px",
        background: "#fff",
        transition: "all 300ms",
        color: "#555",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        padding: "1em",
        margin: "1.5em auto",
        width: "90% !important",
        boxShadow: "rgba(255,255,255, 1) 8px 8px 48px",
        // boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        wordBreak: "break-all",
    },
}));

// -webkit-font-smoothing: antialiased;
// border-radius: 6px;
// background: #fff;
// transition: all 300ms;
// color: #555;
// display: flex;
// flex-direction: column;
// overflow: hidden;
// padding: 1em;
// margin: 1.5em auto;
// width: 90% !important;
// box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
// word-break: break-all;
const PlaceholderComic = () => {
    const classes = useStyles();

    return <div className={classes.bubbleWrapper}>Placeholder Comic</div>;
};

export default PlaceholderComic;
