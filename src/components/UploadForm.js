import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { getCharacters } from "../helpers/GrubbyAPI";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";

import CharacterCard from "../components/CharacterCard";
import Thumbnail from "../components/Thumbnail";
import TransitionsModal from "../components/Modal";

import "react-circular-progressbar/dist/styles.css";

const BASE_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5000";

const useStyles = makeStyles((theme) => ({
    "@global": {
        body: {
            backgroundImage: "none",
        },
    },
    root: {
        display: "flex",
        flexWrap: "wrap",
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: "25ch",
    },
    form: {
        marginTop: "2rem",
    },
    inputField: {
        marginTop: "2rem",
    },
    textarea: {
        width: "100%",
    },
    text: {
        marginTop: "2rem",
    },
    label: {
        marginBottom: "1rem",
    },
    link: {
        textDecoration: "none",
    },
    bodyHelper: {
        marginBottom: "2rem",
    },
    error: {
        color: "red",
    },
    container: {
        marginBottom: "2rem",
    },
    title: {
        textAlign: "center",
    },
    characters: {
        border: "2px solid gray",
        borderRadius: "10px",
        padding: "20px",
    },
    buttons: {
        marginTop: "1rem",
    },
    progress: {
        maxWidth: "10vw",
        width: "50%",
    },
    flex: {
        display: "flex",
        justifyContent: "center",
        marginTop: "1vh",
    },
}));

const validate = (values) => {
    const errors = {};

    if (!values.description) {
        errors.description = "Required";
    }

    if (!values.file) {
        errors.file = "Required";
    }

    return errors;
};

const INITIAL_VALUES = {
    file: "",
    description: "",
};

const UploadForm = ({ comic = INITIAL_VALUES }) => {
    const classes = useStyles();

    const [error, setError] = useState("");
    const [fileName, setFileName] = useState("");
    const [characters, setCharacters] = useState([]);
    const [charInComic, setCharInComic] = useState([]);
    const [charNotInComic, setCharNotInComic] = useState([]);
    const [progress, setProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [alert, setAlert] = useState("");
    const [alertType, setAlertType] = useState("success");

    const handleClose = () => {
        setProgress(0);
    };

    const handleCharacter = (name) => {
        if (charInComic.includes(name)) {
            setCharInComic((state) => state.filter((comic) => comic !== name));
            setCharNotInComic((state) => [...state, name]);
        } else {
            setCharInComic((state) => [...state, name]);
            setCharNotInComic((state) => state.filter((comic) => comic !== name));
        }
    };

    useEffect(() => {
        async function getAllCharacters() {
            let result = await getCharacters();
            console.log(result);
            setCharacters(result.characters);
            setCharNotInComic(result.characters);
        }

        getAllCharacters();
    }, []);

    const formik = useFormik({
        initialValues: {
            file: comic.file,
            description: comic.description,
        },
        validate,
        enableReinitialize: true,
        onSubmit: async (values) => {
            try {
                let serverProgress = 0;
                let serverMessage = "";
                let serverAlertType = "";
                if (charInComic.length === 0) {
                    setError("Requires at least 1 character");
                    return;
                }

                setIsUploading(true);

                let data = {
                    name: fileName,
                    description: values.description,
                    characters: charInComic,
                };

                const formData = new FormData();
                formData.append("file", values.file);
                formData.append("data", JSON.stringify(data));

                const ws = new WebSocket(`ws://localhost:80`);

                ws.onmessage = async function (evt) {
                    let info = await JSON.parse(evt.data);
                    serverProgress = info.progress;
                    serverMessage = info.message;
                    serverAlertType = info.type;

                    setProgress(serverProgress);
                    setAlert(serverMessage);
                    setAlertType(serverAlertType);
                    if (serverProgress === 100) {
                        setIsUploading(false);
                        setError("");
                        setAlert("Woohoo! The upload was successful! Click the button to return home.");
                        ws.close();
                    }
                };

                await axios.post(`${BASE_URL}/comic/upload`, formData, { withCredentials: true });
            } catch (error) {
                console.error(error);
                setAlert("Something went wrong. Please try again.");
                return;
            }
        },
    });

    return (
        <Container maxWidth="md" className={classes.container}>
            <div className={classes.title}>
                <h2 className={classes.text}>Upload Comic</h2>
                <small>How exciting!</small>
            </div>
            <TransitionsModal
                progress={progress}
                handleClose={handleClose}
                alert={alert}
                isUploading={isUploading}
                alertType={alertType}
            ></TransitionsModal>
            <form className={classes.form} onSubmit={formik.handleSubmit}>
                <div>
                    <div className={classes.inputField}>
                        <InputLabel htmlFor="file">Upload File</InputLabel>
                        <TextField
                            id="file"
                            name="file"
                            type="file"
                            placeholder="Upload File"
                            margin="normal"
                            fullWidth
                            onChange={(event) => {
                                formik.setFieldValue("file", event.currentTarget.files[0]);
                                if (event.currentTarget.files[0]) {
                                    setFileName(event.currentTarget.files[0].name);
                                } else {
                                    setFileName("");
                                }
                            }}
                            onBlur={formik.handleBlur}
                        />
                        <FormHelperText htmlFor="file">
                            {formik.touched.file && formik.errors.file ? (
                                <span className={classes.error}>{formik.errors.file}</span>
                            ) : (
                                "Choose the new comic to be uploaded."
                            )}
                        </FormHelperText>
                    </div>
                    <Thumbnail file={formik.values.file} progress={progress}></Thumbnail>
                    <div className={classes.inputField}>
                        <InputLabel htmlFor="description">Characters</InputLabel>
                        <div id="characters" name="characters" margin="normal" className={classes.characters}>
                            {charInComic.map((character) => (
                                <CharacterCard
                                    key={character}
                                    name={character}
                                    handleCharacter={handleCharacter}
                                    characters={charInComic}
                                ></CharacterCard>
                            ))}
                        </div>
                        <FormHelperText htmlFor="characters">
                            {error ? (
                                <span className={classes.error}>{error}</span>
                            ) : (
                                "Add the characters who are in the comic by clicking on the character's name!"
                            )}
                        </FormHelperText>
                        {charNotInComic.map((character) => (
                            <CharacterCard
                                key={character}
                                name={character}
                                handleCharacter={handleCharacter}
                                characters={charInComic}
                            ></CharacterCard>
                        ))}
                    </div>
                    <div className={classes.inputField}>
                        <InputLabel htmlFor="description">Description</InputLabel>
                        <TextField
                            id="description"
                            name="description"
                            placeholder="Description of post"
                            margin="normal"
                            fullWidth
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <FormHelperText htmlFor="description">
                            {formik.touched.description && formik.errors.description ? (
                                <span className={classes.error}>{formik.errors.description}</span>
                            ) : (
                                "This helps provide the alt text for the image and helps with search."
                            )}
                        </FormHelperText>
                    </div>
                </div>

                <div className={classes.buttons}>
                    <Button type="submit">Upload</Button>
                    <Button>
                        <Link to="/" className={classes.link}>
                            Cancel
                        </Link>
                    </Button>
                </div>
            </form>
        </Container>
    );
};

export default UploadForm;
