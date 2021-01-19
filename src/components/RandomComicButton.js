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
    },
    hidden: {
        display: "none",
    },
    mobile: {
        margin: "auto",
        flexGrow: 1,
        maxWidth: "58px",
    },
}));

const RandomComicButton = ({ visible, mobile, handleRandomComic }) => {
    const classes = useStyles();
    let className;
    if (visible === false) {
        className = classes.hidden;
    } else if (mobile) {
        className = classes.mobile;
    } else if (visible) {
        className = classes.random;
    } else {
        className = classes.hidden;
    }
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
            className={className}
            color="primary"
            clickable={true}
            title="Random Comic"
            onClick={handleRandomComic}
        />
    );
};

export default RandomComicButton;
