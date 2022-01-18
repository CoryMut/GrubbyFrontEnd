import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";

import "./css/BlinkEyes.css";

const useStyles = makeStyles((theme) => ({
    eye: {
        height: "20px",
        width: "9px",
        backgroundColor: "black",
        border: "1px solid black",
        borderRadius: "50%",
        position: "absolute",
        top: 0,
    },
    eye2: {
        position: "absolute",
        top: -10,
        height: "20px",
        width: "9px",
        backgroundColor: "black",
        border: "1px solid black",
        borderRadius: "50%",
        marginLeft: "35px",
    },
    wrapper: {
        display: "flex",
        justifyContent: "center",
        marginTop: "50px",
        position: "relative",
    },
}));

const Eyes = ({ setStartGame, setReset }) => {
    const classes = useStyles();
    const [blink, setBlink] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setBlink(true);
            setTimeout(() => {
                setBlink(false);
            }, [2000]);
        }, 7000);

        return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, []);

    return (
        <div style={{ position: "absolute", top: "48%", left: "19.5%", transform: "rotate(-3deg)" }}>
            <div className={classes.wrapper}>
                <div className={blink ? `${classes.eye} blink_me` : classes.eye}></div>
                <div className={blink ? `${classes.eye2} blink_me2` : classes.eye2}></div>
            </div>
        </div>
    );
};

export default Eyes;
