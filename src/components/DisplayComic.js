import React, { useEffect, useState } from "react";
import Comic from "./Comic";
import axios from "axios";
// import { getGlobalEmote } from "../helpers/GrubbyAPI";

const BASE_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5000";
const CDN = process.env.REACT_APP_CDN;

const DisplayComic = () => {
    const [src, setSrc] = useState("https://grubbythegrape.sfo2.cdn.digitaloceanspaces.com/960/blur.jpg");
    const [allImages, setAllImages] = useState([]);
    const [comicID, setComicID] = useState(null);
    const [name, setName] = useState(null);
    const [chipData, setChipData] = useState([
        { key: 0, label: "Laughing", icon: "😂", count: 0 },
        { key: 1, label: "Clapping", icon: "👏", count: 0 },
        { key: 2, label: "ROFL", icon: "🤣", count: 0 },
        { key: 3, label: "Grinning", icon: "😄", count: 0 },
        { key: 4, label: "Clown", icon: "🤡", count: 0 },
    ]);

    let srcSet = allImages.join();

    const handlePreviousComic = () => {
        console.log("loading previous comic");
    };

    const handleNextComic = () => {
        console.log("loading next comic");
    };

    useEffect(() => {
        async function getComic() {
            try {
                const sizes = ["320", "384", "512", "683", "800", "960"];
                let result = await axios.get(`${BASE_URL}/comic/latest`);
                setSrc(`${CDN}/960/${result.data.comic.name}`);
                setComicID(result.data.comic.comic_id);
                setName(result.data.comic.name);
                let urls = [];
                sizes.forEach((size) => urls.push(`${CDN}/${size}/${result.data.comic.name} ${size}w`));
                setAllImages(urls);
                setChipData((chipData) =>
                    chipData.map((data) => ({
                        ...data,
                        count: +result.data.comic.emotes[data.label],
                    }))
                );
            } catch (error) {
                setSrc(`${CDN}/960/Grubby_1.jpg`);
                return;
            }
        }

        getComic();
    }, []);

    return (
        <Comic
            src={src}
            srcSet={srcSet}
            handlePreviousComic={handlePreviousComic}
            handleNextComic={handleNextComic}
            id={comicID}
            chipData={chipData}
            setChipData={setChipData}
            name={name}
        ></Comic>
    );
};

export default DisplayComic;
