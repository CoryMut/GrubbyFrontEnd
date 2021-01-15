import React, { useEffect, useState, useCallback } from "react";
import Comic from "./Comic";
import { getLatestComic, getPreviousComic } from "../helpers/GrubbyAPI";

import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Typography from "@material-ui/core/Typography";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import IconButton from "@material-ui/core/IconButton";

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
    const matches = useMediaQuery("(max-width:900px)");

    const [src, setSrc] = useState(`${CDN}/800/blur.jpg`);
    const [srcSet, setSrcSet] = useState("");
    const [comicID, setComicID] = useState(0);
    const [name, setName] = useState("");
    const [count, setCount] = useState(null);

    const [chipData, setChipData] = useState([
        { key: 0, label: "Laughing", icon: "😂", count: 0 },
        { key: 1, label: "Clapping", icon: "👏", count: 0 },
        { key: 2, label: "ROFL", icon: "🤣", count: 0 },
        { key: 3, label: "Grinning", icon: "😄", count: 0 },
        { key: 4, label: "Clown", icon: "🤡", count: 0 },
    ]);

    const [prevComic, setPrevComic] = useState({});
    const [emoteData, setEmoteData] = useState({});
    const [visitedComics, setVisitedComics] = useState({});

    const [isLoading, setIsLoading] = useState(true);
    const [unavailable, setUnavailable] = useState(false);

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

            comicSwitch(visitedComics[id]);
        } catch (error) {
            return;
        }
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
                let preloadComic = await getPreviousComic(prevID);
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
        <div className={classes.comicWrapper}>
            <IconButton onClick={() => handlePreviousComic(comicID - 1)} className={matches ? classes.hide : leftArrow}>
                <ArrowBackIcon />
            </IconButton>
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
                    count={count}
                    visible={false}
                    isLoading={isLoading}
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
                    count={count}
                    visible={true}
                ></Comic>
            )}

            <IconButton onClick={() => handleNextComic(comicID + 1)} className={matches ? classes.hide : rightArrow}>
                <ArrowForwardIcon />
            </IconButton>
        </div>
    );
};

export default DisplayComic;
