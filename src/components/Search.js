import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import SearchBar from "../components/SearchBar";
import { searchComics, getAllComics } from "../helpers/GrubbyAPI";

const Search = ({ setDisplayComics, setAlert, query, setQuery, setReset }) => {
    const history = useHistory();
    const [previous, setPrevious] = useState("");
    const [searchTerm, setSearchTerm] = useState(query ? query : "");
    const [submitStatus, setSubmitStatus] = useState(false);

    const handleChange = (event) => {
        if (event.target.value === "") {
            setAlert("");
            setPrevious("");
            setReset(true);
            history.replace({
                pathname: "/all",
                search: `?page=1`,
            });
        }

        setSearchTerm(event.target.value);
        if (previous !== searchTerm) {
            setSubmitStatus(false);
        }
    };

    const handleClear = () => {
        history.replace({
            pathname: "/all",
            search: `?page=1`,
        });
        setSearchTerm("");
        setAlert("");

        setReset(true);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (previous === searchTerm) {
            return;
        }

        setSubmitStatus(true);
        setAlert("");
        history.replace({
            pathname: "/all",
            search: `?q=${searchTerm}`,
        });
        setDisplayComics([]);
        setQuery(searchTerm);
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
