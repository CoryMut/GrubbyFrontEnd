import React, { useState, useEffect } from "react";

import Lottie from "lottie-react";
import paperPlaneData from "../lotties/paper-plane.json";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    lottieWrapper: {
        display: "flex",
        justifyContent: "center",
        height: "80vh",
        alignItems: "center",
        [`${theme.breakpoints.down("md")} and (orientation: landscape)`]: {
            height: "110vh",
        },
        // "@media (orientation: landscape)": {
        //     height: "110vh",
        // },
    },
    lottie: {
        width: "45em",
        height: "45em",
        "@media (orientation: landscape)": {
            width: "20em",
            height: "20em",
        },
        [`${theme.breakpoints.up("md")} and (orientation: landscape)`]: {
            width: "40em",
            height: "40em",
        },
    },
}));

const PaperPlaneLottie = ({ delay }) => {
    const classes = useStyles();
    const [timeElapsed, setTimeElapsed] = useState(false);

    useEffect(() => {
        let timeout = setTimeout(() => {
            setTimeElapsed(true);
        }, delay);
        return () => clearTimeout(timeout);
    }, [delay]);

    return (
        <div className={classes.lottieWrapper}>
            {timeElapsed && <Lottie className={classes.lottie} animationData={paperPlaneData} />}
        </div>
    );
};

export default PaperPlaneLottie;
