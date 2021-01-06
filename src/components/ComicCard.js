import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import FavoriteButton from "../components/FavoriteButton";

const CDN = process.env.REACT_APP_CDN;

const useStyles = makeStyles({
    root: {
        marginTop: "4vh",
        // height: "100%",
        minHeight: "370px",
        // minHeight: "480px",
    },
    image: {
        width: "100%",
    },
    name: {
        textAlign: "center",
        maxHeight: "129px",
    },
    area: {
        minHeight: "290px",
    },
});

const ComicCard = ({ description, name, comicID, isFavorite }) => {
    const classes = useStyles();
    const sizes = ["320", "384", "512", "683", "800", "960"];
    const srcSet = [];
    sizes.map((size) => srcSet.push(`${CDN}/${size}/${name} ${size}w`));

    return (
        <Card className={classes.root}>
            <CardActionArea className={classes.area}>
                <img className={classes.image} srcSet={srcSet} alt={description}></img>
            </CardActionArea>
            <CardContent className={classes.name}>
                <Typography gutterBottom variant="h5" component="h2">
                    Grubby #{comicID}
                </Typography>
                <FavoriteButton comicID={comicID} favorite={isFavorite} name={name} />
                {/* <Typography variant="body2" color="textSecondary" component="p">
                    {description}
                </Typography> */}
            </CardContent>
        </Card>
    );
};

export default ComicCard;
