import React, { useEffect, useState, useCallback } from "react";
import Comic from "./Comic";
import { getLatestComic, getPreviousComic } from "../helpers/GrubbyAPI";

import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import IconButton from "@material-ui/core/IconButton";

const CDN = process.env.REACT_APP_CDN;

const useStyles = makeStyles((theme) => ({
    comicWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    arrow: {
        cursor: "pointer",
    },
    invisible: {
        visibility: "hidden",
    },
    hide: {
        display: "none",
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

    const rightArrow = comicID === count ? classes.invisible : classes.arrow;
    const leftArrow = comicID === 1 ? classes.invisible : classes.arrow;

    const makeSrcSet = (name) => {
        const sizes = ["320", "384", "512", "683", "800"];
        let urls = [];
        sizes.forEach((size) => urls.push(`${CDN}/${size}/${name} ${size}w`));
        let srcSet = urls.join();
        return srcSet;
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
        let srcSet = makeSrcSet(name);
        setSrcSet(() => srcSet);
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
                comicSwitch(result);
                let { comic_id, emotes } = result;
                setCount(() => comic_id);
                setEmoteData(() => ({ ...emotes }));
            } catch (error) {
                setSrc(`${CDN}/960/Grubby_1.jpg`);
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

    return (
        <div className={classes.comicWrapper}>
            <IconButton onClick={() => handlePreviousComic(comicID - 1)} className={matches ? classes.hide : leftArrow}>
                <ArrowBackIcon />
            </IconButton>
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
            ></Comic>
            <IconButton onClick={() => handleNextComic(comicID + 1)} className={matches ? classes.hide : rightArrow}>
                <ArrowForwardIcon />
            </IconButton>
        </div>
    );
};

export default DisplayComic;
