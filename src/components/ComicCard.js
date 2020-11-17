import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
// import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const CDN = process.env.REACT_APP_CDN;

const useStyles = makeStyles({
    root: {
        marginTop: "1vh",
        height: "100%",
    },
    image: {
        maxHeight: "384px",
        width: "100%",
    },
});

const ComicCard = ({ description, name, comicID }) => {
    const classes = useStyles();
    const sizes = ["320", "384", "512", "683", "800", "960"];
    const srcSet = [];
    sizes.map((size) => srcSet.push(`${CDN}/${size}/${name} ${size}w`));

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <img className={classes.image} srcSet={srcSet} alt={description}></img>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Grubby #{comicID}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            {/* <CardActions>
                <Button size="small" color="primary">
                    Share
                </Button>
                <Button size="small" color="primary">
                    Learn More
                </Button>
            </CardActions> */}
        </Card>
    );
};

export default ComicCard;
