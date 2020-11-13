import React, { useEffect, useState } from "react";
import Comic from "../components/Comic";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5000";
const CDN = process.env.REACT_APP_CDN;

const HomePage = () => {
    const [src, setSrc] = useState(`${CDN}/960/Grubby_1.jpg`);
    const [allImages, setAllImages] = useState([]);
    let srcSet = allImages.join();

    useEffect(() => {
        async function getComic() {
            try {
                const sizes = ["320", "384", "512", "683", "800", "960"];
                let result = await axios.get(`${BASE_URL}/comic/latest`);
                setSrc(`${CDN}/960/${result.data.comic.name}`);
                let urls = [];
                sizes.forEach((size) => urls.push(`${CDN}/${size}/${result.data.comic.name} ${size}w`));
                setAllImages(urls);
            } catch (error) {
                return;
            }
        }

        getComic();
    }, []);

    return <Comic src={src} srcSet={srcSet}></Comic>;
};

export default HomePage;
