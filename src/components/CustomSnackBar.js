import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CustomSnackBar = ({ open, onClose, severity, autoHideDuration, emoji, emojiLabel, message }) => {
    return (
        <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={onClose}>
            <Alert onClose={onClose} severity={severity}>
                <span role="img" aria-label={emojiLabel}>
                    {emoji}
                </span>
                {message}
                <span role="img" aria-label={emojiLabel}>
                    {emoji}
                </span>
            </Alert>
        </Snackbar>
    );
};

export default CustomSnackBar;
