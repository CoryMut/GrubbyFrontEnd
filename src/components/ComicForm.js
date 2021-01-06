import React, { useState } from "react";
import { useFormik } from "formik";

import { updateComic, deleteAll } from "../helpers/GrubbyAPI";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    "@global": {
        body: {
            backgroundImage: "none",
        },
    },
    root: {
        width: "100%",
        maxWidth: "100vw",
        display: "flex",
        justifyContent: "center",
    },

    form: {
        width: "75%",
    },
    inputField: {
        marginTop: "2rem",
    },

    link: {
        textDecoration: "none",
    },

    error: {
        color: "red",
    },

    buttons: {
        marginTop: "1rem",
    },

    button: {
        marginRight: "1rem",
    },
}));

const validate = (values) => {
    const errors = {};

    if (!values.description) {
        errors.description = "Required";
    }

    if (!values.name) {
        errors.file = "Required";
    }

    return errors;
};

const ComicForm = ({ name, description, id, setComics, comics }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
        setError(false);
    };

    const handleDelete = async () => {
        await deleteAll(id);
        return;
    };

    const formik = useFormik({
        initialValues: {
            name: name,
            description: description,
        },
        validate,
        enableReinitialize: true,
        onSubmit: async (values) => {
            try {
                if (description === values.description) {
                    return;
                }
                await updateComic(id, values);
                const copy = [...comics];
                copy[id - 1] = { comic_id: id, name: values.name, description: values.description };
                setComics([...copy]);
                setOpen(true);
                return;
            } catch (error) {
                setError(true);
                return;
            }
        },
    });

    return (
        <div className={classes.root}>
            <form className={classes.form} onSubmit={formik.handleSubmit}>
                <div className={classes.inputField}>
                    <InputLabel htmlFor="name">Name</InputLabel>
                    <TextField
                        id="name"
                        name="name"
                        placeholder="Name of comic"
                        margin="normal"
                        fullWidth
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <FormHelperText htmlFor="name">
                        {formik.touched.name && formik.errors.name ? (
                            <span className={classes.error}>{formik.errors.name}</span>
                        ) : (
                            "Name of comic."
                        )}
                    </FormHelperText>
                </div>
                <div className={classes.inputField}>
                    <InputLabel htmlFor="description">Description</InputLabel>
                    <TextField
                        id="description"
                        name="description"
                        placeholder="Description of comic"
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

                <div className={classes.buttons}>
                    <Button className={classes.button} type="submit" variant="contained" color="primary">
                        Update Comic
                    </Button>
                    <Button className={classes.button} variant="contained" color="secondary" onClick={handleDelete}>
                        Delete Comic
                    </Button>
                </div>
            </form>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    <span role="img" aria-label="Popping confetti">
                        🎉
                    </span>
                    Comic updated successfully!
                    <span role="img" aria-label="Popping confetti">
                        🎉
                    </span>
                </Alert>
            </Snackbar>
            <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    Uh oh, something went wrong. Try again?{" "}
                    <span role="img" aria-label="Smiling Face with sweat">
                        😅
                    </span>
                </Alert>
            </Snackbar>
        </div>
    );
};

export default ComicForm;
