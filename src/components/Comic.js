import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GlobalEmojiBar from "../components/GlobalEmojiBar";
import FavoriteButton from "../components/FavoriteButton";
import RandomComicButton from "../components/RandomComicButton";

import "./pseudo.css";

const useStyles = makeStyles((theme) => ({
    comic: {
        // border: "2px solid black",
        // width: "100%",
        [theme.breakpoints.up("sm")]: {
            maxWidth: "760px",
        },
        // maxWidth: "760px",
        // margin: "0vh 1vw",
        userSelect: "none",

        boxShadow:
            "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px",
    },
    // comic: {
    //     border: "2px solid black",
    //     width: "100%",
    //     [theme.breakpoints.up("sm")]: {
    //         maxWidth: "760px",
    //     },
    //     maxWidth: "760px",
    //     // margin: "0vh 1vw",
    //     userSelect: "none",
    // },
    flex: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 1vw",
        flexDirection: "column",
        // width: "100%",
        // height: "100%",
    },
    emojibar: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        [theme.breakpoints.up("sm")]: {
            width: "100%",
            flexDirection: "column",
        },
        [theme.breakpoints.down("md")]: {
            width: "100%",
            flexDirection: "column",
        },
        [theme.breakpoints.up("md")]: {
            width: "90%",
            flexDirection: "row",
        },
        marginTop: "7px",
    },
    transparent: {
        opacity: 0,
        border: "2px solid black",
        width: "100%",
        minHeight: "100%",
        [theme.breakpoints.up("sm")]: {
            maxWidth: "760px",
        },
        maxWidth: "760px",
        margin: "0vh 1vw",
        userSelect: "none",
    },
    right: {
        margin: "8px",
        backgroundColor: "#FFFFFF",
        width: "58px",

        [theme.breakpoints.up("sm")]: {
            marginRight: 0,
        },
        [theme.breakpoints.up("md")]: {
            marginRight: 0,
        },
        [theme.breakpoints.down("md")]: {
            margin: "8px auto 10px auto",
            maxWidth: "72px",
        },
        [theme.breakpoints.up("lg")]: {
            marginRight: "auto",
        },
        "&:hover": {
            background: "rgb(234, 234, 234)",
        },
    },
    placeholder: {
        backgroundColor: "white",
        width: "98vw",
        height: "98vw",
        maxWidth: "760px",
        maxHeight: "760px",
        border: "2px solid black",
        // margin: "0vh 1vw",
        userSelect: "none",
    },
}));

const Comic = ({
    src,
    srcSet,
    id,
    chipData,
    setChipData,
    name,
    handleNextComic,
    handlePreviousComic,
    handleRandomComic,
    handleFirstComic,
    handleLastComic,
    handleError,
    count,
    visible,
    isLoading,
    reaction,
    setReaction,
    hideRandom,
    randomComic,
    prevComic,
    nextComic,
    firstComic,
    lastComic,
}) => {
    const classes = useStyles();

    return (
        <div className={classes.flex}>
            {!visible && <div className={classes.placeholder}></div>}
            {visible && (
                <img
                    className={visible ? classes.comic : classes.transparent}
                    srcSet={srcSet}
                    src={src}
                    alt="Grubby Comic"
                />
            )}
            <div className={classes.emojibar}>
                <RandomComicButton
                    visible={hideRandom}
                    handleRandomComic={handleRandomComic}
                    randomComic={randomComic}
                    handleError={handleError}
                />
                {/* <FavoriteButton orientation="left"></FavoriteButton> */}
                <GlobalEmojiBar
                    id={id}
                    chipData={chipData}
                    setChipData={setChipData}
                    handleNextComic={handleNextComic}
                    handlePreviousComic={handlePreviousComic}
                    handleRandomComic={handleRandomComic}
                    handleFirstComic={handleFirstComic}
                    handleLastComic={handleLastComic}
                    handleError={handleError}
                    count={count}
                    isLoading={isLoading}
                    reaction={reaction}
                    setReaction={setReaction}
                    randomComic={randomComic}
                    prevComic={prevComic}
                    nextComic={nextComic}
                    firstComic={firstComic}
                    lastComic={lastComic}
                ></GlobalEmojiBar>
                <FavoriteButton orientation="right" comicID={id} name={name}></FavoriteButton>
            </div>
        </div>
    );
};

export default Comic;
