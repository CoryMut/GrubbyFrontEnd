import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import PersonIcon from "@material-ui/icons/Person";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import WhatshotIcon from "@material-ui/icons/Whatshot";

import { getLeaderboardData } from "./api/CardGameAPI";

const useStyles = makeStyles({
    table: {
        width: "450px",
    },
});

const CoinLeaders = ({ data, name = "" }) => {
    const classes = useStyles();
    return (
        // <TableContainer component={Paper} className="mr-5 mt-2">
        <TableContainer component={Paper} className="mt-4">
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <PersonIcon className="mr-2" />
                            Name
                        </TableCell>
                        <TableCell align="right">
                            <LocalAtmIcon className="mr-2" />
                            GrubbyCoins
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => {
                        return (
                            <TableRow key={row.name}>
                                <TableCell
                                    component="th"
                                    scope="row"
                                    className={row.name === name ? "font-weight-bold" : ""}
                                >
                                    {row.name}
                                </TableCell>
                                <TableCell align="right" className={row.name === name ? "font-weight-bold" : ""}>
                                    {Number(row.coins).toLocaleString()}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

const WinLeaders = ({ data, name = "" }) => {
    const classes = useStyles();

    return (
        // <TableContainer component={Paper} className="ml-5 mt-2">
        <TableContainer component={Paper} className="mt-4">
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <PersonIcon className="mr-2" />
                            Name
                        </TableCell>
                        <TableCell align="right">
                            <WhatshotIcon className="mr-2" />
                            Wins
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell
                                component="th"
                                scope="row"
                                className={row.name === name ? "font-weight-bold" : ""}
                            >
                                {row.name}
                            </TableCell>
                            <TableCell align="right" className={row.name === name ? "font-weight-bold" : ""}>
                                {Number(row.wins).toLocaleString()}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

const Leaderboards = ({ name }) => {
    const classes = useStyles();

    const [coinsData, setCoinsData] = useState([]);
    const [winsData, setWinsData] = useState([]);

    const [value, setValue] = useState("coins");

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    useEffect(() => {
        async function getCoinAndWinData() {
            try {
                const result = await getLeaderboardData();
                let { coins, wins } = result.leaderboards;
                setCoinsData(coins);
                setWinsData(wins);
            } catch (error) {
                console.log(error);
            }
        }
        getCoinAndWinData();
    }, []);

    return (
        <div>
            Leaderboards
            <Select
                value={value}
                onChange={handleChange}
                displayEmpty
                className="float-right"
                inputProps={{ "aria-label": "Without label" }}
            >
                <MenuItem value={"coins"}>Most GrubbyCoins</MenuItem>
                <MenuItem value={"wins"}>Most Wins</MenuItem>
            </Select>
            {/* <div className="d-flex flex-row"> */}
            {value === "coins" && <CoinLeaders data={coinsData} name={name} />}
            {value === "wins" && <WinLeaders data={winsData} name={name} />}
            {/* </div> */}
        </div>
    );
};

export default Leaderboards;
