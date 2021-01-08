import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    thumbnail: {
        minWidth: "325px",
        width: "100%",
        height: "100%",
        maxWidth: "35vw",
        display: "inline-block",
    },
    flex: {
        display: "flex",
        justifyContent: "center",
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
                <img className={classes.thumbnail} src={thumbnail} alt="Preview of uploaded comic"></img>
            </div>
        </div>
    );
};

export default Thumbnail;
