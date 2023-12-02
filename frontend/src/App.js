import React from "react";
import { Button, Card, Typography, Row, Col, Tooltip } from "antd";
import { SoundOutlined, StopOutlined, UndoOutlined } from '@ant-design/icons';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Table from "./Table";

const { Title, Paragraph } = Typography;

function App() {
    const {
      transcript,
      listening ,
      resetTranscript,
      browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
      return <div>Browser doesn't support speech recognition.</div>;
    }

    const listenContinuously = () => {
      SpeechRecognition.startListening({
          continuous: true,
          language: 'en-US'
      });
    };

    return (
        <div style={{
             height: '100vh',
            padding: '30px',
            overflow: 'hidden',
            backgroundColor: '#ffffff'
        }}>
            <Row gutter={[16, 16]} style={{alignItems: 'flex-start'}}>
                <Col span={6} style={{ minHeight: '85vh' }}>
                    <Card title={<Title level={4}>Welcome Dr. Tiwari</Title>} bordered={false} style={ cardStyle }>
                        <Tooltip title="Start recording">
                            <Button
                                icon={ listening ? <StopOutlined /> : <SoundOutlined /> }
                                onClick={ listening ? SpeechRecognition.stopListening : listenContinuously }
                                type="primary"
                                size="large"
                                block
                                style={{ marginBottom: '15px' }}
                            >
                                { listening ? 'Stop' : 'Start'}
                            </Button>
                        </Tooltip>

                        { listening &&
                            <div style={{margin: '10px 0', color: '#1890ff'}}>Recording in progress...</div>
                        }

                        <Tooltip title="Reset Recording">
                            <Button
                                icon={<UndoOutlined />}
                                onClick={resetTranscript}
                                type="default"
                                size="large"
                                block
                                style={{ marginBottom: '15px' }}
                            >
                                Reset
                            </Button>
                        </Tooltip>

                        { transcript && (
                            <Card title="Transcript" style={{ ...cardStyle, height: '50vh', overflowY: 'auto' }}>
                                <Paragraph
                                    copyable={{ text: transcript }}
                                >
                                    {transcript}
                                </Paragraph>
                            </Card>
                        )}
                    </Card>
                </Col>
                <Col span={18}>
                    <Table transcript={transcript} />
                </Col>
            </Row>
        </div>
    );
}

const cardStyle = {
    borderRadius: '10px',
    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.08)'
}

export default App;