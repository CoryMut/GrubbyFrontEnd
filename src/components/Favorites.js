import React, { useContext, useState } from "react";
import { UserContext } from "./UserContext";

import ComicCard from "../components/ComicCard";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

import { SRLWrapper } from "simple-react-lightbox";
import options from "../helpers/SRLWrapperOptions";

import Lottie from "lottie-react";
import clickHereData from "../lotties/click-here.json";

const CDN = process.env.REACT_APP_CDN;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        margin: "2vh 0 4vh 0",
        flexDirection: "column",
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    noFavs: {
        fontFamily: "comicfont",
        textAlign: "center",
    },
    card: {
        position: "relative",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        maxWidth: "308px",
        minWidth: "308px",
        width: "100%",
    },
    lottie: {
        [theme.breakpoints.down("md")]: {
            position: "absolute",
            bottom: "4.2%",
            left: "41%",
            width: "18%",
        },
        position: "absolute",
        bottom: "4.2%",
        left: "39.5%",
        width: "18%",
    },
    container: {
        fontFamily: "comicfont",
        textAlign: "center",
    },
}));

const Favorites = () => {
    const classes = useStyles();
    const { favorites, favLoading } = useContext(UserContext);
    const defaultFav = { name: "Grubby_1.jpg", comic_id: 1 };
    const [display, setDisplay] = useState([]);
    const [loading, setLoading] = useState(true);

    if (favorites.length > 0 && loading) {
        setLoading(() => false);
        setDisplay(() => favorites);
    }

    return (
        <div className={classes.root}>
            <Container maxWidth="lg" className={classes.container}>
                <h4>Favorites</h4>
                <SRLWrapper options={options}>
                    {display.length <= 0 && !favLoading && (
                        <div className={classes.noFavs}>
                            Looks like you do not currently have any favorite comics!<br></br>
                            <br></br>
                            You can add a comic to your favorites by clicking <FavoriteBorderIcon /> on each comic.
                            <Grid container justify="center">
                                <Grid item lg={3} xl={3} key={defaultFav.comic_id}>
                                    <div className={classes.card}>
                                        <ComicCard
                                            // description={comic.description}
                                            name={defaultFav.name}
                                            comicID={defaultFav.comic_id}
                                            image={`${CDN}/384/${defaultFav.name}`}
                                        ></ComicCard>
                                        <span className={classes.lottie}>
                                            <Lottie animationData={clickHereData} />
                                        </span>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    )}
                    {display.length > 0 && !favLoading && (
                        <Grid container spacing={3}>
                            {display.map((comic) => (
                                <Grid item xs={12} lg={3} md={4} sm={6} key={comic.comic_id}>
                                    <ComicCard
                                        // description={comic.description}
                                        name={comic.name}
                                        comicID={comic.comic_id}
                                        isFavorite={true}
                                    ></ComicCard>
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </SRLWrapper>
            </Container>
        </div>
    );
};

export default Favorites;
