import React from "react";
import { useParams, Link, Redirect } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Button from "@material-ui/core/Button";

const VerifyUser = () => {
    const useStyles = makeStyles((theme) => ({
        jumbotron: {
            backgroundColor: "white",
            backgroundSize: "cover",
            padding: "10vh 0px",
            userSelect: "none",
        },
        speechBubbleImg: {
            maxWidth: "100vw",
            userSelect: "none",
            [theme.breakpoints.down("md")]: {
                margin: "3vh 0",
            },
            [theme.breakpoints.down("sm")]: {
                maxWidth: "95vw",
            },
        },
        text: {
            maxWidth: "300px",
            position: "absolute",
            top: "15%",
            left: "40%",
            fontFamily: "comicfont",
            [theme.breakpoints.down("md")]: {
                margin: "2vh 0",
            },
            [theme.breakpoints.down("xs")]: {
                fontSize: "9px",
                left: "42.5%",
                top: "13%",
                margin: "0 0",
                maxWidth: "175px",
            },
        },
        textTwo: {
            fontFamily: "comicfont",
            margin: "10px",
            [theme.breakpoints.down("xs")]: {
                fontSize: "9px",
            },
        },
        verySmallScreens: {
            fontFamily: "comicfont",
            fontSize: "7px",
        },
        comicfont: {
            fontFamily: "comicfont",
            color: "black",
            margin: "2vh 0 5vh 0",
            [theme.breakpoints.down("sm")]: {
                fontSize: "50px",
            },
        },
        comicFontSmall: {
            fontFamily: "comicfont",
            color: "black",
            margin: "2vh 0 5vh 0",
            fontSize: "40px",
        },
        speechIcon: {
            position: "absolute",
            top: "46.5%",
            left: "49.5%",
            cursor: "pointer",
            [theme.breakpoints.down("sm")]: {
                fontSize: "18px",
            },
        },
        speechBubbleContainer: {
            position: "absolute",
            top: "6%",
            left: "31%",
            height: "230px",
            width: "390px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            color: "black",
            userSelect: "none",
            [theme.breakpoints.down("md")]: {
                top: "10%",
                color: "black",
                maxWidth: "70vw",
            },
            [theme.breakpoints.down("sm")]: {
                top: "16%",
                left: "34%",
                color: "black",
                width: "60%",
                height: "30%",
            },
        },
        login: {
            color: "white",
            backgroundColor: "#645579",
            "&:hover": {
                backgroundColor: "#645579",
                color: "white",
            },
        },
    }));

    let { status } = useParams();
    const acceptStatus = ["fail", "success", "repeat"];
    const classes = useStyles();
    const matches = useMediaQuery("(max-width:320px)");

    if (acceptStatus.includes(status) === false) {
        return <Redirect to="/"></Redirect>;
    }

    return (
        <div style={{ padding: "4px" }} name="top">
            <div>
                <Grid
                    className={classes.jumbotron}
                    container
                    direction="row"
                    justify="space-evenly"
                    alignItems="center"
                >
                    <Grid item>
                        <div style={{ position: "relative" }}>
                            <div className={classes.speechBubbleContainer}>
                                <Typography
                                    className={matches ? classes.verySmallScreens : classes.textTwo}
                                    variant="caption"
                                >
                                    {status === "fail" && (
                                        <div>
                                            Oh no! We were unable to verify your email. Please request a new
                                            verification email.
                                            <br></br>
                                            <br></br>
                                            <Button className={classes.login} to="/resend-email" component={Link}>
                                                Resend Email
                                            </Button>
                                        </div>
                                    )}
                                    {status === "success" && (
                                        <div>
                                            <div>
                                                Hurray! Your email was successfully verified. Click below to login!
                                            </div>
                                            <br></br>
                                            <br></br>
                                            <Button className={classes.login} to="/login" component={Link}>
                                                Login
                                            </Button>
                                        </div>
                                    )}
                                    {status === "repeat" && (
                                        <div>
                                            <div>You were already verified! Click the link below to login.</div>
                                            <br></br>
                                            <br></br>
                                            <Button className={classes.login} to="/login" component={Link}>
                                                Login
                                            </Button>
                                        </div>
                                    )}
                                </Typography>
                            </div>
                            <img
                                className={classes.speechBubbleImg}
                                src="https://grubbythegrape.sfo2.cdn.digitaloceanspaces.com/assets/assets/grubby_crop.png"
                                alt="Grubby with a speech bubble"
                            ></img>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default VerifyUser;
