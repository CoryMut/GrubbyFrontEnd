import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    random: {
        backgroundColor: "transparent",
        display: "flex",
        justifyContent: "center",
        transform: "rotate(4deg)",
        width: "60px",
        height: "60px",
        // flexGrow: 1,
        maxWidth: "84px",
    },
    hidden: {
        display: "none",
    },
}));

const MobileRandomComicButton = ({ visible }) => {
    const classes = useStyles();
    return (
        <img
            src="https://grubbythegrape.sfo2.cdn.digitaloceanspaces.com/assets/assets/randomIcon.PNG"
            alt="Random Comic"
            className={visible ? classes.random : classes.hidden}
        ></img>
    );
};

export default MobileRandomComicButton;
