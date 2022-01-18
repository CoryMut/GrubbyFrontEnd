import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { debounce } from "lodash";
import { Button, IconButton } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

import RecordVoiceOverIcon from "@material-ui/icons/RecordVoiceOver";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import WhatshotIcon from "@material-ui/icons/Whatshot";

import CountdownTimer from "./CountdownTimer";
import questions from "./questions.json";
import Bet from "./Bet";
import ReduceNumber from "./ReduceNumber";
import IncreaseNumber from "./IncreaseNumber";

import "./css/Trivia.css";
import { updateLeaderboardData } from "./api/CardGameAPI";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    boardWrapper: {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "comicfont",
    },
    questionWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "8rem",
        position: "relative",
        width: "100%",
    },
    answerBlock: {
        border: "5px solid #645579",
        // height: "75px",
        minHeight: "75px",
        height: "fit-content",
        // width: "300px",
        width: "fit-content",
        maxWidth: "300px",
        minWidth: "300px",
        borderRadius: "30px",
        margin: "1rem",
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        textAlign: "center",
        display: "table",
        fontSize: "16px",
        "&:hover": {
            backgroundColor: "#645579",
            color: "white",
            cursor: "pointer",
        },
    },
    blockWrapper: {
        display: "flex",
        flexDirection: "row",
    },
    questionBlock: {
        border: "5px solid #645579",
        height: "100px",
        width: "500px",
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        textAlign: "center",
        display: "table",
        fontSize: "22px",
    },
    blockText: {
        display: "table-cell",
        verticalAlign: "middle",
    },
    halfQuestionBlockLeft: {
        border: "5px solid #645579",
        borderRight: "none",
        height: "100px",
        width: "250px",
    },
    halfQuestionBlockRight: {
        border: "5px solid #645579",
        borderLeft: "none",
        height: "100px",
        width: "250px",
    },
    loser: {
        transform: "rotate(-30deg)",
    },
    slideLoserLeft: {
        animation: "slide-out-left 0.5s forwards",
    },
    slideLoserRight: {
        animation: "slide-out-right 0.5s forwards",
    },
    // loserStarburst: {
    //     animationDelay: "60s",
    //     animation: "60s fadeIn",
    // },
    cancelButton: {
        fontFamily: "comicfont",
        borderColor: "#645579",
        color: "black",
        float: "right",
        margin: "15px 15px 0 0",
        position: "absolute",
        right: 0,
    },
    leftSpeech: {
        position: "absolute",
        top: 30,
        left: -40,
    },
    rightSpeech: {
        position: "absolute",
        top: 30,
        right: -40,
    },
    quessed: {
        backgroundColor: "#645579",
        color: "white !important",
        cursor: "pointer",
    },
    hostGrubby: {
        position: "absolute",
        top: 175,
        left: 600,
    },
    speechBubble: {
        animation: "fadein 3s",
        width: "325px",
        position: "absolute",
        top: -300,
        left: 430,
        zIndex: 1000,
        visiblity: "hidden",
        // transform: "scaleX(-1)",
    },
    speechBubbleText: {
        animation: "fadein 3s",
        width: "200px",
        position: "absolute",
        top: -255,
        left: 505,
        zIndex: 1001,
        fontSize: "16px",
        lineHeight: "23px",
        visiblity: "hidden",
    },
    nextButton: {
        fontFamily: "comicfont",
        backgroundColor: "#645579",
        color: "white",
        "&:hover": {
            color: "black",
        },
    },
    stats: {
        display: "flex",
        float: "right",
        margin: "15px",
        position: "absolute",
        right: 200,
    },
}));

function preloadImage(url) {
    const img = new Image();
    img.src = url;
}

function speak(sentence) {
    const utterance = new SpeechSynthesisUtterance(sentence);
    window.speechSynthesis.speak(utterance);
}

const defaultSpringInfo = { wins: { start: 0, increase: 0 }, coins: { start: 0, increase: 0 } };

const SplitBoard = ({ handleCancel }) => {
    const classes = useStyles();
    return (
        <div className={classes.boardWrapper}>
            <div className={classes.questionWrapper}>
                <div className={`${classes.halfQuestionBlockLeft} ${classes.slideLoserLeft}`}></div>
                <div className={`${classes.halfQuestionBlockRight} ${classes.slideLoserRight}`}></div>
            </div>
            <div style={{ position: "absolute", top: "30%" }}>
                <img
                    src="https://grubbythegrape.sfo2.cdn.digitaloceanspaces.com/assets/assets/LoserStarburst.png"
                    alt="Loser Starburst"
                    height={500}
                    className={classes.loserStarburst}
                />
            </div>
            <div className={classes.blockWrapper}>
                <div className={`${classes.answerBlock} ${classes.slideLoserLeft}`}></div>
                <div className={`${classes.answerBlock} ${classes.slideLoserRight}`}></div>
            </div>
            <div className={classes.blockWrapper}>
                <div className={`${classes.answerBlock} ${classes.slideLoserLeft}`}></div>
                <div className={`${classes.answerBlock} ${classes.slideLoserRight}`}></div>
            </div>
            <Button style={{ position: "absolute", top: "90%" }} className={classes.nextButton} onClick={handleCancel}>
                Play Again
            </Button>
        </div>
    );
};

