import React from "react";
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    wrapper: {
        position: "relative",
    },
    zipInputWrapper: {
        position: "absolute",
        top: "50%",
        left: "10%",
    },
    zipInput: {
        border: "2px solid #645579",
        borderRadius: "10px",
        margin: "2px",
        padding: "2px",
        textAlign: "center",
        "&:focus": {
            border: "2px solid #645579",
            borderRadius: "10px",
        },
    },
    text: {
        position: "absolute",
        top: 180,
        left: 175,
    },
    askImage: {
        width: "960px",
    },
    speechBubbleContainer: {
        position: "absolute",
        top: "16%",
        left: "18%",
        height: "230px",
        width: "300px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: "black",
        [theme.breakpoints.down("md")]: {
            top: "8%",
            color: "black",
            maxWidth: "70vw",
        },
        [theme.breakpoints.down("sm")]: {
            top: "14%",
            left: "34%",
            color: "black",
            width: "60%",
            height: "30%",
        },
    },
    suggestButton: {
        fontFamily: "comicfont",
        backgroundColor: "#645579",
        color: "white",
        // "&:hover": {
        //     background: "#645590",
        //     content: "YEAHHHH",
        // },
        "&:hover": {
            color: "black",
        },
    },
}));

const AskGrubby = () => {
    const classes = useStyles();
    return (
        <div className="h-100 d-flex justify-content-center align-items-center">
            <div className={classes.wrapper}>
                <div className={`${classes.speechBubbleContainer} d-flex flex-column`}>
                    <div>
                        Fine, I'll tell you what to eat. <br /> Share your zip code below and I'll make a suggestion.
                    </div>
                    <div>
                        <br />
                        <small>
                            (No information you provide is ever stored. It is necessary to send relevant results.)
                        </small>
                    </div>
                </div>

                <img
                    src={"https://grubbythegrape.sfo2.cdn.digitaloceanspaces.com/assets/assets/ask_grubby.jpg"}
                    alt="Ask Grubby for food suggestions"
                    className={classes.askImage}
                />
                <div className={classes.zipInputWrapper}>
                    <div className="d-flex flex-row">
                        <label htmlFor="zipCode" className="mr-2 mt-1">
                            Zip Code:
                        </label>
                        <div>
                            <input name="zipCode" className={classes.zipInput} />
                            <div className="text-center mt-3">
                                <Button variant="contained" className={classes.suggestButton}>
                                    Make a suggestion
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AskGrubby;
