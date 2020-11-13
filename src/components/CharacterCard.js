import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(() => ({
    lightCard: {
        cursor: "pointer",
        backgroundColor: "lightgray",
        margin: "0.5vw 0.5vw 0 0",
    },
    darkCard: {
        cursor: "pointer",
        backgroundColor: "green",
        margin: "0.5vw 0.5vw 0 0",
    },
}));

const CharacterCard = ({ name, handleCharacter, characters }) => {
    const classes = useStyles();
    let className = classes.lightCard;

    // if (characters.includes(name)) {
    //     className = classes.darkCard;
    // }

    return (
        <Button className={className} onClick={() => handleCharacter(name)}>
            {name}
        </Button>
    );
};

export default CharacterCard;
