import React, { useEffect, useState } from "react";
import { getAllComics } from "../helpers/GrubbyAPI";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";

import ComicCard from "../components/ComicCard";
import Search from "../components/Search";

import { SRLWrapper } from "simple-react-lightbox";

import "./AllComics.css";

const CDN = process.env.REACT_APP_CDN;

const options = {
    settings: {
        autoplaySpeed: 3000,
        disableKeyboardControls: false,
        disablePanzoom: true,
        disableWheelControls: true,
        hideControlsAfter: 3000,
        lightboxTransitionSpeed: 0.05,
        lightboxTransitionTimingFunction: "anticipate",
        overlayColor: "rgba(0, 0, 0, 0.9)",
        slideAnimationType: "slide",
        slideSpringValues: [2000, 200],
        slideTransitionSpeed: 0.3,
        slideTransitionTimingFunction: "easeIn",
    },
    buttons: {
        backgroundColor: "rgba(30,30,36,0.8)",
        iconColor: "rgba(255, 255, 255, 0.8)",
        iconPadding: "5px",
        showAutoplayButton: false,
        showCloseButton: true,
        showDownloadButton: false,
        showFullscreenButton: false,
        showNextButton: true,
        showPrevButton: true,
        showThumbnailsButton: false,
        size: "40px",
    },
    thumbnails: {
        showThumbnails: false,
        thumbnailsAlignment: "center",
        thumbnailsContainerBackgroundColor: "transparent",
        thumbnailsContainerPadding: "0",
        thumbnailsGap: "1px",
        thumbnailsOpacity: 0.4,
        thumbnailsPosition: "left",
        thumbnailsSize: ["100px", "80px"],
    },
    caption: {
        captionAlignment: "start",
        captionColor: "#FFFFFF",
        captionContainerPadding: "0",
        captionFontFamily: "inherit",
        captionFontSize: "inherit",
        captionFontStyle: "inherit",
        captionFontWeight: "inherit",
        captionTextTransform: "inherit",
        showCaption: true,
    },
};

const useStyles = makeStyles((theme) => ({
    "@global": {
        body: {
            backgroundImage: "url(https://grubbythegrape.sfo2.cdn.digitaloceanspaces.com/assets/assets/purple.png)",
        },
    },
    root: {
        display: "flex",
        marginTop: "2vh",
        marginBottom: "5vh",
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    alert: {
        marginTop: "2vh",
    },
}));

const AllComics = () => {
    const classes = useStyles();
    const [alert, setAlert] = useState("");
    const [allComics, setAllComics] = useState([]);
    const [displayComics, setDisplayComics] = useState([]);

    useEffect(() => {
        async function getComics() {
            try {
                let result = await getAllComics();
                let { comics } = result;
                setAllComics(comics);
                setDisplayComics(comics);
            } catch (error) {
                // setDisabled(true);
                setAlert({
                    type: "error",
                    message: `Uh oh, something went wrong fetching the comic data. Please try refreshing the page.`,
                });

                return;
            }
        }
        getComics();
    }, []);

    return (
        <div className={classes.root}>
            <Container maxWidth="lg">
                <Search setDisplayComics={setDisplayComics} setAlert={setAlert} allComics={allComics}></Search>
                {alert && (
                    <Alert className={classes.alert} severity={alert.type}>
                        {alert.message}
                    </Alert>
                )}

                <SRLWrapper options={options}>
                    <Grid container spacing={3}>
                        {displayComics.map((comic) => (
                            <Grid item xs={12} lg={3} md={4} sm={6} key={comic.comic_id}>
                                <ComicCard
                                    description={comic.description}
                                    name={comic.name}
                                    comicID={comic.comic_id}
                                    image={`${CDN}/384/${comic.name}`}
                                ></ComicCard>
                            </Grid>
                        ))}
                    </Grid>
                </SRLWrapper>
            </Container>
        </div>
    );
};

export default AllComics;
