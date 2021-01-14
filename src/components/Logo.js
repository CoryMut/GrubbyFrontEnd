import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    logo: {
        cursor: "pointer",
        maxWidth: "230px",
        width: "100%",
        userSelect: "none",
        [theme.breakpoints.down("md")]: {
            width: "90%",
        },
    },
}));

const Logo = () => {
    const classes = useStyles();
    const location = useLocation();

    const handleClick = () => {
        if (location.pathname === "/") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <Link to="/" onClick={handleClick}>
            <img
                className={classes.logo}
                src="https://grubbythegrape.sfo2.cdn.digitaloceanspaces.com/assets/assets/logo/white_logo_crop.png"
                alt="Grubby the Grape logo"
            ></img>
        </Link>
    );
};

export default Logo;
