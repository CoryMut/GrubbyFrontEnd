import React, { useEffect, useState, useCallback, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { getLatestComic, getComic, getUserEmoteData, getGlobalEmote } from "../helpers/GrubbyAPI";
import { UserContext } from "./UserContext";
import Comic from "./Comic";
import CustomSnackBar from "../components/CustomSnackBar";

import { makeStyles, createTheme, ThemeProvider } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import IconButton from "@material-ui/core/IconButton";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import Alert from "@material-ui/lab/Alert";

import Lottie from "lottie-react";
import noAccessData from "../lotties/no-access.json";

const CDN = process.env.REACT_APP_CDN;

const makeSrcSet = (name) => {
    const sizes = ["320", "384", "512", "683", "800"];
    let urls = [];
    sizes.forEach((size) => urls.push(`${CDN}/${size}/${name} ${size}w`));
    let srcSet = urls.join();
    return srcSet;
};

const theme = createTheme({
    palette: {
        primary: {
            main: "#FFFFFF",
        },
    },
});

const useStyles = makeStyles((theme) => ({
    comicWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    arrow: {
        cursor: "pointer",
        display: "inline-block !important",
        visibility: "visible !important",
    },
    invisible: {
        visibility: "hidden",
    },
    hide: {
        display: "none",
    },
    lottie: {
        width: "100%",
        marginTop: "2vh",
    },
    transparent: {
        opacity: 0,
    },
    wrapper: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "50vw",
        [theme.breakpoints.down("md")]: {
            maxWidth: "100vw",
            margin: "0 3vw",
        },
        margin: "auto",
    },
    font: {
        fontFamily: "comicfont",
    },
}));

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const DisplayComic = () => {
    const classes = useStyles();
    const history = useHistory();
    const query = useQuery();
    const searchParam = query.get("c");
    const matches = useMediaQuery("(max-width:900px)");
    const { user } = useContext(UserContext);

    const [src, setSrc] = useState(`${CDN}/800/blur.jpg`);
    const [srcSet, setSrcSet] = useState("");
    const [comicID, setComicID] = useState(0);
    const [name, setName] = useState("");
    const [count, setCount] = useState(null);
    const [requestedComic, setRequestedComic] = useState(searchParam);

    const [chipData, setChipData] = useState([
        {
            key: 0,
            label: "Laughing",
            icon: "https://grubbythegrape.sfo2.cdn.digitaloceanspaces.com/assets/assets/Emoji1_24x24.png 1x, https://grubbythegrape.sfo2.cdn.digitaloceanspaces.com/assets/assets/Emoji1_48x48.png 2x",
            count: 0,
        },
        {
            key: 1,
            label: "Clapping",
            icon: "https://grubbythegrape.sfo2.cdn.digitaloceanspaces.com/assets/assets/Emoji2_24x24.png 1x, https://grubbythegrape.sfo2.cdn.digitaloceanspaces.com/assets/assets/Emoji2_48x48.png 2x",
            count: 0,
        },
        {
            key: 2,
            label: "ROFL",
            icon: "https://grubbythegrape.sfo2.cdn.digitaloceanspaces.com/assets/assets/Emoji3_24x24.png 1x, https://grubbythegrape.sfo2.cdn.digitaloceanspaces.com/assets/assets/Emoji3_48x48.png 2x",
            count: 0,
        },
        {
            key: 3,
            label: "Grinning",
            icon: "https://grubbythegrape.sfo2.cdn.digitaloceanspaces.com/assets/assets/Emoji4_24x24.png 1x, https://grubbythegrape.sfo2.cdn.digitaloceanspaces.com/assets/assets/Emoji4_48x48.png 2x",
            count: 0,
        },
        {
            key: 4,
            label: "Clown",
            icon: "https://grubbythegrape.sfo2.cdn.digitaloceanspaces.com/assets/assets/Emoji5_24x24.png 1x, https://grubbythegrape.sfo2.cdn.digitaloceanspaces.com/assets/assets/Emoji5_48x48.png 2x",
            count: 0,
        },
    ]);

    const [prevComic, setPrevComic] = useState({});
    const [nextComic, setNextComic] = useState({});
    const [emoteData, setEmoteData] = useState({});
    const [visitedComics, setVisitedComics] = useState({});

    const [isLoading, setIsLoading] = useState(true);
    const [unavailable, setUnavailable] = useState(false);
    const [getRandom, setGetRandom] = useState(false);

    const [firstComic, setFirstComic] = useState({});
    const [lastComic, setLastComic] = useState({});
    const [randomComic, setRandomComic] = useState({});
    const [usedRandom, setUsedRandom] = useState(true);
    const [requestComplete, setRequestComplete] = useState(false);

    const [reaction, setReaction] = useState("");
    const [error, setError] = useState(false);
    const [emoteError, setEmoteError] = useState(false);

    const [preloadingNext, setPreloadingNext] = useState(false);

    const rightArrow = isLoading || comicID === count ? classes.invisible : classes.arrow;
    const leftArrow = comicID === 1 ? classes.invisible : classes.arrow;

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setError(false);
        setEmoteError(() => false);
    };

    const handleError = () => {
        setError(() => true);
    };

    const handleEmoteError = () => {
        setEmoteError(() => true);
    };

    const handlePreviousComic = async (id) => {
        try {
            if (id === 0) {
                return;
            }

            visitedComics[comicID] = { comic_id: comicID, name: name, emotes: { ...emoteData } };
            setVisitedComics(() => ({
                ...visitedComics,
            }));
            comicSwitch(prevComic, count);
        } catch (error) {
            return;
        }
    };

    const handleNextComic = async (id) => {
        try {
            if (id > count) {
                return;
            }
            if (visitedComics[id]) {
                let result = await getGlobalEmote(chipData, id);
                visitedComics[id] = { ...visitedComics[id], emotes: { ...result } };
                setVisitedComics(() => ({
                    ...visitedComics,
                }));
                setEmoteData(() => ({ ...result }));

                comicSwitch(visitedComics[id], count);

                if (id === count) {
                    setLastComic(() => ({ ...lastComic, emotes: { ...result } }));
                }
            } else {
                visitedComics[comicID] = { comic_id: comicID, name: name, emotes: { ...emoteData } };
                setVisitedComics(() => ({
                    ...visitedComics,
                }));
                comicSwitch(nextComic, count);
            }
        } catch (error) {
            return;
        }
    };

    const handleFirstComic = () => {
        comicSwitch(firstComic, count);
    };

    const handleLastComic = () => {
        comicSwitch(lastComic, count);
    };

    const handleRandomComic = () => {
        comicSwitch(randomComic, count);
        setUsedRandom(() => true);
    };

    const comicSwitch = useCallback(
        (data, unofficialCount = -1, preSrcSet = null) => {
            let { name, comic_id, emotes } = data;
            setComicID(comic_id);
            setName(name);
            setSrc(() => `${CDN}/800/${name}`);

            if (!preSrcSet) {
                let newSrcSet = makeSrcSet(name);
                setSrcSet(() => newSrcSet);
            } else {
                setSrcSet(() => preSrcSet);
            }

            setEmoteData(() => ({ ...emotes }));
            setChipData((chipData) =>
                chipData.map((data) => ({
                    ...data,
                    count: +emotes[data.label],
                }))
            );
            if (comic_id !== unofficialCount) {
                history.replace(`?c=${comic_id}`);
            } else {
                history.replace("/");
            }
        },
        [history]
    );

    useEffect(() => {
        async function getComic() {
            try {
                let result = await getLatestComic();
                let { name } = result;
                let img = new Image();
                let srcSet = makeSrcSet(name);
                img.srcset = srcSet;
                img.onload = function () {
                    setIsLoading(() => false);
                };
                let { comic_id } = result;
                setCount(() => comic_id);
                comicSwitch(result, comic_id, srcSet);
                setLastComic(() => ({ ...result }));
                setGetRandom(() => true);
            } catch (error) {
                setUnavailable(() => true);
                setIsLoading(() => false);
                return;
            }
        }
        if (!requestedComic) {
            getComic();
        }
    }, [comicSwitch, requestedComic]);

    useEffect(() => {
        async function preload(id) {
            try {
                if (id === 0) {
                    return;
                }
                let prevID = id - 1;
                if (prevID < 1) {
                    return;
                }
                let preloadComic = await getComic(prevID);
                if (preloadComic.comic_id === 1) {
                    setFirstComic(() => ({ ...preloadComic }));
                }
                let { name } = preloadComic;
                let srcSet = makeSrcSet(name);
                new Image().setAttribute("srcset", srcSet);
                setPrevComic(() => ({ ...preloadComic }));
            } catch (error) {
                return;
            }
        }

        preload(comicID);
    }, [comicID]);

    useEffect(() => {
        async function getFirstComic(id) {
            try {
                let firstComicInfo = await getComic(id);
                let { name } = firstComicInfo;
                let srcSet = makeSrcSet(name);
                new Image().setAttribute("srcset", srcSet);
                setFirstComic(() => ({ ...firstComicInfo }));
            } catch (error) {
                return;
            }
        }
        if (Object.keys(firstComic).length === 0) {
            getFirstComic(1);
        }
    }, [firstComic]);

    useEffect(() => {
        async function getEmoteData(id) {
            try {
                if (user) {
                    if (id === null || id === undefined || id === 0) {
                        return;
                    }
                    let result = await getUserEmoteData(id, user);
                    setReaction(() => result);
                } else {
                    return;
                }
            } catch (error) {
                handleEmoteError();
                return;
            }
        }
        getEmoteData(comicID);
    }, [user, comicID]);

    useEffect(() => {
        async function preloadNextComic(id) {
            try {
                setPreloadingNext(true);
                let preloadNextComic = await getComic(id);
                let { name } = preloadNextComic;
                let srcSet = makeSrcSet(name);
                new Image().setAttribute("srcset", srcSet);
                visitedComics[id] = { ...preloadNextComic };
                setVisitedComics(() => ({
                    ...visitedComics,
                }));
                setNextComic(() => ({ ...preloadNextComic }));
                setPreloadingNext(false);
            } catch (error) {
                return;
            }
        }
        if (preloadingNext) {
            return;
        } else if (!visitedComics[comicID + 1] && count !== null && comicID !== count && comicID !== 0) {
            preloadNextComic(comicID + 1);
        }
    }, [comicID, visitedComics, count, requestedComic, preloadingNext]);

    useEffect(() => {
        async function preloadRandomComic(id) {
            try {
                setUsedRandom(() => false);
                let preloadComic = await getComic(id);
                let { name } = preloadComic;
                let srcSet = makeSrcSet(name);
                new Image().setAttribute("srcset", srcSet);
                visitedComics[id] = { ...preloadComic };
                setVisitedComics(() => ({
                    ...visitedComics,
                }));

                setRandomComic(() => ({ ...preloadComic }));
            } catch (error) {
                return;
            }
        }
        let randomNumber;

        if (getRandom === true && usedRandom === true) {
            randomNumber = Math.floor(Math.random() * count + 1);
            if (randomNumber !== comicID) {
                preloadRandomComic(randomNumber);
            }
        }
    }, [getRandom, usedRandom, comicID, count, visitedComics]);

    useEffect(() => {
        async function handleQuery() {
            try {
                let request = await getComic(requestedComic);
                setRequestComplete(() => true);
                let { name } = request;
                let img = new Image();
                let srcSet = makeSrcSet(name);
                img.srcset = srcSet;
                img.onload = function () {
                    comicSwitch(request, count, srcSet);
                    setIsLoading(() => false);
                };

                let result = await getLatestComic();
                let lastComicName = result.name;
                let srcSet2 = makeSrcSet(lastComicName);
                new Image().setAttribute("srcset", srcSet2);
                let { comic_id } = result;
                setCount(() => comic_id);
                setLastComic(() => ({ ...result }));
                setGetRandom(() => true);
            } catch (error) {
                setRequestedComic(() => false);
                return;
            }
        }

        if (requestedComic === "undefined" || Number.isNaN(Number(requestedComic))) {
            setRequestedComic(() => false);
        } else if (requestedComic && requestComplete === false) {
            handleQuery();
        }
    }, [requestedComic, comicSwitch, count, requestComplete]);

    if (unavailable && !isLoading) {
        return (
            <div className={classes.wrapper}>
                <Typography variant="body1" component="div" className={classes.font} align="justify">
                    Oh no! Seems we have been locked out of the room with the comics inside! <br /> <br /> We are
                    working to fix the problem and they should be back soon.
                </Typography>

                <span className={classes.lottie}>
                    <Lottie animationData={noAccessData} />
                </span>
            </div>
        );
    }

    return (
        <ThemeProvider theme={theme}>
            <div style={{ display: "flex", flexDirection: "column" }}>
                {emoteError && (
                    <Alert
                        onClose={() => handleClose()}
                        style={{ maxWidth: "100vw", marginBottom: "10px" }}
                        severity="error"
                    >
                        There was a problem getting your reaction info. Try refreshing?
                    </Alert>
                )}
                {!isLoading && (
                    <div className={classes.comicWrapper}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            {!matches && (
                                <IconButton
                                    onClick={() =>
                                        Object.keys(prevComic).length !== 0
                                            ? handlePreviousComic(comicID - 1)
                                            : handleError()
                                    }
                                    className={matches ? classes.hide : leftArrow}
                                >
                                    <ArrowBackIcon color="primary" />
                                </IconButton>
                            )}
                            {!matches && (
                                <IconButton
                                    onClick={() =>
                                        Object.keys(firstComic).length !== 0 ? handleFirstComic() : handleError()
                                    }
                                    className={matches ? classes.hide : leftArrow}
                                >
                                    <SkipPreviousIcon color="primary" />
                                </IconButton>
                            )}
                        </div>

                        {!isLoading && !unavailable && (
                            <Comic
                                src={src}
                                srcSet={srcSet}
                                id={comicID}
                                chipData={chipData}
                                setChipData={setChipData}
                                name={name}
                                handleNextComic={handleNextComic}
                                handlePreviousComic={handlePreviousComic}
                                handleRandomComic={handleRandomComic}
                                handleFirstComic={handleFirstComic}
                                handleLastComic={handleLastComic}
                                handleError={handleError}
                                count={count}
                                visible={true}
                                reaction={reaction}
                                setReaction={setReaction}
                                hideRandom={matches ? false : true}
                                randomComic={randomComic}
                                prevComic={prevComic}
                                nextComic={nextComic}
                                firstComic={firstComic}
                                lastComic={lastComic}
                            ></Comic>
                        )}
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <IconButton
                                onClick={() =>
                                    Object.keys(prevComic).length !== 0 || comicID === 1
                                        ? handleNextComic(comicID + 1)
                                        : handleError()
                                }
                                className={matches ? classes.hide : rightArrow}
                                style={{ visibility: "hidden" }}
                            >
                                <ArrowForwardIcon color="primary" />
                            </IconButton>
                            <IconButton
                                onClick={() =>
                                    Object.keys(firstComic).length !== 0 ? handleLastComic() : handleError()
                                }
                                className={matches ? classes.hide : rightArrow}
                                style={{ visibility: "hidden" }}
                            >
                                <SkipNextIcon color="primary" />
                            </IconButton>
                        </div>
                    </div>
                )}
                <CustomSnackBar
                    open={error}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    severity="error"
                    emoji="😔"
                    emojiLabel="Pensive Face"
                    message="There was a problem getting comic info. Try refreshing?"
                    encloseMessage={false}
                ></CustomSnackBar>
            </div>
        </ThemeProvider>
    );
};

export default DisplayComic;
