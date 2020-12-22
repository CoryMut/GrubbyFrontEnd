import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import SearchBar from "../components/SearchBar";
import { searchComics } from "../helpers/GrubbyAPI";

const Search = ({ setDisplayComics, setAlert, allComics, setCount, query, setQuery, page, setPage }) => {
    const history = useHistory();
    const [previous, setPrevious] = useState("");
    const [searchTerm, setSearchTerm] = useState(query ? query : "");
    const [submitStatus, setSubmitStatus] = useState(false);

    const handleChange = (event) => {
        if (event.target.value === "") {
            setAlert("");
            setPrevious("");
            setDisplayComics(allComics);
            history.replace({
                pathname: "/all",
                search: `?page=${page}`,
            });
            setQuery(null);
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
        history.replace({
            pathname: "/all",
            search: `?page=1`,
        });
        setQuery((query) => null);
        setPage((page) => 1);
    };

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();

            if (previous === searchTerm) {
                return;
            }

            setSubmitStatus(true);
            setAlert("");
            // setParams((params) => `?q=${searchTerm}`);
            history.replace({
                pathname: "/all",
                search: `?q=${searchTerm}`,
            });
            let result = await searchComics(searchTerm);
            let { comics, count } = result;

            if (comics.length === 0) {
                setAlert({ type: "warning", message: `No comics found using ${searchTerm}` });
            }

            setDisplayComics(comics);
            setCount(count);
            setPrevious(searchTerm);
            setQuery(searchTerm);
        } catch (error) {
            setAlert({ type: "error", message: ` Oh no! Something went wrong! Please try again.` });
            return;
        }
    };

    return (
        <SearchBar
            query={query}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleClear={handleClear}
            submitStatus={submitStatus}
            searchTerm={searchTerm}
        ></SearchBar>
    );
};

export default Search;
