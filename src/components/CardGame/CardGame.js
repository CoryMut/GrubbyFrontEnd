import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../UserContext";
import { getUserInfo } from "./api/CardGameAPI";

import JustGrubby from "./JustGrubby";
import Trivia from "./Trivia";
import Rules from "./Rules";
import Leaderboards from "./Leaderboards";
import Settings from "./Settings";
import { useLocalStorage } from "../../helpers/useLocalStorage";
import Stats from "./Stats";

const CardGame = () => {
    const { userId } = useContext(UserContext);

    const [showRules, setShowRules] = useState(false);
    const [startGame, setStartGame] = useState(false);
    const [reset, setReset] = useState(false);

    // const [settings, setSettings] = useState({ longerTimer: false, noTimer: false, longerTimerValue: 60 });
    const [settings, setSettings] = useLocalStorage("trivia-game-settings", {
        longerTimer: false,
        noTimer: false,
        longerTimerValue: 60,
    });

    const [appearOnLeaderboards, setAppearOnLeaderboards] = useLocalStorage("appear-on-leaderboards", {
        userChose: null,
    });

    const [userInfo, setUserInfo] = useState({ coins: 0, wins: 0 });
    const [newPlayer, setNewPlayer] = useState(true);

    useEffect(() => {
        async function getCoinsAndWins() {
            try {
                const result = await getUserInfo(userId);
                let { newPlayer, info } = result;
                if (appearOnLeaderboards.userChose === false) {
                    setNewPlayer(false);
                    return;
                } else {
                    setNewPlayer(newPlayer);
                    setUserInfo(info);
                }
            } catch (error) {
                console.log(error);
            }
        }
        if (userId) {
            getCoinsAndWins();
        }
    }, [userId, appearOnLeaderboards]);

    return (
        <div style={{ minHeight: "859px !important", minWidth: "1388px" }}>
            {!startGame && !showRules && (
                <div>
                    <Settings
                        settings={settings}
                        setSettings={setSettings}
                        appearOnLeaderboards={appearOnLeaderboards}
                        setAppearOnLeaderboards={setAppearOnLeaderboards}
                    />
                    <Stats name={userInfo.name} wins={userInfo.wins} coins={userInfo.coins} />
                </div>
            )}

            {!showRules && (
                <div style={{ position: "absolute", top: 0, transform: "rotate(27deg)" }}>
                    <JustGrubby
                        startGame={startGame}
                        setStartGame={setStartGame}
                        reset={reset}
                        setReset={setReset}
                        setShowRules={setShowRules}
                        newPlayer={newPlayer}
                        setNewPlayer={setNewPlayer}
                        setUserInfo={setUserInfo}
                        appearOnLeaderboards={appearOnLeaderboards}
                        setAppearOnLeaderboards={setAppearOnLeaderboards}
                    />
                </div>
            )}
            {!startGame && !showRules && (
                <div style={{ position: "absolute", top: "65%", left: "6%" }}>
                    <Leaderboards name={userInfo.name} />
                </div>
            )}
            {showRules && <Rules setRules={setShowRules} />}
            {/* {startGame && <PlaceMat setStartGame={setStartGame} setReset={setReset} />} */}
            {startGame && (
                <Trivia
                    setStartGame={setStartGame}
                    setReset={setReset}
                    settings={settings}
                    userInfo={userInfo}
                    setUserInfo={setUserInfo}
                    appearOnLeaderboards={appearOnLeaderboards}
                />
            )}
        </div>
    );
};

export default CardGame;
