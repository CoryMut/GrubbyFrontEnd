import React, { useEffect, useState, useCallback, useContext } from "react";
import Comic from "./Comic";
import { getLatestComic, getComic, getUserEmoteData, getGlobalEmote } from "../helpers/GrubbyAPI";

import { makeStyles, createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Typography from "@material-ui/core/Typography";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import IconButton from "@material-ui/core/IconButton";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";

import Lottie from "lottie-react";
import noAccessData from "../lotties/no-access.json";

import { UserContext } from "./UserContext";

const CDN = process.env.REACT_APP_CDN;

const makeSrcSet = (name) => {
    const sizes = ["320", "384", "512", "683", "800"];
    let urls = [];
    sizes.forEach((size) => urls.push(`${CDN}/${size}/${name} ${size}w`));
    let srcSet = urls.join();
    return srcSet;
};

const theme = createMuiTheme({
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
        display: "inline-block",
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

const DisplayComic = () => {
    const classes = useStyles();
    const matches = useMediaQuery("(max-width:900px)"); //900
    const { user } = useContext(UserContext);

    const [src, setSrc] = useState(`${CDN}/800/blur.jpg`);
    const [srcSet, setSrcSet] = useState("");
    const [comicID, setComicID] = useState(0);
    const [name, setName] = useState("");
    const [count, setCount] = useState(null);

    const [chipData, setChipData] = useState([
        {
            key: 0,
            label: "Laughing",
            icon: "https://grubbythegrape.sfo2.cdn.digitaloceanspaces.com/assets/assets/Emoji1_24x24.png",
            count: 0,
        },
        {
            key: 1,
            label: "Clapping",
            icon: "https://grubbythegrape.sfo2.cdn.digitaloceanspaces.com/assets/assets/Emoji2_24x24.png",
            count: 0,
        },
        {
            key: 2,
            label: "ROFL",
            icon: "https://grubbythegrape.sfo2.cdn.digitaloceanspaces.com/assets/assets/Emoji3_24x24.png",
            count: 0,
        },
        {
            key: 3,
            label: "Grinning",
            icon: "https://grubbythegrape.sfo2.cdn.digitaloceanspaces.com/assets/assets/Emoji4_24x24.png",
            count: 0,
        },
        {
            key: 4,
            label: "Clown",
            icon: "https://grubbythegrape.sfo2.cdn.digitaloceanspaces.com/assets/assets/Emoji5_24x24.png",
            count: 0,
        },
    ]);
    // const [chipData, setChipData] = useState([
    //     { key: 0, label: "Laughing", icon: "😂", count: 0 },
    //     { key: 1, label: "Clapping", icon: "👏", count: 0 },
    //     { key: 2, label: "ROFL", icon: "🤣", count: 0 },
    //     { key: 3, label: "Grinning", icon: "😄", count: 0 },
    //     { key: 4, label: "Clown", icon: "🤡", count: 0 },
    // ]);

    const [prevComic, setPrevComic] = useState({});
    const [nextComic, setNextComic] = useState({});
    const [emoteData, setEmoteData] = useState({});
    const [visitedComics, setVisitedComics] = useState({});

    const [isLoading, setIsLoading] = useState(true);
    const [unavailable, setUnavailable] = useState(false);

    const [firstComic, setFirstComic] = useState({});
    const [lastComic, setLastComic] = useState({});
    const [randomComic, setRandomComic] = useState({});
    const [usedRandom, setUsedRandom] = useState(true);

    const [reaction, setReaction] = useState("");

    const rightArrow = isLoading || comicID === count ? classes.invisible : classes.arrow;
    const leftArrow = comicID === 1 ? classes.invisible : classes.arrow;

    const handlePreviousComic = async (id) => {
        try {
            if (id === 0) {
                return;
            }

            visitedComics[comicID] = { comic_id: comicID, name: name, emotes: { ...emoteData } };
            setVisitedComics(() => ({
                ...visitedComics,
            }));
            comicSwitch(prevComic);
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
                // setChipData((chipData) =>
                //     chipData.map((data) => ({
                //         ...data,
                //         count: +result[data.label],
                //     }))
                // );
                comicSwitch(visitedComics[id]);
            } else {
                visitedComics[comicID] = { comic_id: comicID, name: name, emotes: { ...emoteData } };
                setVisitedComics(() => ({
                    ...visitedComics,
                }));
                comicSwitch(nextComic);
            }

            // comicSwitch(visitedComics[id], emoteData);
        } catch (error) {
            return;
        }
    };

    const handleFirstComic = () => {
        comicSwitch(firstComic);
    };

    const handleLastComic = () => {
        comicSwitch(lastComic);
    };

    const handleRandomComic = () => {
        comicSwitch(randomComic);
        setUsedRandom(() => true);
    };

    const comicSwitch = useCallback((data) => {
        let { name, comic_id, emotes } = data;
        setComicID(comic_id);
        setName(name);
        setSrc(() => `${CDN}/800/${name}`);
        let newSrcSet = makeSrcSet(name);
        setSrcSet(() => newSrcSet);

        setEmoteData(() => ({ ...emotes }));
        setChipData((chipData) =>
            chipData.map((data) => ({
                ...data,
                count: +emotes[data.label],
            }))
        );
    }, []);

    useEffect(() => {
        async function getComic() {
            try {
                let result = await getLatestComic();
                let { name } = result;
                new Image().src = `${CDN}/800/${name}`;
                comicSwitch(result);
                let { comic_id } = result;
                setCount(() => comic_id);
                setIsLoading(() => false);
                setLastComic(() => ({ ...result }));
            } catch (error) {
                setUnavailable(() => true);
                setIsLoading(() => false);
                return;
            }
        }

        getComic();
    }, [comicSwitch]);

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
            let firstComicInfo = await getComic(id);
            let { name } = firstComicInfo;
            let srcSet = makeSrcSet(name);
            new Image().setAttribute("srcset", srcSet);
            setFirstComic(() => ({ ...firstComicInfo }));
        }

        getFirstComic(1);
    }, []);

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
                return;
            }
        }
        getEmoteData(comicID);
    }, [user, comicID]);

    useEffect(() => {
        async function preloadNextComic(id) {
            let preloadNextComic = await getComic(id);
            let { name } = preloadNextComic;
            let srcSet = makeSrcSet(name);
            new Image().setAttribute("srcset", srcSet);
            visitedComics[id] = { ...preloadNextComic };
            setVisitedComics(() => ({
                ...visitedComics,
            }));
            setNextComic(() => ({ ...preloadNextComic }));
        }
        if (!visitedComics[comicID + 1] && count !== null && comicID !== count) {
            preloadNextComic(comicID + 1);
        }
    }, [comicID, visitedComics, count]);

    useEffect(() => {
        async function preloadRandomComic(id) {
            let preloadComic = await getComic(id);
            let { name } = preloadComic;
            let srcSet = makeSrcSet(name);
            new Image().setAttribute("srcset", srcSet);
            visitedComics[id] = { ...preloadComic };
            setVisitedComics(() => ({
                ...visitedComics,
            }));
            setUsedRandom(() => false);
            setRandomComic(() => ({ ...preloadComic }));
        }
        let randomNumber;
        if (count !== 0 && count !== null && count !== undefined && usedRandom === true) {
            randomNumber = Math.floor(Math.random() * count);
            if (randomNumber !== comicID) {
                preloadRandomComic(randomNumber);
            }
        }
    }, [count, usedRandom]);

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
            <div className={classes.comicWrapper}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <IconButton
                        onClick={() => handlePreviousComic(comicID - 1)}
                        className={matches ? classes.hide : leftArrow}
                    >
                        <ArrowBackIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={handleFirstComic} className={matches ? classes.hide : leftArrow}>
                        <SkipPreviousIcon color="primary" />
                    </IconButton>
                </div>
                {isLoading && !unavailable && (
                    <Comic
                        src={src}
                        // srcSet={srcSet}
                        id={comicID}
                        chipData={chipData}
                        setChipData={setChipData}
                        name={name}
                        handleNextComic={handleNextComic}
                        handlePreviousComic={handlePreviousComic}
                        handleRandomComic={handleRandomComic}
                        count={count}
                        visible={false}
                        isLoading={isLoading}
                        reaction={reaction}
                        setReaction={setReaction}
                    ></Comic>
                )}
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
                        count={count}
                        visible={true}
                        reaction={reaction}
                        setReaction={setReaction}
                        hideRandom={matches ? false : true}
                    ></Comic>
                )}
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <IconButton
                        onClick={() => handleNextComic(comicID + 1)}
                        className={matches ? classes.hide : rightArrow}
                    >
                        <ArrowForwardIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={handleLastComic} className={matches ? classes.hide : rightArrow}>
                        <SkipNextIcon color="primary" />
                    </IconButton>
                </div>
            </div>
        </ThemeProvider>
    );
};

export default DisplayComic;
