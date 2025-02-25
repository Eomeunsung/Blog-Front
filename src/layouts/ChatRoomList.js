import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChatRoom from './ChatRoom';

const ChatRoomList = () => {
    const [chatRooms, setChatRooms] = useState([]);
    const [roomName, setRoomName] = useState('');
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [participantName, setParticipantName] = useState('');
    const [socket, setSocket] = useState(null);
    const [name, setName] = useState('');

    useEffect(() => {
        fetchChatRooms();
        return () => {
            if (socket) {
                socket.close(); // 컴포넌트 언마운트 시 소켓 연결 종료
            }
        };
    }, [socket]);

    const fetchChatRooms = async () => {
        try {
            const response = await axios.get('http://localhost:8080/chatroom');
            setChatRooms(response.data);
        } catch (error) {
            console.error('채팅방 목록을 가져오는 데 오류가 발생했습니다:', error);
        }
    };

    const createChatRoom = async () => {
        try {
            await axios.post('http://localhost:8080/chatroom', roomName, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setRoomName('');
            fetchChatRooms();
        } catch (error) {
            console.error('채팅방 생성 중 오류 발생:', error);
        }
    };

    const joinChatRoom = (roomId) => {
        if (socket) {
            socket.close(); // 기존 소켓 연결 종료
        }

        setSelectedRoom(roomId);
        connectWebSocket(roomId); // WebSocket 연결
    };

    const connectWebSocket = (roomId) => {
        const ws = new WebSocket(`ws://localhost:8080/websocket`); // WebSocket URL

        ws.onopen = () => {
            const joinMessage = {
                chatRoomId: roomId,
                name : name,
                messageType: 'JOIN',
                message: ''
            };
            ws.send(JSON.stringify(joinMessage));
            console.log(`WebSocket 연결됨: ${roomId}`);
        };

        ws.onclose = () => {
            console.log('WebSocket 연결 종료');
            setSocket(null); // 소켓 상태를 null로 설정
        };

        ws.onerror = (error) => {
            console.error('WebSocket 오류:', error);
        };

        setSocket(ws); // 소켓 상태 업데이트
    };

    const handleJoin = () => {
        if (selectedRoom && name) {
            connectWebSocket(selectedRoom); // 채팅방에 참여할 때 소켓 연결
        }
    };

    return (
        <div>
            <h2>채팅방 {selectedRoom}에 참여하기</h2>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="이름 입력"
            />
            <h1>채팅방 목록</h1>
            <ul>
                {chatRooms.map((room) => (
                    <li key={room.id} onClick={() => joinChatRoom(room.id)}>
                        채팅방 {room.id}: {room.name}
                    </li>
                ))}
            </ul>
            <input
                type="text"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="채팅방 이름"
            />
            <button onClick={createChatRoom}>채팅방 생성</button>

            {selectedRoom && (
                <div>
                    <button onClick={handleJoin}>참여하기</button>
                    {socket && (
                        <ChatRoom roomId={selectedRoom} participantName={participantName} socket={socket} name={name}/>
                    )}
                </div>
            )}
        </div>
    );
};

export default ChatRoomList;
