import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import { Paper, Switch, FormControlLabel, Input, InputLabel } from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";

const useStyles = makeStyles((theme) => ({
    settings: {
        margin: "15px 15px 0px 0px",
        width: "400px",
        backgroundColor: "white",
    },
    button: {
        margin: theme.spacing(1),
    },
    paper: {
        width: "400px",
        backgroundColor: "white",
        padding: "10px",
    },
    customInputDiv: {
        "& input": {
            textAlign: "center",
        },
    },
}));

const MySwitch = withStyles({
    switchBase: {
        color: "#645570",
        "&$checked": {
            color: "#645579",
        },
        "&$checked + $track": {
            backgroundColor: "#645590",
        },
    },
    checked: {},
    track: {},
})(Switch);

const Settings = ({ settings, setSettings }) => {
    const classes = useStyles();
    const [show, setShow] = useState(false);

    const [longerTimer, setLongerTimer] = useState(false);
    const [noTimer, setNoTimer] = useState(false);

    // const [timerSetting, setTimerSetting] = useState({ longerTimer: false, noTimer: false });

    const handleClick = () => {
        setShow((show) => !show);
    };

    const handleChange = (event) => {
        setSettings((timerSetting) => {
            let name = event.target.name;
            let newSetting = { ...timerSetting };
            let otherName = name === "longerTimer" ? "noTimer" : "longerTimer";
            newSetting[event.target.name] = !newSetting[event.target.name];
            if (newSetting[otherName] === true) {
                newSetting[otherName] = false;
            }
            return newSetting;
        });
    };

    const handleCustomValue = (event) => {
        let value = event.target.value;
        if (event.target.value < 0) {
            value = 0;
        } else if (event.target.value > 180) {
            value = 180;
        }
        setSettings((timerSetting) => {
            return { ...timerSetting, longerTimerValue: value };
        });
    };

    return (
        <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", top: 0, right: 0 }}>
                <Paper className={`${classes.paper} ${classes.settings}`}>
                    <div className="mx-3">
                        <div className="text-center mt-1 mb-2">
                            <SettingsIcon className="mr-2" />
                            Accessibility Settings
                        </div>
                        <FormControlLabel
                            control={
                                <MySwitch checked={settings.longerTimer} onChange={handleChange} name="longerTimer" />
                            }
                            label="Longer countdown timer"
                        />
                        {settings.longerTimer && (
                            <div>
                                {/* How long would you like? */}
                                <InputLabel htmlFor="customTimerValue">How long would you like? </InputLabel>
                                <div className={`${classes.customInputDiv} d-flex flex-row`}>
                                    <Input
                                        type="number"
                                        onChange={handleCustomValue}
                                        value={settings.longerTimerValue}
                                        name="customTimerValue"
                                        autoFocus
                                    />
                                    <InputLabel className="my-auto ml-2">seconds</InputLabel>
                                </div>
                                <InputLabel className="mt-2">
                                    This is the amount of time to complete each question
                                </InputLabel>
                            </div>
                        )}
                        <FormControlLabel
                            control={<MySwitch checked={settings.noTimer} onChange={handleChange} name="noTimer" />}
                            label="No countdown timer"
                        />
                    </div>
                </Paper>
            </div>
        </div>
    );
};

export default Settings;
