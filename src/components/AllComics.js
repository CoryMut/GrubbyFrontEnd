import React, { useEffect, useState } from "react";
import { getAllComics, searchComics } from "../helpers/GrubbyAPI";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";

import ComicCard from "../components/ComicCard";
import SearchBar from "../components/SearchBar";

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
        lightboxTransitionSpeed: 0.3,
        lightboxTransitionTimingFunction: "linear",
        overlayColor: "rgba(0, 0, 0, 0.9)",
        slideAnimationType: "slide",
        slideSpringValues: [1000, 200],
        slideTransitionSpeed: 0.2,
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
    root: {
        display: "flex",
        marginTop: "1vh",
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
    const [allComics, setAllComics] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [previous, setPrevious] = useState("");
    const [submitStatus, setSubmitStatus] = useState(false);
    const [displayComics, setDisplayComics] = useState([]);
    const [alert, setAlert] = useState("");
    const [disabled, setDisabled] = useState(false);

    const handleChange = (event) => {
        if (event.target.value === "") {
            setAlert("");
            setDisplayComics(allComics);
        }

        setSearchTerm(event.target.value);

        if (previous !== searchTerm) {
            setSubmitStatus(false);
        }
    };

    const handleClear = (event) => {
        setSearchTerm("");
        setAlert("");
        setDisplayComics(allComics);
    };

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();

            if (previous === searchTerm) {
                return;
            }

            setSubmitStatus(true);
            setAlert("");
            let result = await searchComics(searchTerm);
            let { results } = result;

            if (results.length === 0) {
                setAlert({ type: "warning", message: `No comics found using ${searchTerm}` });
            }

            setDisplayComics(results);
            setPrevious(searchTerm);
        } catch (error) {
            setAlert({ type: "error", message: ` Oh no! Something went wrong! Please try again.` });
            return;
        }
    };
    useEffect(() => {
        async function getComics() {
            try {
                let result = await getAllComics();
                let { comics } = result;
                setAllComics(comics);
                setDisplayComics(comics);
            } catch (error) {
                setDisabled(true);
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
                <SearchBar
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    searchTerm={searchTerm}
                    submitStatus={submitStatus}
                    handleClear={handleClear}
                    disabled={disabled}
                ></SearchBar>
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
