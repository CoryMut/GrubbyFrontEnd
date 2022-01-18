import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    comicOutline: {
        border: "3px solid purple",
        borderRadius: "10%",
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
        width: "170px",
        height: "250px",
        margin: "10px",
    },
}));

const CardOutline = () => {
    const classes = useStyles();

    return <div className={classes.comicOutline}></div>;
};

export default CardOutline;
