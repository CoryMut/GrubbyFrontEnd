import React, { useState, useEffect } from "react";

import AdminComic from "../components/AdminComic";
import ComicForm from "../components/ComicForm";

import { getAllAdminComics, deleteComic } from "../helpers/GrubbyAPI";

import Lottie from "lottie-react";
import craneMachineData from "../lotties/crane-machine.json";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import NativeSelect from "@material-ui/core/NativeSelect";
import FormControl from "@material-ui/core/FormControl";

import CustomSnackBar from "../components/CustomSnackBar";

const CDN = process.env.REACT_APP_CDN;

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexDirection: "column",
        marginBottom: "4vh",
    },
    title: {
        fontFamily: "comicfont",
        textAlign: "center",
        margin: "1vh",
    },
    lottie: {
        display: "flex",
        justifyContent: "center",
        width: "800px",
        maxWidth: "100vw",
        margin: "3vw",
    },
    lottieWrapper: {
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        minHeight: "90vh",
        alignItems: "center",
    },
    display: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        maxWidth: "100vw",
    },
    comic: {
        margin: "5vh 1vw",
    },
    select: {
        margin: "3vh auto 0vh auto",
        padding: "0px 8px",
        fontSize: "25px",
    },
}));

const AdminPortal = () => {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(true);
    const [comics, setComics] = useState([]);
    const [selectedComic, setSelectedComic] = useState("");
    const [comicInfo, setComicInfo] = useState({ name: "", description: "", id: null });
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [deletedComic, setDeletedComic] = useState(false);

    const handleChange = (event) => {
        let val = event.target.value;
        const idx = val - 1;
        setSelectedComic(`${CDN}/800/${comics[idx].name}`);
        setComicInfo((comicInfo) => {
            return {
                ...comicInfo,
                name: comics[idx].name,
                description: comics[idx].description,
                id: comics[idx].comic_id,
            };
        });
    };

    const handleDelete = async (id) => {
        try {
            await deleteComic(id);
            if (id === 0) {
                comics.shift();
            } else if (id === comics.length) {
                comics.pop();
            } else {
                comics.splice(id - 1, 1);
            }
            setComics(() => [...comics]);
            setComicInfo((comicInfo) => ({
                ...comicInfo,
                name: comics[id - 2].name,
                description: comics[id - 2].description,
                id: comics[id - 2].comic_id,
            }));
            setSelectedComic(`${CDN}/800/${comics[id - 2].name}`);
            setDeletedComic(true);
        } catch (error) {
            console.error(`API Error: `, error);
            return;
        }
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setSuccess(false);
        setError(false);
        setDeletedComic(false);
    };

    useEffect(() => {
        async function getComics() {
            try {
                let result = await getAllAdminComics();
                let { comics } = result;
                setComics(comics);
                if (comics.length > 0) {
                    setSelectedComic(`${CDN}/800/${comics[0].name}`);
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
        <div>
            {isLoading && (
                <div className={classes.lottieWrapper}>
                    <div className={classes.lottie}>
                        <Lottie animationData={craneMachineData} />
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
                    <FormControl size="small">
                        <NativeSelect
                            value={comicInfo.id}
                            onChange={handleChange}
                            name="comic"
                            className={classes.select}
                            inputProps={{ "aria-label": "comic" }}
                            variant="outlined"
                        >
                            {comics.map((comic) => (
                                <option value={comic.comic_id} key={comic.comic_id}>
                                    Grubby #{comic.comic_id}
                                </option>
                            ))}
                        </NativeSelect>
                    </FormControl>
                    <div className={classes.display}>
                        <div className={classes.comic}>
                            <AdminComic src={selectedComic}></AdminComic>
                            <ComicForm
                                name={comicInfo.name}
                                description={comicInfo.description}
                                id={comicInfo.id}
                                setComics={setComics}
                                comics={comics}
                                setComicInfo={setComicInfo}
                                setSelectedComic={setSelectedComic}
                                handleDelete={handleDelete}
                                setError={setError}
                                setSuccess={setSuccess}
                            ></ComicForm>
                        </div>
                    </div>
                </div>
            )}
            <CustomSnackBar
                open={success}
                autoHideDuration={6000}
                onClose={handleClose}
                severity="success"
                emoji="🎉"
                emojiLabel="Popping confetti"
                message="Comic updated successfully!"
                encloseMessage={true}
            ></CustomSnackBar>
            <CustomSnackBar
                open={error}
                autoHideDuration={6000}
                onClose={handleClose}
                severity="error"
                emoji="😅"
                emojiLabel="Smiling Face with sweat"
                message="Uh oh, something went wrong. Try again?"
                encloseMessage={false}
            ></CustomSnackBar>
            <CustomSnackBar
                open={deletedComic}
                autoHideDuration={6000}
                onClose={handleClose}
                severity="success"
                emoji="🎉"
                emojiLabel="Popping confetti"
                message="Deleted comic successfully"
                encloseMessage={true}
            ></CustomSnackBar>
        </div>
    );
};

export default AdminPortal;
