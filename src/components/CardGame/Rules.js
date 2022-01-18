import React from "react";
import { Button, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexDirection: "column",
        height: "80vh",
        justifyContent: "center",
        alignItems: "center",
        width: "50%",
        margin: "auto",
    },
    listItem: {
        margin: "10px",
        width: "90%",
    },
    bringItButton: {
        fontFamily: "comicfont",
        backgroundColor: "#645579",
        color: "white",
        marginTop: "30px",
        "&:hover": {
            color: "black",
        },
    },
    ul: {
        display: "table",
        margin: "0 auto",
    },
}));

const Rules = ({ setRules }) => {
    const classes = useStyles();

    const handleRules = () => {
        setRules(false);
    };
    return (
        <Container className={classes.container}>
            <h1 className="mb-5">Rules</h1>
            <ul className={classes.ul}>
                <li className={classes.listItem}>
                    Any similarities to a popular game formerly hosted by Regis Philbin are coincidental
                </li>
                <li className={classes.listItem}>
                    That's a lie. This game is heavily inspired by <i>Who Wants to Be a Millionaire</i> formerly hosted
                    by Regis Philbin
                </li>
                <li className={classes.listItem}>
                    Each question has 4 choices. Select the correct answer within the given time to advance to the next
                    round.
                </li>
                <li className={classes.listItem}>
                    You will be rewarded with GrubbyCoins after every successful round. The amount depends on how much
                    you wagered on each round.
                </li>
                <li className={classes.listItem}>
                    Each successful question is also counted as a "Win" and tracked on the leaderboard!
                </li>
            </ul>
            <Button className={classes.bringItButton} variant="contained" onClick={handleRules}>
                Enough Already Let's Play
            </Button>
        </Container>
    );
};

export default Rules;
