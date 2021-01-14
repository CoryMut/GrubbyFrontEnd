import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GlobalEmojiBar from "../components/GlobalEmojiBar";
import FavoriteButton from "../components/FavoriteButton";

const useStyles = makeStyles((theme) => ({
    comic: {
        border: "2px solid black",
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            maxWidth: "760px",
        },
        maxWidth: "760px",
        margin: "0vh 1vw",
        userSelect: "none",
    },
    flex: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 1vw",
        flexDirection: "column",
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
        [theme.breakpoints.up("lg")]: {
            width: "90%",
            flexDirection: "row",
        },
    },
}));

const Comic = ({ src, srcSet, id, chipData, setChipData, name, handleNextComic, handlePreviousComic, count }) => {
    const classes = useStyles();

    return (
        <div className={classes.flex}>
            <img className={classes.comic} srcSet={srcSet} src={src} alt="Grubby Comic" />

            <div className={classes.emojibar}>
                <FavoriteButton orientation="left"></FavoriteButton>
                <GlobalEmojiBar
                    id={id}
                    chipData={chipData}
                    setChipData={setChipData}
                    handleNextComic={handleNextComic}
                    handlePreviousComic={handlePreviousComic}
                    count={count}
                ></GlobalEmojiBar>
                <FavoriteButton orientation="right" comicID={id} name={name}></FavoriteButton>
            </div>
        </div>
    );
};

export default Comic;
