import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
    search: {
        backgroundColor: "white",
        border: "1px solid black",
        borderRadius: "25px",
        textAlign: "center",
    },
    inputInput: {
        padding: theme.spacing(2, 1, 2, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create("width"),
        width: "100%",
    },
    searchIcon: {
        color: "#b19cd9",
    },
}));

// { handleChange, handleSubmit, searchTerm, submitStatus, handleClear, disabled }

const SearchBar = ({ handleChange, handleClear, handleSubmit, submitStatus, searchTerm, query }) => {
    const classes = useStyles();

    return (
        <div className={classes.search}>
            <form onSubmit={handleSubmit}>
                <InputBase
                    value={searchTerm}
                    onChange={handleChange}
                    placeholder="Search by keyword or character!"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    fullWidth
                    inputProps={{
                        "aria-label": "search",
                    }}
                    endAdornment={
                        <InputAdornment position="start">
                            {/* <IconButton onClick={submitStatus ? handleClear : handleSubmit}> */}
                            <IconButton onClick={query ? handleClear : handleSubmit}>
                                {query ? (
                                    <CloseIcon className={classes.searchIcon} />
                                ) : (
                                    <SearchIcon className={classes.searchIcon} />
                                )}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </form>
        </div>
    );
};

export default SearchBar;
