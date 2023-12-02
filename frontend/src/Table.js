import React, { useEffect, useState } from "react";
import { Card, List, Checkbox, Typography, Row, Col, Descriptions, Button, Input } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

function Table({ transcript }) {
    const [prevTranscript, setPrevTranscript] = useState(undefined);
    const [pendingItems, setPendingItems] = useState([]);
    const [verifiedItems, setVerifiedItems] = useState([]);
    const [discardedItems, setDiscardedItems] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (transcript && transcript !== prevTranscript) {
                fetch("http://localhost:8000/audio-analysis/", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({conversation_id: "ABC", text: transcript}),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        setPendingItems(Object.entries(data));
                        setPrevTranscript(transcript);
                    });
            }
        }, 2000);

        return () => clearInterval(interval);
    }, [transcript, prevTranscript]);

    const handleVerification = (id) => {
        const item = pendingItems.find((Item) => Item[0] === id);
        setPendingItems(pendingItems.filter((Item) => Item[0] !== id));
        setVerifiedItems([...verifiedItems, item]);
    };

    const handleInputChange = (id, value) => {
        const modifiedItems = pendingItems.map((item) => {
            if (item[0] === id) {
                return [item[0], value];
            }
            return item;
        });
        setPendingItems(modifiedItems);
    };

    return (
        <Card style={{ minHeight: '60vh', borderRadius: "1rem", padding: "1em", overflow: "scroll" }}>
            <Row>
                <Col span={24}>
                    <Title level={4} style={{color: '#2952EF', marginTop: "0px"}}>Patient Info</Title>
                    <Descriptions bordered column={2} style={{backgroundColor: "#ffffff", marginBottom: "10px"}}>
                        <Descriptions.Item label="Name">John Doe</Descriptions.Item>
                        <Descriptions.Item label="Age">29</Descriptions.Item>
                        <Descriptions.Item label="Height">170 cm</Descriptions.Item>
                        <Descriptions.Item label="Weight">70 kg</Descriptions.Item>
                        <Descriptions.Item label="BMI">34</Descriptions.Item>
                        <Descriptions.Item label="Blood Pressure">120/80</Descriptions.Item>
                    </Descriptions>
                </Col>
            </Row>
            <Row gutter={16} style={{marginTop: "10px"}}>
                {["Pending", "Verified", "Discarded"].map((status) => (
                    <Col span={8}>
                        <Card title={<Title level={5} style={{color: "#2952EF"}}>{status}</Title>} bodyStyle={{padding: "1em"}} style={{height: "35rem", overflowY: "scroll", boxShadow: "0 1px 3px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.24)", borderRadius: "10px"}}>
                            <List
                                itemLayout="horizontal"
                                dataSource={status === "Pending" ? pendingItems : status === "Verified" ? verifiedItems: discardedItems}
                                renderItem={(item) => (
                                    <List.Item>
                                        <List.Item.Meta
                                            style={{alignItems: 'center', display: 'flex'}}
                                            avatar={
                                                status === "Pending" ? (
                                                    <Checkbox checked={item.verified} onChange={() => handleVerification(item[0])} />
                                                ) : (
                                                    <CheckCircleOutlined style={{color: "green"}} />
                                                )
                                            }
                                            title={<Input value={item[1]} onChange={(e) => handleInputChange(item[0], e.target.value)} />}
                                        />
                                    </List.Item>
                                )}
                            />
                            <Button type="dashed" style={{width: "100%", marginTop: 'auto', borderColor: "#2952EF", color: "#2952EF"}} onClick={() => setPendingItems([...pendingItems, [Math.random().toString(36).substr(2, 9), ""]])}>
                                Add New
                            </Button>
                        </Card>
                    </Col>
                ))}
                <Button type="primary" size="large" style={{marginTop: "16px", width: "100%"}}>Review Record</Button>
            </Row>
        </Card>
    );
}

export default Table;