import Card from "react-bootstrap/Card";
import {Form} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons';

function Table(transcript) {
    const [prevTranscript, setPrevTranscript] = useState(undefined);
    const [res, setRes] = useState({});

    const [pendingItems, setPendingItems] = useState([]);
    const [verifiedItems, setVerifiedItems] = useState([]);
    const [discardedItems, setDiscardedItems] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const a = transcript === undefined || transcript !== prevTranscript ;
            if (a) {
                fetch('http://localhost:8000/audio-analysis/',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            "conversation_id": "ABC",
                            'text': transcript,
                        }),
                    })
                    .then(response => response.json())
                    .then(data => {
                        setRes(data);
                        setPendingItems(Object.entries(data).map(([key, value], index) => ({
                            key: key,
                            value: value,
                        })));
                        setPrevTranscript(transcript);
                    });
            }
        }, 2000);

        return () => clearInterval(interval);
    }, [transcript, prevTranscript]);

    const handleVerification = id => {
        const item = pendingItems.find(item => item.key === id);
        setPendingItems(pendingItems.filter(item => item.key !== id));
        item.verified = true;
        setVerifiedItems([...verifiedItems, item]);
    }


    // convert res.res which is a json object to an array of key value pairs
    return (
        <Card style={{
            width: "80rem",
            margin: "10px",
            padding: "20px",
            borderRadius: "1rem",
            boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#f8f9fc"
        }}>
            <Card.Body>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'start'
                }}>
                    {['Pending', 'Verified', 'Discarded'].map(status => (
                        <div style={{
                            width: '30%',
                            borderRadius: '10px',
                            padding: '20px',
                            maxHeight: '40rem',
                            overflowY: 'clip',
                            backgroundColor: "#ffffff",
                            boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)'
                        }}>
                            <h3>{status}</h3>
                            <div style={{
                                overflowY: 'scroll',
                                maxHeight: '50rem',
                                padding: '10px',
                            }}>
                                {(status === 'Pending' ? pendingItems : status === 'Verified' ? verifiedItems : discardedItems).map((item) => (
                                    <Card style={{
                                        marginTop: '10px',
                                        marginBottom: '10px',
                                        height: '60px',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        borderRadius: '10px',
                                        border: '1px solid #e9ecef'
                                    }} key={item.id}>
                                        {
                                            !item.verified ? (
                                                <Form.Check
                                                    custom
                                                    checked={item.verified}
                                                    type="checkbox"
                                                    id={`custom-checkbox-${item.id}`}
                                                    label={""}
                                                    style={{marginRight: '0px', marginLeft: '10px'}}
                                                    onChange={() => handleVerification(item.key)}
                                                />
                                            ) : (
                                                <FontAwesomeIcon
                                                    icon={faCheckCircle}
                                                    style={{
                                                        fontSize: '1.5rem',
                                                        color: 'green',
                                                        marginRight: '0px',
                                                        marginLeft: '10px',
                                                        animation: 'fade-in 0.5s'
                                                    }}
                                                />
                                            )
                                        }
                                        <div style={{
                                            flex: '1',
                                            marginLeft: '10px',
                                            display: 'flex',
                                            height: 'auto',
                                            alignItems: 'center',
                                            fontSize: '1rem',
                                            color: '#495057',
                                            wordWrap: 'break-word'
                                        }}>
                                            <small>{`${item["key"]}: ${item["value"]}`}</small>
                                            {/*<Form.Control*/}
                                            {/*    style={{border: 'none', resize: 'none', height:'auto'}}*/}
                                            {/*    value={`${item["key"]}: ${item["value"]}`}*/}
                                            {/*    onChange={e => handleItemChange(item.id, e.target.value, status)}*/}
                                            {/*/>*/}
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </Card.Body>
        </Card>
    )
}

export default Table;