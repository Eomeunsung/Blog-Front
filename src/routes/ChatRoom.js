// src/ChatRoom.js
import React, { useEffect, useState } from 'react';

const ChatRoom = ({ roomId, participantName, socket, name }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        if (!socket) return; // socket이 없으면 early return
        const handleMessage = (event) => {
            console.log("데이터들 "+event.data)
            const receivedMessage = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        };

        socket.addEventListener('message', handleMessage);

        return () => {
            socket.removeEventListener('message', handleMessage); // 메시지 리스너 정리
        };
    }, [socket]);

    const sendMessage = () => {
        if (socket && newMessage) {
            const chatMessage = {
                chatRoomId: roomId,
                name: name,
                messageType: 'TALK',
                message: newMessage
            };
            socket.send(JSON.stringify(chatMessage));
            setNewMessage('');
        }
    };

    return (
        <div>
            <h2>채팅방 {roomId}</h2>
            <h3>채팅 내용</h3>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>
                        {msg.messageType === 'ADMIN' ? (
                            <em>{msg.message}</em> // ADMIN 메시지는 다른 스타일로 표시
                        ) : (
                            <>
                                <strong>{msg.name}:</strong> {msg.message}
                            </>
                        )}
                    </li>
                ))}
            </ul>
            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="메시지 입력"
            />
            <button onClick={sendMessage}>전송</button>
        </div>
    );
};

export default ChatRoom;
