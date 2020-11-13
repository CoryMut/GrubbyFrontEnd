import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
    logo: {
        cursor: "pointer",
        maxWidth: "325px",
        width: "100%",
    },
}));

const Logo = () => {
    const classes = useStyles();

    return (
        <Link to="/">
            <img
                className={classes.logo}
                src="https://grubbythegrape.sfo2.cdn.digitaloceanspaces.com/assets/assets/logo/logo%28325x55%29.png"
                alt="Grubby the Grape logo"
            ></img>
        </Link>
    );
};

export default Logo;
