import React from "react";
import axios from "axios";
import { useState } from "react";
import { useFormik } from "formik";
import { useHistory, Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
// import { Alert } from "@material-ui/lab";

import CharacterCard from "../components/CharacterCard";
import Thumbnail from "../components/Thumbnail";
import TransitionsModal from "../components/Modal";

import "react-circular-progressbar/dist/styles.css";

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

// component that returns the form and handles the data using formik

const characters = ["Grubby", "Richard", "Cory"];

const UploadForm = ({ comic = INITIAL_VALUES }) => {
    const history = useHistory();
    const classes = useStyles();

    const [error, setError] = useState("");
    const [fileName, setFileName] = useState("");
    const [charInComic, setCharInComic] = useState([]);
    const [charNotInComic, setCharNotInComic] = useState(characters);
    const [progress, setProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [alert, setAlert] = useState("");

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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
                setIsUploading(true);
                if (charInComic.length === 0) {
                    console.log("failure");
                    setError("Requires at least 1 character");
                    return;
                }
                console.log(values);

                let data = {
                    name: fileName,
                    description: values.description,
                    characters: charInComic,
                };

                const formData = new FormData();
                formData.append("file", values.file);
                formData.append("data", JSON.stringify(data));
                // await axios.post("http://localhost:5000/comic/upload", formData);

                console.log(data);

                // const ws = new WebSocket(`ws://localhost:5000/comic/status`);
                // const ws = new WebSocket(`ws://localhost:2000`);
                const ws = new WebSocket(`ws://localhost:80`);
                // await waitForOpenConnection(ws);
                // ws.onopen = async function (evt) {
                //     console.log("open", evt);

                //     let data = { message: "Send me a progress report, please!" };
                //     // ws.send(JSON.stringify(data));
                //     await sendMessage(ws, JSON.stringify({ message: "Send me a progress report, please!" }));
                // };

                ws.onmessage = async function (evt) {
                    console.log("message", evt);
                    serverProgress = await JSON.parse(evt.data).progress;
                    console.log("SERVER PROGRESS", serverProgress);
                    // setProgress(serverProgress);
                    setProgress((progress) => serverProgress, console.log(progress));
                    console.log("progerss", progress);
                };

                // debugger;
                console.log("AFTER WEBSOCKET");
                // await sendMessage(ws, JSON.stringify({ message: "Send me a progress report, please!" }));
                // ws.send(JSON.stringify({ message: "Send me a progress report, please!" }));

                // await axios.post("http://localhost:5000/comic/upload", formData, {
                //     onUploadProgress: function (event) {
                //         let percentCompleted = Math.round((event.loaded * 100) / event.total);
                //         setProgress(percentCompleted);
                //     },
                // });

                await axios.post("http://localhost:5000/comic/upload", formData, { withCredentials: true });
                // let count = 0;

                // while (count < 4 && progress < 100) {
                //     console.log("in while");
                //     await sendMessage(ws, JSON.stringify({ message: "Send me a progress report, please!" }));
                //     count++;
                // }

                // ws.onmessage = function (evt) {
                //     console.log("message", evt);
                //     serverProgress = JSON.parse(evt.data).progress;
                //     console.log(serverProgress);
                //     setProgress(serverProgress);
                //     console.log("progerss", progress);
                // };

                // while (progress < 100) {
                // await sendMessage(ws, JSON.stringify({ message: "Send me a progress report, please!" }));
                // }
                console.log("progress, progress", progress);

                if (serverProgress === 100) {
                    setIsUploading(false);
                    console.log("upload submitted");
                    setError("");
                    setAlert("Woohoo! The upload was successful! Redirecting to homepage...");
                    ws.close();
                }

                if (serverProgress < 100) {
                    console.log("i CRY");
                }

                // setTimeout(function () {
                //     history.push("/");
                // }, 3000);
            } catch (error) {
                console.error(error);
            }
        },
    });

    return (
        <Container maxWidth="md" className={classes.container}>
            <div className={classes.title}>
                <h2 className={classes.text}>Upload Comic</h2>
                <small>How exciting!</small>
            </div>
            {/* {alert && <Alert severity="success">{alert}</Alert>} */}
            <TransitionsModal progress={progress} handleClose={handleClose} alert={alert}></TransitionsModal>
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
                                setFileName(event.currentTarget.files[0].name);
                            }}
                            onBlur={formik.handleBlur}
                            disabled={isUploading ? true : false}
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
                            disabled={isUploading ? true : false}
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
                    <Button type="submit" disabled={isUploading ? true : false}>
                        Upload
                    </Button>
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
