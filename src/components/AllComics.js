import React, { useEffect, useState } from "react";
import { getAllComics, searchComics } from "../helpers/GrubbyAPI";
import { useHistory, useLocation } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";
import Pagination from "@material-ui/lab/Pagination";

import ComicCard from "../components/ComicCard";
import Search from "../components/Search";

import { SRLWrapper } from "simple-react-lightbox";
import options from "../helpers/SRLWrapperOptions";

import "./AllComics.css";

const useStyles = makeStyles((theme) => ({
    "@global": {
        body: {
            backgroundColor: "#645579",
        },
    },
    root: {
        display: "flex",
        marginTop: "2vh",
        flexDirection: "column",
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    alert: {
        marginTop: "2vh",
    },
    pagination: {
        display: "flex",
        justifyContent: "center",
        marginTop: "10vh",
        marginBottom: "5vh",
    },
}));

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const AllComics = () => {
    const classes = useStyles();
    const history = useHistory();
    const q = useQuery();
    const [alert, setAlert] = useState("");
    const [allComics, setAllComics] = useState([]);
    const [displayComics, setDisplayComics] = useState([]);
    const [page, setPage] = useState(Number(q.get("page")) || 1);
    const [count, setCount] = useState(10);
    const [query, setQuery] = useState(q.get("q") || null);

    const handleChange = (event) => {
        if (event.target.tagName === "BUTTON") {
            if (event.target.tagName.children) {
                if (event.target.children[0].children[0].getAttribute("d").includes("M10")) {
                    setPage((page) => +page + 1);
                    history.replace({
                        pathname: "/all",
                        search: query ? `?page=${+page + 1}&q=${query}` : `?page=${+page + 1}`,
                    });
                } else if (event.target.children[0].children[0].getAttribute("d").includes("M15")) {
                    setPage((page) => +page - 1);
                    history.replace({
                        pathname: "/all",
                        search: `?page=${+page - 1}`,
                    });
                }
            } else {
                history.replace({
                    pathname: "/all",
                    search: query ? `?page=${event.target.innerText}&q=${query}` : `?page=${event.target.innerText}`,
                });
                setPage(Number(event.target.innerText));
            }
        } else if (event.target.tagName === "svg") {
            if (event.target.children[0].getAttribute("d").includes("M10")) {
                setPage((page) => +page + 1);
                history.replace({
                    pathname: "/all",
                    search: `?page=${+page + 1}`,
                });
            } else if (event.target.children[0].getAttribute("d").includes("M15")) {
                setPage((page) => +page - 1);
                history.replace({
                    pathname: "/all",
                    search: `?page=${+page - 1}`,
                });
            }
        } else if (event.target.tagName === "path") {
            if (event.target.getAttribute("d").includes("M10")) {
                setPage((page) => +page + 1);
                history.replace({
                    pathname: "/all",
                    search: `?page=${+page + 1}`,
                });
            } else if (event.target.getAttribute("d").includes("M15")) {
                setPage((page) => +page - 1);
                history.replace({
                    pathname: "/all",
                    search: `?page=${page - 1}`,
                });
            }
        }
    };

    useEffect(() => {
        async function getComics() {
            try {
                let result;
                if (query) {
                    result = await searchComics(query, page);
                } else {
                    result = await getAllComics(page);
                }
                let { comics, count } = result;
                setAllComics(comics);
                setDisplayComics(comics);
                setCount(count);
                window.scrollTo(0, 0);
            } catch (error) {
                setAlert({
                    type: "error",
                    message: `Uh oh, something went wrong fetching the comic data. Please try refreshing the page.`,
                });

                return;
            }
        }
        getComics();
    }, [page, query]);

    return (
        <div>
            <div className={classes.root}>
                <Container maxWidth="lg">
                    <Search
                        query={query}
                        page={page}
                        setPage={setPage}
                        setQuery={setQuery}
                        setDisplayComics={setDisplayComics}
                        setAlert={setAlert}
                        allComics={allComics}
                        setCount={setCount}
                    ></Search>
                    {alert && (
                        <Alert className={classes.alert} severity={alert.type}>
                            {alert.message}
                        </Alert>
                    )}

                    <SRLWrapper options={options}>
                        <Grid container spacing={3}>
                            {displayComics.map((comic) => (
                                <Grid item xs={12} lg={3} md={4} sm={6} key={comic.comic_id}>
                                    <ComicCard
                                        description={comic.description}
                                        name={comic.name}
                                        comicID={comic.comic_id}
                                        canFavorite={true}
                                        favorite={false}
                                    ></ComicCard>
                                </Grid>
                            ))}
                        </Grid>
                    </SRLWrapper>
                </Container>
            </div>
            <div className={classes.pagination}>
                <Pagination
                    count={count}
                    variant="outlined"
                    shape="rounded"
                    size="large"
                    page={Number(page)}
                    onChange={handleChange}
                />
            </div>
        </div>
    );
};

export default AllComics;
