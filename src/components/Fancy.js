import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import Carousel from "react-material-ui-carousel";

import ScrollArrow from "../components/ScrollArrow";
import HomePage from "../components/HomePage";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CachedIcon from "@material-ui/icons/Cached";

import { getDadJoke } from "../helpers/DadJokeAPI";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import useMediaQuery from "@material-ui/core/useMediaQuery";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
//    "https://grubbythegrape.sfo2.cdn.digitaloceanspaces.com/assets/assets/color_comic.jpg",
const images = [
    "https://grubbythegrape.sfo2.cdn.digitaloceanspaces.com/960/Grubby_71.jpg",
    "https://grubbythegrape.sfo2.cdn.digitaloceanspaces.com/960/Grubby_177.jpg",
    "https://grubbythegrape.sfo2.cdn.digitaloceanspaces.com/960/Grubby_146.jpg",
];

const useStyles = makeStyles((theme) => ({
    jumbotron: {
        // height: "99vh",
        minHeight: "calc(99vh - 64px)",
        height: "100%",
        // backgroundColor: "lightgray",
        backgroundColor: "#f7d2fe",
        // backgroundImage: "url(https://grubbythegrape.sfo2.cdn.digitaloceanspaces.com/assets/assets/purple.png)",
        // backgroundImage:
        //     "url(https://images.unsplash.com/photo-1463667894739-c3fdf75bca6d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80)",
        // backgroundRepeat: "repeat",
        backgroundSize: "cover",
    },
    section1: {
        backgroundImage: "url(https://grubbythegrape.sfo2.cdn.digitaloceanspaces.com/assets/assets/red.png)",
        backgroundRepeat: "repeat",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        minHeight: "calc(99vh - 64px)",
        height: "100%",
    },
    // section2: {
    //     backgroundImage: "url(https://grubbythegrape.sfo2.cdn.digitaloceanspaces.com/assets/assets/light_pink.jpg)",
    //     backgroundRepeat: "repeat",
    //     backgroundAttachment: "fixed",
    //     height: "calc(99vh - 64px)",
    // },
    // section3: {
    //     backgroundImage: "url(https://grubbythegrape.sfo2.cdn.digitaloceanspaces.com/assets/assets/black.png)",
    //     backgroundRepeat: "repeat",
    //     backgroundAttachment: "fixed",
    //     height: "calc(99vh - 64px)",
    // },
    // section4: {
    //     backgroundImage: "url(https://grubbythegrape.sfo2.cdn.digitaloceanspaces.com/assets/assets/pink.png)",
    //     backgroundRepeat: "repeat",
    //     backgroundAttachment: "fixed",
    //     height: "calc(99vh - 64px)",
    // },
    scrollTop: {
        fontSize: "20px",
    },
    h1: {
        fontSize: "32px",
        color: "black",
    },
    colorImg: {
        width: "600px",
        borderRadius: "10px",
        boxShadow: " rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
        maxWidth: "100vw",
        [theme.breakpoints.down("md")]: {
            margin: "3rem 0",
        },
        [theme.breakpoints.down("sm")]: {
            maxWidth: "80vw",
            margin: "3rem 0",
        },
    },
    main: {
        height: "25vh",
        backgroundColor: "white",
        borderRadius: "10px",
        padding: "2vw",
        maxWidth: "100vw",
    },
    speechBubbleImg: {
        maxWidth: "100vw",
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
    starburst: {
        maxWidth: "200px",
        position: "absolute",
        top: "70%",
        left: "50%",
        cursor: "pointer",
        [theme.breakpoints.down("sm")]: {
            width: "140px",
        },
    },
    comicfont: {
        fontFamily: "comicfont",
        color: "black",
        marginTop: "1vh",
        [theme.breakpoints.down("sm")]: {
            fontSize: "50px",
        },
    },
    comicFontSmall: {
        fontFamily: "comicfont",
        color: "black",
        marginTop: "1vh",
        fontSize: "40px",
    },
    speechIcon: {
        position: "absolute",
        // top: "150%",
        top: "46.5%",
        left: "49.5%",
        cursor: "pointer",
        [theme.breakpoints.down("sm")]: {
            fontSize: "18px",
        },
    },
    speechBubbleContainer: {
        // border: "2px solid green",
        position: "absolute",
        top: "4%", //2
        left: "31%", //29
        height: "230px", //250
        width: "390px", //410
        // borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: "black",
        [theme.breakpoints.down("md")]: {
            top: "8%",
            color: "black",
            maxWidth: "70vw",
        },
        [theme.breakpoints.down("sm")]: {
            top: "14%",
            left: "34%",
            color: "black",
            width: "60%",
            height: "30%",
        },
    },
}));

const Fancy = () => {
    const matches = useMediaQuery("(max-width:320px)");

    const classes = useStyles();
    const [dadJoke, setDadJoke] = useState("");
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
        setError(false);
    };

    const handleJoke = async () => {
        try {
            let joke = await getDadJoke();
            setDadJoke(joke);
        } catch (error) {
            setError(true);
        }
    };

    useEffect(() => {
        images.forEach((image) => (new Image().src = image));
    }, []);

    return (
        <>
            <div style={{ padding: "4px" }} name="top">
                <div style={{ border: "6px solid black", borderRadius: "6px" }}>
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
                                        {dadJoke ? (
                                            dadJoke
                                        ) : (
                                            <>
                                                Hi! I'm Grubby and this is my website, thanks for checking it out! You
                                                can find my newest adventure every Monday and Wednesday, except during
                                                2020. <br />
                                                <br />
                                                2020 can go to hell.{" "}
                                                <span style={{ marginLeft: "9px" }}>Wear a mask.</span>
                                            </>
                                        )}
                                    </Typography>
                                </div>

                                <div>
                                    <CachedIcon className={classes.speechIcon} onClick={handleJoke}></CachedIcon>
                                </div>
                                <img
                                    className={classes.speechBubbleImg}
                                    src="https://grubbythegrape.sfo2.cdn.digitaloceanspaces.com/assets/assets/grubby_crop.png"
                                    alt="Grubby with a speech bubble"
                                ></img>
                                <Link
                                    activeClass="active"
                                    to="latest_comic"
                                    spy={true}
                                    smooth={true}
                                    offset={-70}
                                    duration={500}
                                >
                                    <img
                                        className={classes.starburst}
                                        src="https://grubbythegrape.sfo2.cdn.digitaloceanspaces.com/assets/assets/starburst_caption_smaller.png"
                                        alt="Comic Starburst"
                                    ></img>
                                </Link>
                            </div>
                        </Grid>
                        <Grid item>
                            <Carousel
                                autoPlay={true}
                                interval={11000}
                                animation="slide"
                                // timeout={1000}
                                timeout={{ appear: 300, enter: 300, exit: 300 }}
                                navButtonsAlwaysInvisible={true}
                                style={{ minHeight: "600px" }}
                            >
                                {images.map((image, i) => (
                                    <img
                                        key={i}
                                        className={classes.colorImg}
                                        src={image}
                                        alt="Demo Grubby comic in carousel"
                                    ></img>
                                ))}
                            </Carousel>
                        </Grid>
                    </Grid>
                </div>
            </div>
            <div className={classes.section1} name="section1">
                <Grid container direction="column" justify="space-evenly" alignItems="center">
                    <Typography variant="h1" className={matches ? classes.comicFontSmall : classes.comicfont}>
                        LATEST GRUBBY
                    </Typography>
                    <span name="latest_comic">
                        <HomePage></HomePage>
                    </span>
                </Grid>
            </div>
            {/* <div className={classes.section2}>
                <Grid container direction="row" justify="space-evenly" alignItems="center">
                    <h1>Section 2</h1>
                </Grid>
            </div>
            <div className={classes.section3}>
                <Grid container direction="row" justify="space-evenly" alignItems="center">
                    <h1>Section 3</h1>
                </Grid>
            </div>
            <div className={classes.section4}>
                <Grid container direction="row" justify="space-evenly" alignItems="center">
                    <h1>Section 4</h1>
                </Grid>
            </div> */}
            <ScrollArrow></ScrollArrow>
            <Snackbar open={error} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    Uh oh, something went wrong. Try again?
                    <span role="img" aria-label="Smiling Face with sweat">
                        😅
                    </span>
                </Alert>
            </Snackbar>
        </>
    );
};

export default Fancy;