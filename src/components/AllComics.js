import React, { useEffect, useState, useCallback, useRef } from "react";
import { getAllComics, searchComics } from "../helpers/GrubbyAPI";
import { useLocation } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";
// import Pagination from "@material-ui/lab/Pagination";
import Button from "@material-ui/core/Button";

import ComicCard from "../components/ComicCard";
import Search from "../components/Search";

import { SRLWrapper } from "simple-react-lightbox";
import options from "../helpers/SRLWrapperOptions";

import Lottie from "lottie-react";
import allComicsLoading from "../lotties/all-comics-loading.json";

import "./AllComics.css";

const useStyles = makeStyles((theme) => ({
    "@global": {
        body: {
            backgroundColor: "#FFFFFF",
            // backgroundColor: "#645579",
        },
    },
    root: {
        display: "flex",
        marginTop: "2vh",
        flexDirection: "column",
        minHeight: "110vh",
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
    lottie: {
        display: "flex",
        justifyContent: "center",
        width: "75px",
        background: "transparent",
        margin: "2vh 0 4vh 0",
    },
    lottieWrapper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
}));

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const AllComics = () => {
    const classes = useStyles();
    // const history = useNavigate();
    const q = useQuery();

    let hardCount = useRef(undefined);

    const [alert, setAlert] = useState("");
    const [allComics, setAllComics] = useState([]);
    const [displayComics, setDisplayComics] = useState([]);
    const [page, setPage] = useState(Number(q.get("page")) || 1);
    const [maxPageCount, setMaxPageCount] = useState(undefined);
    const [query, setQuery] = useState(q.get("q") || null);
    const [currentCount, setCurrentCount] = useState(0);
    const [sort, setSort] = useState(false);

    const [loading, setLoading] = useState(false);
    const [sorting] = useState(false);

    const [reset, setReset] = useState(false);

    const toggleSort = () => {
        setSort((sort) => !sort);
        setPage(1);
        setAllComics([]);
        setDisplayComics([]);
        setMaxPageCount(undefined);
    };

    useEffect(() => {
        async function getComics() {
            try {
                setLoading(true);
                let result;

                if (query) {
                    result = await searchComics(query, page, sort);
                } else {
                    result = await getAllComics(page, sort);
                }

                let { comics, count, resultCount } = result;

                setAllComics((allComics) => [...allComics, ...comics]);
                setDisplayComics((displayComics) => [...displayComics, ...comics]);

                // setMaxPageCount(count);
                hardCount.current = count;
                setCurrentCount(resultCount);
                let loadingTimer = setTimeout(() => {
                    setLoading(false);
                }, [3000]);

                return () => clearTimeout(loadingTimer);
            } catch (error) {
                setAlert({
                    type: "error",
                    message: `Uh oh, something went wrong fetching the comic data. Please try refreshing the page.`,
                });

                return;
            }
        }
        if (reset === false) {
            if (hardCount.current === undefined || page <= hardCount.current) {
                getComics();
            }
        }
    }, [page, sort, maxPageCount, query, reset]);

    useEffect(() => {
        hardCount.current = undefined;
    }, [maxPageCount]);

    useEffect(() => {
        if (reset) {
            setQuery(null);

            setPage(1);

            setDisplayComics([]);

            hardCount.current = undefined;
            setReset(false);
        }
    }, [reset]);

    const loader = useRef(null);

    const handleObserver = useCallback((entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
            setPage((prev) => prev + 1);
        }
    }, []);

    useEffect(() => {
        const option = {
            root: null,
            rootMargin: "20px",
            threshold: 0,
        };
        const observer = new IntersectionObserver(handleObserver, option);
        let currLoader = loader.current;
        if (loader && currLoader) observer.observe(currLoader);

        return () => observer.unobserve(currLoader);
    }, [handleObserver]);

    return (
        <div style={{ marginBottom: "5vh" }}>
            <div className={classes.root}>
                <Container maxWidth="lg">
                    <Search
                        query={query}
                        setQuery={setQuery}
                        setDisplayComics={setDisplayComics}
                        setAlert={setAlert}
                        setReset={setReset}
                    ></Search>
                    <div style={{ display: "flex" }}>
                        <Button onClick={toggleSort} style={{ marginTop: "5px" }}>
                            {sort === false ? "Sorted: Oldest First" : "Sorted: Newest First"}
                        </Button>
                        <div style={{ alignSelf: "center", marginLeft: "20px" }}>{currentCount} result(s)</div>
                    </div>

                    {alert && (
                        <Alert className={classes.alert} severity={alert.type}>
                            {alert.message}
                        </Alert>
                    )}

                    {!sorting && (
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
                    )}
                    {sorting && (
                        <div className={classes.lottieWrapper}>
                            <div className={classes.lottie}>
                                <Lottie animationData={allComicsLoading} />
                            </div>
                        </div>
                    )}
                </Container>
            </div>
            {loading && (
                <div className={classes.lottieWrapper}>
                    <div className={classes.lottie}>
                        <Lottie animationData={allComicsLoading} />
                    </div>
                </div>
            )}
            <div ref={loader}></div>
        </div>
    );
};

export default AllComics;