const AnswerBlock = ({ text, handleSpeak, orientation, checkAnswer, value, quessed, correct }) => {
    const classes = useStyles();

    return (
        <div className="d-flex flex-row align-items-center" style={{ position: "relative" }}>
            <div className={orientation === "left" ? classes.leftSpeech : classes.rightSpeech}>
                <IconButton aria-label="Speak" onClick={() => handleSpeak(text)}>
                    <RecordVoiceOverIcon />
                </IconButton>
            </div>
            <Button
                className={quessed === value ? `${classes.quessed} ${classes.answerBlock}` : classes.answerBlock}
                onClick={() => checkAnswer(value)}
                disabled={typeof quessed === "boolean" ? false : true}
            >
                <p className={classes.blockText}>{text}</p>
            </Button>
        </div>
    );
};

const QuestionBlock = ({ text, handleSpeak }) => {
    const classes = useStyles();

    return (
        <div className="d-flex flex-row align-items-center" style={{ position: "relative" }}>
            <div style={{ position: "absolute", top: 30, left: -90 }}>
                <IconButton aria-label="Speak" onClick={() => handleSpeak(text)}>
                    <RecordVoiceOverIcon />
                </IconButton>
            </div>
            <div className={classes.questionBlock}>
                <p className={classes.blockText}>{text}</p>
            </div>
        </div>
    );
};

