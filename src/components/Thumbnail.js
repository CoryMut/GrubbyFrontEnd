import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    thumbnail: {
        minWidth: "325px",
        width: "35vw",
        display: "inline-block",
    },
    flex: {
        display: "flex",
        justifyContent: "center",
    },
    overlay: {
        position: "relative",
        display: "inline-block",
        zIndex: 1,
    },
    icon: {
        position: "absolute",
        left: "40%",
        top: "40%",
        display: "block",
        transform: "translate(-40%, -42.5%)",
    },
    blur: {
        minWidth: "325px",
        width: "35vw",
        display: "inline-block",
        filter: "blur(2px)",
    },
}));

const Thumbnail = ({ file, progress }) => {
    const classes = useStyles();

    if (!file) {
        return null;
    }

    let thumbnail = URL.createObjectURL(file);

    return (
        <div>
            <p>Preview:</p>
            <div className={classes.flex}>
                <img
                    className={progress ? classes.blur : classes.thumbnail}
                    src={thumbnail}
                    alt="Preview of uploaded comic"
                ></img>
            </div>
        </div>
    );
};

export default Thumbnail;
