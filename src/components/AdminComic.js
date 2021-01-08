import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    comic: {
        border: "2px solid black",
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            maxWidth: "760px",
        },
        // maxWidth: "760px",
    },
}));

const AdminComic = ({ src, srcSet }) => {
    const classes = useStyles();

    return <img className={classes.comic} srcSet={srcSet} src={src} alt="Grubby Comic" />;
};

export default AdminComic;
