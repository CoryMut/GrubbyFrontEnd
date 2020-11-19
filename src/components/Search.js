import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import { searchComics } from "../helpers/GrubbyAPI";

const Search = ({ setDisplayComics, setAlert, allComics }) => {
    const [previous, setPrevious] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [submitStatus, setSubmitStatus] = useState(false);

    const handleChange = (event) => {
        if (event.target.value === "") {
            setAlert("");
            setPrevious("");
            setDisplayComics(allComics);
        }

        setSearchTerm(event.target.value);

        if (previous !== searchTerm) {
            setSubmitStatus(false);
        }
    };

    const handleClear = (event) => {
        console.log("handleClear");
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

    return (
        <SearchBar
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleClear={handleClear}
            submitStatus={submitStatus}
            searchTerm={searchTerm}
        ></SearchBar>
    );
};

export default Search;