const Trivia = ({ setReset, setStartGame, settings, userInfo, setUserInfo }) => {
    const classes = useStyles();
    const [loser, setLoser] = useState(false);

    const [allQuestions, setAllQuestions] = useState([]);

    const [question, setQuestion] = useState("");
    const [content, setContent] = useState([]);
    const [correct, setCorrect] = useState();

    const [quessed, setQuessed] = useState(false);

    const [resetCounter, setResetCounter] = useState(false);

    const [bet, setBet] = useState(null);
    // const [coins, setCoins] = useState(100);

    const [updateUserInfo, setUpdateUserInfo] = useState(false);
    const [springInfo, setSpringInfo] = useState({ ...defaultSpringInfo });

    // const updateLocalInfo = () => {
    //     setLocalInfo(() => ({...userInfo}))
    // }

    const handleBet = (value) => {
        console.log("HANDLE BET");
        setBet(value);
    };

    const handleSpeak = (text) => {
        speak(text);
    };

    const debounceSpeak = debounce(handleSpeak, 450);

    const handleCancel = () => {
        setStartGame(false);

        setReset(true);
    };

    const checkAnswer = (value) => {
        setQuessed(value);

        if (String(value) !== String(correct)) {
            setLoser(true);
        }
    };

    const selectQuestion = (data = []) => {
        if (data.length === 0) {
            return;
        }
        let max = data.length;
        let idx = Math.floor(Math.random() * max);
        // let { question, content, correct } = data[idx];
        let { question, content, correct } = data[idx];
        setQuestion(question);
        setContent(content);
        setCorrect(correct);
    };

    const nextQuestion = () => {
        setBet(null);
        setSpringInfo(() => ({ ...defaultSpringInfo }));
        setQuessed(false);
        selectQuestion(allQuestions);
        setResetCounter(true);
    };

    useEffect(() => {
        async function getQandA() {
            try {
                // const result = await getGameData()
                setAllQuestions(questions.games[0].questions);
            } catch (error) {
                console.log(error);
            }
        }
        getQandA();
    }, []);

    useEffect(() => {
        preloadImage("https://grubbythegrape.sfo2.cdn.digitaloceanspaces.com/assets/assets/LoserStarburst.png");
    }, []);

    useEffect(() => {
        if (allQuestions.length > 0) {
            selectQuestion(allQuestions);
        }
    }, [allQuestions]);

    useEffect(() => {
        async function updateInfo() {
            try {
                await updateLeaderboardData(userInfo);
                setUpdateUserInfo(false);
            } catch (error) {
                console.log(error);
            }
        }

        if (updateUserInfo) {
            updateInfo();
        }
    }, [userInfo, updateUserInfo]);

    useEffect(() => {
        if (String(quessed) === String(correct)) {
            setUserInfo((userInfo) => {
                setSpringInfo(() => {
                    return {
                        wins: { start: userInfo.wins, increase: 1 },
                        coins: { start: userInfo.coins, increase: bet },
                    };
                });
                return { ...userInfo, wins: Number(userInfo.wins) + 1, coins: Number(userInfo.coins) + Number(bet) };
            });
            setUpdateUserInfo(true);
        } else if (loser || (quessed && String(quessed) !== String(correct))) {
            setUserInfo((userInfo) => {
                setSpringInfo(() => {
                    return {
                        wins: { start: userInfo.wins, increase: 0 },
                        coins: { start: userInfo.coins, increase: -bet },
                    };
                });
                return { ...userInfo, coins: Number(userInfo.coins) - Number(bet) };
            });
            setUpdateUserInfo(true);
        }
    }, [quessed, correct, setUserInfo, bet, loser]);

    let statComponent;

    if (String(quessed) === String(correct)) {
        statComponent = (
            <span>
                <IncreaseNumber count={springInfo.coins.start} increase={springInfo.coins.increase} />
                <div className="correct-answer">
                    <ReduceNumber count={bet} sign="+" />
                </div>
            </span>
        );
    } else if (loser || (quessed && String(quessed) !== String(correct))) {
        statComponent = (
            <span>
                <IncreaseNumber count={springInfo.coins.start} increase={springInfo.coins.increase} />
                <ReduceNumber count={bet} sign="-" />
            </span>
        );
    } else {
        statComponent = <span>{userInfo.coins}</span>;
    }

    return (
        // <div className={loser ? `${classes.boardWrapper} ${classes.loser}` : classes.boardWrapper}>
        <div>
            <div className={classes.stats}>
                <div className="mr-5 mt-2">
                    <WhatshotIcon /> Wins:{" "}
                    {quessed === correct ? (
                        <IncreaseNumber count={springInfo.wins.start} increase={springInfo.wins.increase} />
                    ) : (
                        <span>{userInfo.wins}</span>
                    )}
                    {quessed === correct && (
                        <div>
                            <ReduceNumber count={1} sign="+" />
                        </div>
                    )}
                </div>
                <div className="mt-2">
                    <LocalAtmIcon className="mr-1" />
                    <span className="mr-2">GrubbyCoins:</span>
                    {statComponent}
                    {/* {quessed === correct ? (
                        <IncreaseNumber count={springInfo.coins.start} increase={springInfo.coins.increase} />
                    ) : (
                        <span>{userInfo.coins}</span>
                    )} */}

                    {/* {String(quessed) === String(correct) && (
                        <div className="correct-answer">
                            <ReduceNumber count={bet} sign="+" />
                        </div>
                    )}
                    {quessed && String(quessed) !== String(correct) && (
                        <div id="incorrect-answer">
                            <ReduceNumber count={bet} sign="-" />
                        </div>
                    )} */}
                </div>
            </div>

            <Button className={classes.cancelButton} onClick={handleCancel} variant="outlined">
                End Game
            </Button>
            {bet === null && <Bet coins={userInfo.coins} handleBet={handleBet} />}
            {!loser && bet !== null && (
                <div className={classes.boardWrapper}>
                    <div className={classes.questionWrapper}>
                        <QuestionBlock text={question} handleSpeak={debounceSpeak} />
                        {!settings.noTimer && (
                            <CountdownTimer
                                startTime={settings.longerTimer ? settings.longerTimerValue : 10}
                                setLoser={setLoser}
                                style={{ position: "absolute", top: -80, right: "20%" }}
                                paused={quessed !== false && quessed >= 0 ? true : false}
                                reset={resetCounter}
                                setReset={setResetCounter}
                            />
                        )}
                    </div>

                    <div className={classes.blockWrapper}>
                        <AnswerBlock
                            text={content[0]}
                            handleSpeak={debounceSpeak}
                            orientation="left"
                            checkAnswer={checkAnswer}
                            value={0}
                            quessed={quessed}
                            correct={correct}
                        />
                        <AnswerBlock
                            text={content[1]}
                            handleSpeak={debounceSpeak}
                            orientation="right"
                            checkAnswer={checkAnswer}
                            value={1}
                            quessed={quessed}
                            correct={correct}
                        />
                    </div>
                    <div className={classes.blockWrapper}>
                        <AnswerBlock
                            text={content[2]}
                            handleSpeak={debounceSpeak}
                            orientation="left"
                            checkAnswer={checkAnswer}
                            value={2}
                            quessed={quessed}
                            correct={correct}
                        />
                        <AnswerBlock
                            text={content[3]}
                            handleSpeak={debounceSpeak}
                            orientation="right"
                            checkAnswer={checkAnswer}
                            value={3}
                            quessed={quessed}
                            correct={correct}
                        />
                    </div>
                    {quessed === correct && (
                        <div>
                            <div style={{ position: "relative" }}>
                                <p className={classes.speechBubbleText}>
                                    Ouch, that's gonna hurt my wallet. <br />
                                    (Good job, though!)
                                    <Button className={`${classes.nextButton} mt-2`} onClick={nextQuestion}>
                                        Let's do it again!
                                    </Button>
                                </p>
                                <img
                                    className={classes.speechBubble}
                                    src="https://grubbythegrape.sfo2.cdn.digitaloceanspaces.com/assets/assets/speech_bubble.png"
                                    alt="Grubby's speech bubble"
                                />
                                <img
                                    className={`${classes.hostGrubby} slide-up`}
                                    src="https://grubbythegrape.sfo2.cdn.digitaloceanspaces.com/assets/assets/colored_grubby.png"
                                    alt="Host Grubby"
                                />
                            </div>
                            <Snackbar open={correct}>
                                <Alert severity="success">
                                    You earned {bet} <LocalAtmIcon /> GrubbyCoins
                                </Alert>
                            </Snackbar>
                        </div>
                    )}
                </div>
            )}
            {loser && <SplitBoard handleCancel={handleCancel} />}
        </div>
    );
};

export default Trivia;
