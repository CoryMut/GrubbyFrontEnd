import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    comic: {
        border: "2px solid black",
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            maxWidth: "760px",
        },
        maxWidth: "760px",
        margin: "1vh 1vw",
    },
    flex: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "90vh",
        [theme.breakpoints.up("sm")]: {
            minHeight: "885px",
        },
    },
}));

const Comic = ({ src, srcSet }) => {
    const classes = useStyles();

    // return <img className={classes.comic} src={src}></img>;
    return (
        <div className={classes.flex}>
            <img
                className={classes.comic}
                // srcSet="
                //     https://grubbythegrape.sfo2.cdn.digitaloceanspaces.com/grubbythegrape-283/Grubby_1.jpg 283w,
                //     https://grubbythegrape.sfo2.cdn.digitaloceanspaces.com/grubbythegrape-365/Grubby_1.jpg 365w,
                //     https://grubbythegrape.sfo2.cdn.digitaloceanspaces.com/grubbythegrape-754/Grubby_1.jpg 754w,
                //     https://grubbythegrape.sfo2.cdn.digitaloceanspaces.com/grubbythegrape-857/Grubby_1.jpg 857w
                // "
                srcSet={srcSet}
                src={src}
                alt="Grubby Comic"
            />
        </div>
    );
};

export default Comic;
