import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme) => ({
    random: {
        margin: "8px",
        backgroundColor: "#FFFFFF",
        width: "58px",
        [theme.breakpoints.up("sm")]: {
            marginRight: 0,
        },
        [theme.breakpoints.up("md")]: {
            marginRight: 0,
        },
        [theme.breakpoints.down("md")]: {
            margin: "8px auto 10px auto",
            maxWidth: "72px",
        },

        [theme.breakpoints.up("lg")]: {
            marginRight: "auto",
        },
        "&:hover": {
            background: "rgb(234, 234, 234)",
        },
        border: "1px solid rgba(0,0,0,0.1)",
    },
    hidden: {
        display: "none",
    },
}));

const RandomComicButton = ({ visible, handleRandomComic, randomComic, handleError }) => {
    const classes = useStyles();

    return (
        <Chip
            avatar={
                <span
                    role="img"
                    style={{
                        fontSize: "1rem",
                        backgroundColor: "transparent",
                        display: "flex",
                        justifyContent: "center",
                        marginLeft: "20px",
                        transform: "rotate(4deg)",
                        marginBottom: "8px",
                    }}
                    aria-labelledby="Random Comic"
                >
                    <img
                        style={{ width: "35px", height: "35px" }}
                        src="https://grubbythegrape.sfo2.cdn.digitaloceanspaces.com/assets/assets/randomIcon.PNG"
                        alt="Random Comic"
                    ></img>
                </span>
            }
            className={visible ? classes.random : classes.hidden}
            color="primary"
            clickable={true}
            title="Random Comic"
            // onClick={handleRandomComic}
            onClick={Object.keys(randomComic).length !== 0 ? handleRandomComic : handleError}
        />
    );
};

export default RandomComicButton;
