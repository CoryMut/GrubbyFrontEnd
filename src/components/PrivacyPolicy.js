import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

const useStyles = makeStyles((theme) => ({
    title: {
        fontFamily: "comicfont",
        textAlign: "center",
        margin: "2vh 0",
    },
    container: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        marginBottom: "4vh",
        // textAlign: "center",
    },
    heading: {
        margin: "2vh 0",
    },
    body: {
        margin: "0 4vw",
    },
    body2: {
        margin: "0 6vw",
    },
    subheading: {
        margin: "1vh 2vw",
    },
    subheading2: {
        margin: "1vh 4vw",
    },
    bullet: {
        fontSize: "10px",
    },
    bulletPoint: {
        display: "flex",
        flexDirection: "row",
        margin: "3px",
    },
    spacing: {
        marginLeft: "10px",
    },
}));

const PrivacyPolicy = () => {
    const classes = useStyles();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Container maxWidth="md" className={classes.container}>
            <div>
                <Typography variant="h4" component="h1" className={classes.title}>
                    Privacy Policy
                </Typography>
            </div>

            <Typography variant="h5" className={classes.heading}>
                Data Collection/Policy
            </Typography>

            <Typography variant="h6" className={classes.subheading}>
                When Creating An Internal Account
            </Typography>

            <Typography variant="body1" component="div" className={classes.body}>
                <div className={classes.bulletPoint}>
                    <div>
                        <FiberManualRecordIcon className={classes.bullet} />
                    </div>
                    <Typography className={classes.spacing}>
                        user is asked for a username, password, and email address.
                    </Typography>
                </div>
                <div className={classes.bulletPoint}>
                    <div>
                        <FiberManualRecordIcon className={classes.bullet} />
                    </div>
                    <Typography className={classes.spacing}>
                        this information <b>is stored</b> for the purpose of the user being able to access their account
                        and subsequent services provided by this site
                    </Typography>
                </div>
                <div className={classes.bulletPoint}>
                    <div>
                        <FiberManualRecordIcon className={classes.bullet} />
                    </div>
                    <Typography className={classes.spacing}>
                        this information will <b>never be shared, sold, or used for any other purpose</b> than for users
                        to access their account or services provided on this site
                    </Typography>
                </div>
            </Typography>
            <Typography variant="h6" className={classes.subheading}>
                When Creating An Acount Using An External Provider
            </Typography>

            <Typography variant="h6" className={classes.subheading2}>
                Using Login with Google
            </Typography>

            <Typography variant="body1" component="div" className={classes.body2}>
                <div className={classes.bulletPoint}>
                    <div>
                        <FiberManualRecordIcon className={classes.bullet} />
                    </div>
                    <Typography className={classes.spacing}>
                        user is asked for access to{" "}
                        <b>
                            view the email address associated with your google account, your google id, and your
                            publicly available information from your google profile
                        </b>
                        .
                    </Typography>
                </div>
                <div className={classes.bulletPoint}>
                    <div>
                        <FiberManualRecordIcon className={classes.bullet} />
                    </div>
                    <Typography className={classes.spacing}>
                        when granted access to this information, we{" "}
                        <b>store the user's email address, name, and google openid</b>
                    </Typography>
                </div>
                <div className={classes.bulletPoint}>
                    <div>
                        <FiberManualRecordIcon className={classes.bullet} />
                    </div>
                    <Typography className={classes.spacing}>
                        this information <b>is stored</b> for the purpose of the user being able to access their account
                        and subsequent services provided by this site
                    </Typography>
                </div>
                <div className={classes.bulletPoint}>
                    <div>
                        <FiberManualRecordIcon className={classes.bullet} />
                    </div>
                    <Typography className={classes.spacing}>
                        this information will <b>never be shared, sold, or used for any other purpose</b> than for users
                        to access their account or services provided on this site
                    </Typography>
                </div>
                <div className={classes.bulletPoint}>
                    <div>
                        <FiberManualRecordIcon className={classes.bullet} />
                    </div>
                    <Typography className={classes.spacing}>
                        we are <b>not granted access to change any of your information</b>.
                    </Typography>
                </div>
                <div className={classes.bulletPoint}>
                    <div>
                        <FiberManualRecordIcon className={classes.bullet} />
                    </div>
                    <Typography className={classes.spacing}>
                        we are <b>not granted access to and do not request any information not listed in this policy</b>
                        .
                    </Typography>
                </div>
            </Typography>
            <Typography variant="h6" className={classes.subheading}>
                General Use of Site and Cookies
            </Typography>

            <Typography variant="body1" component="div" className={classes.body}>
                <div className={classes.bulletPoint}>
                    <div>
                        <FiberManualRecordIcon className={classes.bullet} />
                    </div>
                    <Typography className={classes.spacing}>
                        we <b>do not use any cookies unrelated to user authentication</b>.
                    </Typography>
                </div>
                <div className={classes.bulletPoint}>
                    <div>
                        <FiberManualRecordIcon className={classes.bullet} />
                    </div>
                    <Typography className={classes.spacing}>
                        we <b>do not collect any information not disclosed in this policy</b>.
                    </Typography>
                </div>
                <div className={classes.bulletPoint}>
                    <div>
                        <FiberManualRecordIcon className={classes.bullet} />
                    </div>
                    <Typography className={classes.spacing}>
                        we <b>do not track you</b> or request access to any information not disclosed in this policy.
                    </Typography>
                </div>
            </Typography>
        </Container>
    );
};

export default PrivacyPolicy;
