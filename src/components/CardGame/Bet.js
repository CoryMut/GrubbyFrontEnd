import React, { useState, useEffect } from "react";
import { Input, InputLabel, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";

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
    goodButton: {
        fontFamily: "comicfont",
        border: "3px solid",
        borderColor: "#645579",
        // backgroundColor: "#645579",
        // color: "white",
        // "&:hover": {
        //     color: "black",
        // },
    },
    evilButton: {
        fontFamily: "comicfont",
        borderColor: "#645579",
        color: "black",
    },
    nextButton: {
        fontFamily: "comicfont",
        backgroundColor: "#645579",
        color: "white",
        "&:hover": {
            color: "black",
        },
    },
}));
const Bet = ({ handleBet, coins = 100 }) => {
    const classes = useStyles();
    const [localBet, setLocalBet] = useState(coins);

    const onChange = (event) => {
        if (event.target.value < 0) {
            setLocalBet(0);
            return;
        }

        if (Number(coins) === 0) {
            setLocalBet(event.target.value);
            return;
        }

        if (Number(event.target.value) > Math.abs(Number(coins))) {
            setLocalBet(Math.abs(Number(coins)));
            return;
        }
        setLocalBet(event.target.value);
    };

    const setNone = () => {
        setLocalBet(0);
    };

    const setAll = () => {
        setLocalBet(Math.abs(coins));
    };

    const submitBet = () => {
        handleBet(localBet);
    };

    useEffect(() => {
        if (coins <= 0) {
            setLocalBet(Math.abs(coins));
        }
    }, [coins, setLocalBet]);

    return (
        <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: "80vh" }}>
            <div style={{ width: "600px" }}>
                <div className="my-3 text-center">
                    How many <LocalAtmIcon className="mr-1" />
                    GrubbyCoins would you like to bet on this question?
                </div>
                <div className="d-flex mx-auto" style={{ width: "500px" }}>
                    <Button variant="outlined" className={classes.evilButton} onClick={setNone}>
                        NONE
                    </Button>
                    <div className={`${classes.customInputDiv} d-flex flex-row mx-auto`}>
                        <Input type="number" value={localBet} onChange={onChange} autoFocus />
                    </div>
                    <Button variant="outlined" className={classes.goodButton} onClick={setAll}>
                        ALL OF THEM
                    </Button>
                </div>
                <div className="d-flex justify-content-center" style={{ width: "540px" }}>
                    <Button className={`${classes.nextButton} mt-5`} onClick={submitBet}>
                        Place Bet
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Bet;
