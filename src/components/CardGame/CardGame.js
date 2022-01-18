import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../UserContext";
import { getUserInfo, getQuestion } from "./api/CardGameAPI";

import PlaceMat from "./PlaceMat";
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

    const [userInfo, setUserInfo] = useState({});
    const [newPlayer, setNewPlayer] = useState(true);

    useEffect(() => {
        async function getCoinsAndWins() {
            try {
                const result = await getUserInfo(userId);
                let { newPlayer, info } = result;
                setNewPlayer(newPlayer);
                setUserInfo(info);
            } catch (error) {
                console.log(error);
            }
        }
        if (userId) {
            getCoinsAndWins();
        }
    }, [userId]);

    return (
        <div>
            {!startGame && !showRules && (
                <div>
                    <Settings settings={settings} setSettings={setSettings} />
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
                        setUserInfo={setUserInfo}
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
                />
            )}
        </div>
    );
};

export default CardGame;
