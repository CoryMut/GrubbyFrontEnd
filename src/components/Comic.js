import React from "react";
import { makeStyles } from "@material-ui/core/styles";

// import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
// import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
// import SkipNextIcon from "@material-ui/icons/SkipNext";
// import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
// import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    comic: {
        border: "2px solid black",
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            maxWidth: "760px",
        },
        maxWidth: "760px",
        margin: "0 1vw",
    },
    flex: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "90vh",
        [theme.breakpoints.up("sm")]: {
            minHeight: "885px",
        },
        [theme.breakpoints.down("md")]: {
            height: "80vh",
        },
        [theme.breakpoints.up("lg")]: {
            height: "90vh",
        },
    },
}));

const Comic = ({ src, srcSet, handlePreviousComic, handleNextComic }) => {
    const classes = useStyles();

    // return <img className={classes.comic} src={src}></img>;
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
        </div>
    );
};

export default Comic;
