import React from "react";
import { makeStyles } from "@material-ui/core/styles";

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

const AdminComic = ({ src, srcSet }) => {
    const classes = useStyles();

    return (
        <div className={classes.flex}>
            <img className={classes.comic} srcSet={srcSet} src={src} alt="Grubby Comic" />
        </div>
    );
};

export default AdminComic;
