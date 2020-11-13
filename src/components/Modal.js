import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { CircularProgressbar } from "react-circular-progressbar";
import { Alert } from "@material-ui/lab";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "2vw",
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        borderRadius: "5px",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    progress: {
        maxWidth: "50vw",
        width: "50%",
    },
    flex: {
        display: "flex",
        justifyContent: "center",
        margin: "1vh",
    },
}));

const TransitionsModal = ({ progress, handleClose, alert }) => {
    const classes = useStyles();
    let timeToOpen = progress ? true : false;
    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={timeToOpen}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={timeToOpen}>
                    <div className={classes.paper}>
                        {alert && <Alert severity="success">{alert}</Alert>}
                        {!alert && (
                            <>
                                <h2 id="transition-modal-title">Uploading Comic...</h2>
                                <p id="transition-modal-description">react-transition-group animates me.</p>
                            </>
                        )}
                        <div className={classes.flex}>
                            <div className={classes.progress}>
                                <CircularProgressbar value={progress} text={`${progress}%`} />
                            </div>
                        </div>
                        {alert && <Button>Close</Button>}
                    </div>
                </Fade>
            </Modal>
        </div>
    );
};

export default TransitionsModal;
