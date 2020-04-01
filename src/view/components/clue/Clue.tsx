// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as React from "react";
import {
    SENSOR_LIST,
    VSCODE_MESSAGES_TO_WEBVIEW,
    GESTURES_CLUE,
    WEBVIEW_MESSAGES,
} from "../../constants";
import "../../styles/Simulator.css";
import ToolBar from "../toolbar/ToolBar";
import { ClueSimulator } from "./ClueSimulator";
import { CLUE_TOOLBAR_ICON_ID } from "../toolbar/SensorModalUtils";
import * as TOOLBAR_SVG from "../../svgs/toolbar_svg";
import { sendMessage } from "../../utils/MessageUtils";

// Component grouping the functionality for micro:bit functionalities
interface IState {
    sensors: { [key: string]: number };
    currentSelectedGesture: string;
}
const DEFAULT_STATE = {
    sensors: {
        [SENSOR_LIST.TEMPERATURE]: 0,
        [SENSOR_LIST.LIGHT_R]: 0,
        [SENSOR_LIST.LIGHT_G]: 0,
        [SENSOR_LIST.LIGHT_B]: 0,
        [SENSOR_LIST.LIGHT_C]: 0,
        [SENSOR_LIST.MOTION_X]: 0,
        [SENSOR_LIST.MOTION_Y]: 0,
        [SENSOR_LIST.MOTION_Z]: 0,
        [SENSOR_LIST.HUMIDITY]: 0,
        [SENSOR_LIST.PRESSURE]: 0,
        [SENSOR_LIST.PROXIMITY]: 0,
    },
    currentSelectedGesture: GESTURES_CLUE[0],
};

export class Clue extends React.Component<{}, IState> {
    state = DEFAULT_STATE;

    componentDidMount() {
        window.addEventListener("message", this.handleMessage);
    }

    componentWillUnmount() {
        // Make sure to remove the DOM listener when the component is unmounted.
        window.removeEventListener("message", this.handleMessage);
    }
    handleMessage = (event: any): void => {
        const message = event.data;

        switch (message.command) {
            case VSCODE_MESSAGES_TO_WEBVIEW.RESET:
                this.setState({ ...DEFAULT_STATE });
                break;
        }
    };
    render() {
        return (
            <React.Fragment>
                <ClueSimulator />
                <ToolBar
                    buttonList={CLUE_TOOLBAR_BUTTONS}
                    onUpdateSensor={this.updateSensor}
                    sensorValues={this.state.sensors}
                    onSelectGesture={this.updateGesture}
                    sendGesture={this.sendGesture}
                />
            </React.Fragment>
        );
    }
    updateSensor = (sensor: SENSOR_LIST, value: number) => {
        this.setState({ sensors: { ...this.state.sensors, [sensor]: value } });
    };
    updateGesture = (event: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({ currentSelectedGesture: event.target.value });
    };
    sendGesture = (isActive: boolean) => {
        if (this.state.currentSelectedGesture) {
            if (isActive) {
                sendMessage(WEBVIEW_MESSAGES.GESTURE, {
                    gesture: this.state.currentSelectedGesture,
                });
            } else {
                sendMessage(WEBVIEW_MESSAGES.GESTURE, {
                    gesture: "",
                });
            }
        }
    };
}

const CLUE_TOOLBAR_BUTTONS: Array<{ label: string; image: JSX.Element }> = [
    {
        label: CLUE_TOOLBAR_ICON_ID.PUSH_BUTTON,
        image: TOOLBAR_SVG.PUSH_BUTTON_SVG,
    },
    {
        label: CLUE_TOOLBAR_ICON_ID.LEDS,
        image: TOOLBAR_SVG.NEO_PIXEL_SVG,
    },
    {
        label: CLUE_TOOLBAR_ICON_ID.TEMPERATURE,
        image: TOOLBAR_SVG.TEMPERATURE_SVG,
    },
    {
        label: CLUE_TOOLBAR_ICON_ID.LIGHT,
        image: TOOLBAR_SVG.LIGHT_SVG,
    },
    {
        label: CLUE_TOOLBAR_ICON_ID.ACCELEROMETER,
        image: TOOLBAR_SVG.MOTION_SVG,
    },
    {
        label: CLUE_TOOLBAR_ICON_ID.HUMIDITY,
        image: TOOLBAR_SVG.TEMPERATURE_SVG,
    },
    {
        label: CLUE_TOOLBAR_ICON_ID.PRESSURE,
        image: TOOLBAR_SVG.TEMPERATURE_SVG,
    },
    {
        label: CLUE_TOOLBAR_ICON_ID.PROXIMITY,
        image: TOOLBAR_SVG.TEMPERATURE_SVG,
    },
    {
        label: CLUE_TOOLBAR_ICON_ID.GESTURE,
        image: TOOLBAR_SVG.TEMPERATURE_SVG,
    },
    {
        label: CLUE_TOOLBAR_ICON_ID.GPIO,
        image: TOOLBAR_SVG.GPIO_SVG,
    },
    {
        label: CLUE_TOOLBAR_ICON_ID.SOUND,
        image: TOOLBAR_SVG.SOUND_SVG,
    },
    {
        label: CLUE_TOOLBAR_ICON_ID.SPEAKER,
        image: TOOLBAR_SVG.SPEAKER_SVG,
    },
];
