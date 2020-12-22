import React, { useState, useEffect } from "react";

import AdminComic from "../components/AdminComic";
import ComicForm from "../components/ComicForm";

import { getAllAdminComics } from "../helpers/GrubbyAPI";

import Lottie from "react-lottie";
import craneMachineData from "../lotties/crane-machine.json";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import LabelIcon from "@material-ui/icons/Label";
import Typography from "@material-ui/core/Typography";

const CDN = process.env.REACT_APP_CDN;

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: craneMachineData,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
    },
};

const useStyles = makeStyles((theme) => ({
    lottie: {
        display: "flex",
        justifyContent: "center",
        width: "800px",
        maxWidth: "100vw",
        margin: "3vw",
    },
    root: {
        width: "100%",
        maxWidth: 360,
    },
    title: {
        fontFamily: "comicfont",
        textAlign: "center",
        margin: "1vh",
    },
    container: {
        display: "flex",
        flexDirection: "column",
        marginBottom: "4vh",
    },
    display: {
        display: "flex",
        flexDirection: "row",
    },
    comic: {
        width: "100%",
    },
    list: {
        overflowY: "scroll",
        height: "calc(135vh - 64px)",
        width: "50%",
        maxWidth: 360,
    },
}));

const AdminPortal = () => {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(true);
    const [comics, setComics] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedComic, setSelectedComic] = useState("");
    const [comicInfo, setComicInfo] = useState({ name: "", description: "", id: null });

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
        setSelectedComic(`${CDN}/960/${comics[index].name}`);
        setComicInfo((comicInfo) => {
            return {
                ...comicInfo,
                name: comics[index].name,
                description: comics[index].description,
                id: comics[index].comic_id,
            };
        });
    };

    useEffect(() => {
        async function getComics() {
            try {
                let result = await getAllAdminComics();
                let { comics } = result;
                setComics(comics);
                if (comics.length > 0) {
                    setSelectedComic(`${CDN}/960/${comics[0].name}`);
                    setComicInfo((comicInfo) => {
                        return { ...comicInfo, name: comics[0].name, description: comics[0].description, id: 1 };
                    });
                }

                setTimeout(() => {
                    setIsLoading(false);
                }, 800);
            } catch (error) {
                console.error(error);
                return;
            }
        }

        getComics();
    }, []);

    return (
        <>
            {isLoading && (
                <div
                    style={{
                        width: "100vw",
                        display: "flex",
                        justifyContent: "center",
                        minHeight: "90vh",
                        alignItems: "center",
                    }}
                >
                    <div className={classes.lottie}>
                        <Lottie options={defaultOptions} />
                    </div>
                </div>
            )}

            {!isLoading && comics.length === 0 && (
                <div>
                    <Typography variant="h4" className={classes.title}>
                        No comics found!
                    </Typography>
                </div>
            )}

            {!isLoading && comics.length > 0 && (
                <div className={classes.container}>
                    <div>
                        <Typography variant="h4" className={classes.title}>
                            Admin Portal
                        </Typography>
                    </div>
                    <div className={classes.display}>
                        <div className={classes.list}>
                            <List component="nav" aria-label="Grubby Comics List">
                                {comics.map((comic, i) => (
                                    <div key={comic.comic_id}>
                                        <ListItem
                                            className={classes.root}
                                            button
                                            selected={selectedIndex === i}
                                            onClick={(event) => handleListItemClick(event, i)}
                                        >
                                            <ListItemIcon>
                                                <LabelIcon />
                                            </ListItemIcon>
                                            {/* <ListItemText primary={comic.name} /> */}
                                            <ListItemText primary={"Grubby #" + comic.comic_id} />
                                        </ListItem>
                                        <Divider className={classes.root} />
                                    </div>
                                ))}
                            </List>
                        </div>
                        <div className={classes.comic}>
                            <AdminComic src={selectedComic}></AdminComic>
                            <ComicForm
                                name={comicInfo.name}
                                description={comicInfo.description}
                                id={comicInfo.id}
                                setComics={setComics}
                                comics={comics}
                            ></ComicForm>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AdminPortal;
