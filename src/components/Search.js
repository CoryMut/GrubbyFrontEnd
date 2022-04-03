import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import SearchBar from "../components/SearchBar";

const Search = ({ setDisplayComics, setAlert, query, setQuery, setReset, setGet, setCurrentCount }) => {
    const navigate = useNavigate();
    const [previous, setPrevious] = useState("");
    const [searchTerm, setSearchTerm] = useState(query ? query : "");
    const [submitStatus, setSubmitStatus] = useState(false);

    const handleChange = (event) => {
        if (event.target.value === "") {
            setAlert("");
            setPrevious("");
            setReset(true);
            // navigate.replace({
            //     pathname: "/all",
            //     search: `?page=1`,
            // });
            navigate({
                pathname: "/all",
                // search: `?page=1`,
            });
        }

        setSearchTerm(event.target.value);
        if (previous !== searchTerm) {
            setSubmitStatus(false);
        }
    };

    const handleClear = () => {
        // navigate.replace({
        //     pathname: "/all",
        //     search: `?page=1`,
        // });
        navigate({
            pathname: "/all",
            // search: `?page=1`,
        });
        setSearchTerm("");
        setAlert("");
        setPrevious("");
        setReset(true);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (previous === searchTerm) {
            return;
        }
        setSubmitStatus(true);
        setAlert("");
        // navigate.replace({
        //     pathname: "/all",
        //     search: `?q=${searchTerm}`,
        // });
        navigate({
            pathname: "/all",
            search: `?q=${searchTerm}`,
        });
        setDisplayComics([]);
        setQuery(() => searchTerm);
        setPrevious(() => searchTerm);
        setCurrentCount(() => 0);
    };

    return (
        <SearchBar
            query={query}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleClear={handleClear}
            submitStatus={submitStatus}
            searchTerm={searchTerm}
        />
    );
};

export default Search;
