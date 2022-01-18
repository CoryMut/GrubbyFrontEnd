import React from "react";
import CardOutline from "./CardOutline";

import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    comicWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    placeMatWrapper: {
        height: "90vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    spacer: {
        height: "1vh",
    },
    cancelButton: {
        fontFamily: "comicfont",
        borderColor: "#645579",
        color: "black",
        float: "right",
        margin: "15px 15px 0 0",
        position: "absolute",
        right: 0,
    },
}));

const PlaceMat = ({ setStartGame, setReset }) => {
    const classes = useStyles();

    const handleCancel = () => {
        setStartGame(false);

        setReset(true);
    };

    return (
        <div>
            <Button className={classes.cancelButton} variant="outlined" onClick={handleCancel}>
                Cancel Game
            </Button>
            <div className={classes.placeMatWrapper}>
                <div className={classes.comicWrapper}>
                    <CardOutline />
                    <CardOutline />
                    <CardOutline />
                    <CardOutline />
                    <CardOutline />
                </div>
                <div className={classes.spacer}></div>
                <div className={classes.comicWrapper}>
                    <CardOutline />
                    <CardOutline />
                    <CardOutline />
                    <CardOutline />
                    <CardOutline />
                </div>
            </div>
        </div>
    );
};

export default PlaceMat;
