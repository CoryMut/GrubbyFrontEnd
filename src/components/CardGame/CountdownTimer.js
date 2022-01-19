import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";

import "./css/CountdownTimer.css";

const useStyles = makeStyles((theme) => ({
    timer: {
        border: "5px solid #645579",
        borderRadius: "50%",
        height: "200px",
        textAlign: "center",
        width: "200px",
        lineHeight: "185px",
        fontSize: "80px",
        boxShadow: "0 0 10px navy",
        marginLeft: "3rem",
    },
    emergency: {
        fontSize: "160px",
        color: "red",
        animation: "shake 0.5s 6",
    },
}));

const CountdownTimer = ({ startTime, setLoser, paused, reset, setReset, ...props }) => {
    const classes = useStyles();
    const [currTime, setCurrTime] = useState(startTime);

    useEffect(() => {
        if (paused) {
            return;
        }
        if (+currTime > 0) {
            let timer = setTimeout(() => {
                setCurrTime((currTime) => currTime - 1);
            }, [1000]);
            return () => clearTimeout(timer);
        } else if (currTime === 0) {
            setLoser(true);
        }
    }, [currTime, setLoser, paused]);

    useEffect(() => {
        if (startTime > 0) {
            setCurrTime(startTime);
        }
    }, [startTime]);

    useEffect(() => {
        if (reset) {
            setCurrTime(startTime);
            setReset(false);
        }
    }, [reset, setReset, startTime]);

    return (
        <div className={currTime <= 3 ? `${classes.timer} ${classes.emergency}` : classes.timer} {...props}>
            {currTime}
        </div>
    );
};

export default CountdownTimer;
