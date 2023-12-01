import Card from "react-bootstrap/Card";
import {Form} from "react-bootstrap";
import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons';

function Table() {
    const baseItems = [...new Array(25)].map((x, i) => ({
        id: i + 1,
        text: "Item " + (i + 1)
    }));

    const [pendingItems, setPendingItems] = useState(baseItems);
    const [verifiedItems, setVerifiedItems] = useState([]);
    const [discardedItems, setDiscardedItems] = useState([]);

    const handleVerification = id => {
        const item = pendingItems.find(item => item.id === id);
        setVerifiedItems(prevItems => [...prevItems, item]);
        setPendingItems(prevItems => prevItems.filter(item => item.id !== id));
    }

    const handleItemChange = (id, text, status) => {
        if (status === 'Pending') {
            setPendingItems(prevItems =>
                prevItems.map(item => item.id === id ? {...item, text} : item)
            );
        } else if (status === 'Verified') {
            setVerifiedItems(prevItems =>
                prevItems.map(item => item.id === id ? {...item, text} : item)
            );
        }
    }

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
                                        height: '50px',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        borderRadius: '10px',
                                        border: '1px solid #e9ecef'
                                    }} key={item.id}>
                                        {
                                            status === 'Pending' ? (
                                                <Form.Check
                                                    custom
                                                    type="checkbox"
                                                    id={`custom-checkbox-${item.id}`}
                                                    label={""}
                                                    style={{marginRight: '0px', marginLeft: '10px'}}
                                                    onChange={() => handleVerification(item.id)}
                                                />
                                            ) : (
                                                <FontAwesomeIcon
                                                    icon={faCheckCircle}
                                                    style={{
                                                        fontSize: '2rem',
                                                        color: 'green',
                                                        marginRight: '10px',
                                                        marginLeft: '2px',
                                                        animation: 'fade-in 0.5s'
                                                    }}
                                                />
                                            )
                                        }
                                        <div style={{
                                            flex: '1',
                                            marginLeft: '-10px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            fontSize: '1rem',
                                            color: '#495057'
                                        }}>
                                            <Form.Control
                                                size="sm"
                                                style={{border: 'none', width: '100%'}}
                                                value={item.text}
                                                onChange={e => handleItemChange(item.id, e.target.value, status)}
                                            />
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