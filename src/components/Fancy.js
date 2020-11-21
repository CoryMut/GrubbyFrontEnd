import React from "react";
import { Link } from "react-scroll";
import Carousel from "react-material-ui-carousel";

import ScrollArrow from "../components/ScrollArrow";
import HomePage from "../components/HomePage";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const images = [
    "https://grubbythegrape.sfo2.cdn.digitaloceanspaces.com/assets/assets/color_comic.jpg",
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
    speech: {
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
}));
const Fancy = () => {
    const classes = useStyles();

    return (
        <>
            <div style={{ padding: "8px" }} name="top">
                <div style={{ border: "8px solid black", borderRadius: "10px" }}>
                    <Grid
                        className={classes.jumbotron}
                        container
                        direction="row"
                        justify="space-evenly"
                        alignItems="center"
                    >
                        <Grid item>
                            {/* <div className={classes.main}> */}
                            {/* <h1 className={classes.h1}>Welcome to all things Grubby the Grape!</h1> */}
                            <div style={{ position: "relative" }}>
                                <Typography className={classes.text} variant="caption">
                                    Hi! I'm Grubby and this is my website, thanks for checking it out! You can find my
                                    newest adventure every Monday and Wednesday, except during 2020. <br />
                                    <br />
                                    2020 can go to hell. <span style={{ marginLeft: "9px" }}>Wear a mask.</span>
                                </Typography>
                                <img
                                    className={classes.speech}
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
                            {/* </div> */}
                        </Grid>
                        <Grid item>
                            <Carousel autoPlay={true} interval={7000} animation="slide">
                                {images.map((image, i) => (
                                    <img
                                        key={i}
                                        className={classes.colorImg}
                                        src={image}
                                        alt="Demo Grubby comic in carousel"
                                    ></img>
                                ))}
                            </Carousel>
                            {/* <img
                                className={classes.colorImg}
                                src="https://grubbythegrape.sfo2.cdn.digitaloceanspaces.com/assets/assets/color_comic.jpg"
                                alt="One of kind Grubby comic that is colored!"
                            /> */}
                        </Grid>
                    </Grid>
                </div>
            </div>
            <div className={classes.section1} name="section1">
                <Grid container direction="column" justify="space-evenly" alignItems="center">
                    <Typography variant="h1" className={classes.comicfont}>
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
        </>
    );
};

export default Fancy;
