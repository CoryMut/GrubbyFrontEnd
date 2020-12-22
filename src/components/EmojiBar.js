// import React from "react";
// import { makeStyles } from "@material-ui/core/styles";

// const useStyles = makeStyles((theme) => ({
//     emoji: {
//         display: "flex",
//         justifyContent: "center",
//     },
// }));

// const EmojiBar = () => {
//     const classes = useStyles();
//     return (
//         <div className={classes.emoji}>
//             <span role="img" aria-label="face with tears of joy">
//                 😂
//             </span>
//         </div>
//     );
// };

// export default EmojiBar;

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import TagFacesIcon from "@material-ui/icons/TagFaces";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        listStyle: "none",
        padding: theme.spacing(0.5),
        margin: 0,
        backgroundColor: "transparent",
        boxShadow: "none",
    },
    chip: {
        margin: theme.spacing(0.5),
    },
}));

function EmojiBar() {
    const classes = useStyles();
    const [chipData, setChipData] = React.useState([
        { key: 0, label: "Laughing", icon: "😂" },
        { key: 1, label: "Clapping", icon: "👏" },
        { key: 2, label: "ROFL", icon: "🤣" },
        { key: 3, label: "Grinning", icon: "😄" },
        { key: 4, label: "Clown", icon: "🤡" },
    ]);

    return (
        <Paper component="ul" className={classes.root}>
            {chipData.map((data) => {
                return (
                    <li key={data.key}>
                        <Chip
                            avatar={
                                <span
                                    role="img"
                                    style={{ fontSize: "1rem", backgroundColor: "transparent" }}
                                    aria-labelledby={data.label}
                                >
                                    {data.icon}
                                </span>
                            }
                            label={data.label}
                            className={classes.chip}
                            clickable={true}
                            color="primary"
                        />
                    </li>
                );
            })}
        </Paper>
    );
}

export default EmojiBar;
