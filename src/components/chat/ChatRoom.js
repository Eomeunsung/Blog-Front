import React, { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs'; // STOMP 클라이언트
import SockJS from 'sockjs-client'; // SockJS 클라이언트

function ChatRoom({ roomId }) {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [stompClient, setStompClient] = useState(null);

    useEffect(() => {
        // 웹소켓 연결을 위한 클라이언트 생성
        const client = new Client({
            brokerURL: 'ws://localhost:8080/ws', // STOMP 서버 URL (여기서는 WebSocket 엔드포인트)
            connectHeaders: {
                // Authorization: "Bearer " + localStorage.getItem("jwt"), // JWT 토큰을 헤더에 추가
            },
            debug: (str) => {
                console.log(str); // 디버그 로그 (선택 사항)
            },
            onConnect: () => {
                console.log('WebSocket Connected');
                // 연결 후 채팅방 구독
                client.subscribe(`/sub/${roomId}`, (message) => {
                    const newMessage = JSON.parse(message.body);
                    setMessages((prevMessages) => [...prevMessages, newMessage]);
                });
            },
            onStompError: (frame) => {
                console.error('STOMP 연결 오류', frame);
            }
        });

        // SockJS를 통해 WebSocket을 연결
        client.webSocketFactory = () => new SockJS('http://localhost:8080/ws'); // SockJS URL 설정
        client.activate();

        setStompClient(client); // stompClient 상태 업데이트

        return () => {
            // 컴포넌트가 unmount될 때 연결 종료
            if (client) {
                client.deactivate();
            }
        };
    }, [roomId]);

    // 메시지 전송 함수
    const sendMessage = () => {
        if (message.trim() && stompClient) {
            const chatMessage = {
                content: message,
                name: '사용자 이름', // 실제 사용자 이름으로 대체
            };

            // STOMP 서버로 메시지 전송
            stompClient.send(`/app/chat/${roomId}`, {}, JSON.stringify(chatMessage));
            setMessage(''); // 메시지 전송 후 입력란 비우기
        }
    };

    return (
        <div className="chat-room">
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index} className="message">
                        <strong>{msg.name}: </strong>{msg.content}
                    </div>
                ))}
            </div>
            <div className="message-input">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="메시지를 입력하세요"
                />
                <button onClick={sendMessage}>전송</button>
            </div>
        </div>
    );
}

export default ChatRoom;
