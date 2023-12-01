import React, {useEffect, useState} from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {Collapse, Form} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Clipboard from "react-clipboard.js";

import "./App.css";
import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition";
import Table from "./Table";
import {FcSurvey} from "react-icons/fc";


function App() {
    const {
        transcript,
        interimTranscript,
        finalTranscript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    useEffect(() => {
        console.log('Got interim result:', interimTranscript);
        console.log('Got final result:', finalTranscript);
        if (finalTranscript !== '') {
            console.log('Got final result:', finalTranscript);
        }
    }, [interimTranscript, finalTranscript]);
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return null;
    }

    const listenContinuously = () => {
        SpeechRecognition.startListening({
            continuous: true,
            language: 'en-GB',
        });
    };

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    return (
        <div className="App">
            <header className="App-header">
                <div style={{display: "flex", justifyContent: "space-around", padding: "8px", height: "auto"}}>
                    <Card style={{
                        width: "36rem",
                        margin: "10px",
                        backgroundColor: "white",
                        borderRadius: "15px",
                        boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.2)"
                    }}>
                        <Card.Body style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            // justifyContent: "center"
                        }}>
                            <div className="d-flex flex-row justify-content-between">
                                <small>Welcome Dr. Tiwari</small>
                            </div>
                            <Button
                                onClick={listenContinuously}
                                disabled={listening}
                                style={{
                                    borderRadius: "80%",
                                    marginTop: "20px",
                                    padding: "60px",
                                    fontSize: "24px",
                                    color: "white",
                                    backgroundColor: "#007bff",
                                    border: "none",
                                    transition: "0.3s",
                                    cursor: "pointer",
                                    boxShadow: "0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12)"
                                }}
                                onMouseOver={e => {
                                    e.target.style.backgroundColor = "#0056b3";
                                    e.target.style.boxShadow = "0 8px 17px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)";
                                }}
                                onMouseOut={e => {
                                    e.target.style.backgroundColor = "#007bff";
                                    e.target.style.boxShadow = "0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12)";
                                }}
                            >
                                Start
                            </Button>
                            {listening && <small style={{marginTop: "10px"}}>Recording in progress...</small>}
                            <div>
                                <Button
                                    onClick={SpeechRecognition.stopListening}
                                    style={{
                                        fontSize: "24px",
                                        color: "white",
                                        backgroundColor: "#007bff",
                                        border: "none",
                                        transition: "0.3s",
                                        marginRight: "10px",
                                        marginTop: "10px",
                                    }}
                                >Stop
                                </Button>
                                <Button
                                    style={{
                                        fontSize: "24px",
                                        color: "white",
                                        backgroundColor: "#007bff",
                                        border: "none",
                                        transition: "0.3s",
                                        marginLeft: "10px",
                                        marginTop: "10px",
                                    }}
                                    onClick={resetTranscript}
                                >Reset</Button>
                                {
                                    transcript && (
                                        <Card className='transcript-card'>
                                            <Card.Body>
                                                <Collapse in={true}>
                                                    <div className='transcript-view'>
                                                        <div className='copy-button border-none align-self-end border-none'>
                                                            <Clipboard className="border-none position-relative"
                                                                       data-clipboard-text={transcript}>
                                                                <FcSurvey/>
                                                            </Clipboard>
                                                        </div>
                                                        <div className='transcript-text'>
                                                            <p>{transcript}</p>
                                                        </div>
                                                    </div>
                                                </Collapse>
                                            </Card.Body>
                                        </Card>
                                    )
                                }
                            </div>
                        </Card.Body>
                    </Card>
                    <Table></Table>
                </div>
            </header>
        </div>
    );
}

export default App;