import React, { useEffect, useState } from 'react';
import "./../../css/ChatRoomList.css";  // CSS 파일을 import
import { chatRoomList } from "./../../api/ChatApi";

function ChatRoomList(props) {
    const [chatRooms, setChatRooms] = useState([]);

    useEffect(() => {
        chatRoomList()
            .then(res => {
                if (res.data.data !== null) {
                    setChatRooms(res.data.data);
                }
            })
            .catch((err) => {
                console.error('채팅방 정보를 가져오는 데 실패했습니다.', err);
            });
    }, []);

    return (
        <div className="chat-room-container">
            <h2>채팅방 목록</h2>
            {chatRooms.length === 0 ? (
                <p className="no-chat-room">채팅방이 없습니다.</p>
            ) : (
                <ul className="chat-room-list">
                    {chatRooms.map(room => (
                        <li key={room.id} className="chat-room-item">
                            <div className="chat-room-card">
                                <h3 className="chat-room-title">{room.name}</h3>
                                <p className="chat-room-description">{room.description}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ChatRoomList;
