import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GlobalEmojiBar from "../components/GlobalEmojiBar";
// import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
// import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
// import SkipNextIcon from "@material-ui/icons/SkipNext";
// import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
// import Button from "@material-ui/core/Button";
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
    },
    flex: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "90vh",
        margin: "0 2vw",
        flexDirection: "column",
        [theme.breakpoints.up("sm")]: {
            // minHeight: "885px",
            minHeight: "935px",
        },
        [theme.breakpoints.down("md")]: {
            height: "80vh",
        },
        [theme.breakpoints.up("lg")]: {
            height: "100vh",
        },
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

const Comic = ({ src, srcSet, handlePreviousComic, handleNextComic, id, chipData, setChipData, name }) => {
    const classes = useStyles();

    return (
        <div className={classes.flex}>
            {/* <SkipPreviousIcon></SkipPreviousIcon>
            <Button onClick={handlePreviousComic}>
                <ArrowBackIosIcon></ArrowBackIosIcon>
            </Button> */}
            <img className={classes.comic} srcSet={srcSet} src={src} alt="Grubby Comic" />
            {/* <Button onClick={handleNextComic}>
                <ArrowForwardIosIcon></ArrowForwardIosIcon>
            </Button>
            <SkipNextIcon></SkipNextIcon> */}
            <div className={classes.emojibar}>
                <FavoriteButton orientation="left"></FavoriteButton>
                <GlobalEmojiBar id={id} chipData={chipData} setChipData={setChipData}></GlobalEmojiBar>
                <FavoriteButton orientation="right" comicID={id} name={name}></FavoriteButton>
            </div>
        </div>
    );
};

export default Comic;
