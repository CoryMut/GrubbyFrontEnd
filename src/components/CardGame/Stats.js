import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";

import AssignmentIcon from "@material-ui/icons/Assignment";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import WhatshotIcon from "@material-ui/icons/Whatshot";

const useStyles = makeStyles((theme) => ({
    settings: {
        margin: "15px 15px 0px 0px",
        width: "400px",
        backgroundColor: "white",
    },
    button: {
        margin: theme.spacing(1),
    },
    paper: {
        width: "400px",
        backgroundColor: "white",
        padding: "10px",
    },
    customInputDiv: {
        "& input": {
            textAlign: "center",
        },
    },
}));

const Stats = ({ wins = 0, coins = 0, name = "" }) => {
    const classes = useStyles();

    return (
        <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", top: 300, right: 0 }}>
                <Paper className={`${classes.paper} ${classes.settings}`}>
                    <div className="mx-3">
                        <div className="text-center mt-1 mb-2">
                            <AssignmentIcon className="mr-2" />
                            {name ? `${name}'s Stats` : "Stats"}
                        </div>

                        <div className="mx-auto d-flex justify-content-between">
                            <div>Coins</div>
                            <div>
                                <LocalAtmIcon className="mr-2" />
                                {Number(coins).toLocaleString()}
                            </div>
                        </div>
                        <div className="mx-auto d-flex justify-content-between">
                            <div>Wins</div>
                            <div>
                                <WhatshotIcon className="mr-2" />
                                {Number(wins).toLocaleString()}
                            </div>
                        </div>
                    </div>
                </Paper>
            </div>
        </div>
    );
};

export default Stats;
