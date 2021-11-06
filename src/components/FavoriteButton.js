import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { deleteFavorite, createFavorite } from "../helpers/GrubbyAPI";

import { makeStyles, createTheme, ThemeProvider } from "@material-ui/core/styles";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Chip from "@material-ui/core/Chip";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import { UserContext } from "./UserContext";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const theme = createTheme({
    palette: {
        primary: {
            main: "#FF0000",
        },
        secondary: {
            main: "#FFFFFF",
        },
    },
});

const useStyles = makeStyles((theme) => ({
    chip: {
        margin: theme.spacing(0.5),
        backgroundColor: "#FFFFFF",
    },
    left: {
        margin: theme.spacing(0.5),
        backgroundColor: "#FFFFFF",
        visibility: "hidden",
        display: "block",
        // width: "100%",
        [theme.breakpoints.up("sm")]: {
            marginRight: 0,
            display: "none",
        },
        [theme.breakpoints.down("md")]: {
            marginRight: 0,
            display: "none",
        },
        [theme.breakpoints.up("lg")]: {
            marginRight: "auto",
            display: "block",
        },
    },
    right: {
        // margin: theme.spacing(0.5),
        margin: "8px",
        backgroundColor: "#FFFFFF",
        // width: "100%",

        [theme.breakpoints.up("sm")]: {
            marginLeft: 0,
            // margin: "auto",
            // width: "50%",
        },
        [theme.breakpoints.up("md")]: {
            marginLeft: 0,
            // margin: "auto",
            // width: "50%",
        },
        [theme.breakpoints.down("md")]: {
            // marginLeft: 0,
            margin: "8px auto 10px auto",
            // width: "20%",
            maxWidth: "72px",
        },

        [theme.breakpoints.up("lg")]: {
            marginLeft: "auto",
        },
    },
}));

const FavoriteButton = ({ orientation, comicID, favorite = false, name }) => {
    const location = useLocation();
    const pathname = location.pathname;
    const classes = useStyles();
    const className = orientation === "left" ? classes.left : classes.right;

    const { user, favorites, setFavorites } = useContext(UserContext);
    const [isFavorite, setIsFavorite] = useState(favorite);
    const [error, setError] = useState(false);

    const handleClose = () => {
        setError(false);
    };

    const handleFav = async () => {
        if (!user) {
            setError(true);
            return;
        }

        async function removeFav() {
            await deleteFavorite(comicID, user);
            setIsFavorite(() => (isFavorite ? false : true));
            setFavorites(() => favorites.filter((favorite) => favorite.comic_id !== comicID));
        }

        async function addFav() {
            await createFavorite(comicID, user);
            setIsFavorite(() => (isFavorite ? false : true));
            setFavorites((favorites) => [...favorites, { name: name, comic_id: comicID }]);
        }

        if (isFavorite) {
            removeFav();
        } else {
            addFav();
        }
    };

    useEffect(() => {
        async function checkFavorite() {
            if (pathname === "/favorites") {
                return;
            } else if (user && favorites.length > 0) {
                for (let i = 0; i < favorites.length; i++) {
                    if (favorites[i].comic_id === comicID) {
                        setIsFavorite(() => true);
                        break;
                    } else {
                        setIsFavorite(() => false);
                    }
                }
            } else {
                setIsFavorite(false);
            }
        }

        checkFavorite();
    }, [user, favorites, comicID, pathname]);

    return (
        <ThemeProvider theme={theme}>
            <Chip
                avatar={
                    <span
                        role="img"
                        style={{
                            fontSize: "1rem",
                            backgroundColor: "transparent",
                            display: "flex",
                            justifyContent: "center",
                            marginLeft: "16px",
                        }}
                        aria-labelledby="Favorite"
                    >
                        {isFavorite ? (
                            <FavoriteIcon color="primary"></FavoriteIcon>
                        ) : (
                            <FavoriteBorderIcon></FavoriteBorderIcon>
                        )}
                    </span>
                }
                className={className}
                clickable={true}
                color="secondary"
                onClick={handleFav}
                title="Favorite"
            />
            <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="info">
                    You must be logged in to favorite a comic!
                    <span role="img" aria-label="Winking Face" style={{ marginLeft: "5px" }}>
                        😃
                    </span>
                </Alert>
            </Snackbar>
        </ThemeProvider>
    );
};

export default FavoriteButton;
