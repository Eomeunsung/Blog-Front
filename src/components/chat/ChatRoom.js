import React, { useState, useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs"; // STOMP 클라이언트
import SockJS from "sockjs-client"; // SockJS 클라이언트
import { useLocation } from "react-router-dom";
import { chatPrivateGet, chatRoomCreate, chatMsgGet } from "./../../api/ChatApi";
import "../../css/chat/ChatRoom.css";
import { IoPaperPlaneOutline } from "react-icons/io5";

const SOCKET_URL = "http://localhost:8080/ws";
const init = { name: "", content: "", createAt: "" };

function ChatRoom(props) {
    const location = useLocation();
    const data = location.state;
    const [name] = useState(localStorage.getItem("name"));
    const [email] = useState(localStorage.getItem("email"));
    const [isSending, setIsSending] = useState(false); // 중복 전송 방지 상태
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([init]);
    const [roomId, setRoomId] = useState(0);
    const [userList, setUserList] = useState([]);
    const stompClientRef = useRef(null);
    const inputRef = useRef(null);
    const messagesEndRef = useRef(null);

    // 🔥 채팅방 정보 가져오기
    useEffect(() => {
        if (!data.chatRoomFlag) {
            chatPrivateGet(data.id)
                .then((res) => {
                    if (res.code === "001") {
                        handleCreateChat();
                    } else {
                        setRoomId(res.data.roomId);
                        setUserList(res.data.username)
                        setMessages(
                            res.data.chatMessageGetDtoList.map((item) => ({
                                name: item.name,
                                content: item.content,
                                createAt: item.createAt,
                            }))
                        );
                    }
                })
                .catch((err) => console.error("에러 결과", err));
        } else {
            chatMsgGet(data.id)
                .then((res) => {
                    setRoomId(res.data.roomId);
                    setUserList(res.data.username)
                    setMessages(
                        res.data.chatMessageGetDtoList.map((item) => ({
                            name: item.name,
                            content: item.content,
                            createAt: item.createAt,
                        }))
                    );
                })
                .catch((err) => console.error("에러 결과", err));
        }
    }, [data]);

    // 🔥 채팅방 생성
    const handleCreateChat = () => {
        chatRoomCreate(data.id)
            .then((res) => setRoomId(res.data))
            .catch((err) => console.error("채팅방 생성 오류", err));
    };

    // ✅ 채팅방 입장 시 + 메시지 추가 시 스크롤 이동
    useEffect(() => {
        if (messages.length > 1) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    // 🔥 WebSocket 연결
    useEffect(() => {
        if (roomId !== 0) {
            connectWebSocket();
        }
    }, [roomId]);

    const connectWebSocket = () => {
        if (stompClientRef.current) {
            stompClientRef.current.deactivate();
        }

        const socket = new SockJS(SOCKET_URL);
        const stompClient = new Client({
            webSocketFactory: () => socket,
            debug: (msg) => console.log("[STOMP]:", msg),
            connectHeaders: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                name: localStorage.getItem("name"),
                id: roomId,
                email: localStorage.getItem("email"),
            },
            onConnect: () => {
                console.log("[STOMP] 연결 성공");

                stompClientRef.current = stompClient;
                stompClient.subscribe(`/topic/chat/${roomId}`, (message) => {
                    if (message.body) {
                        console.log("바디 "+message.body)
                        const newMessage = JSON.parse(message.body);
                        setMessages((prevMessages) => [...prevMessages, newMessage]);
                        setMessage("");
                    }
                });
            },
            onStompError: (e) => {
                console.error("[STOMP] 연결 실패:", e);
                stompClient.deactivate();
            },
            onDisconnect: () => console.log("STOMP 연결 해제"),
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });

        stompClient.activate();
    };

    // 🔥 메시지 전송
    const sendMessage = async () => {
        if (!message.trim() || !stompClientRef.current?.connected || isSending) return;

        const messageDto = { name, email, content: message };
        setIsSending(true);

        stompClientRef.current.publish({
            destination: `/app/chat/${roomId}`,
            body: JSON.stringify(messageDto),
        });

        setMessage(""); // 메시지 전송 후 초기화
        inputRef.current?.focus();

        setTimeout(() => setIsSending(false), 300); // 300ms 후 전송 상태 초기화
    };

    // 🔥 Enter 키 이벤트 처리
    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.nativeEvent.isComposing) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-wrapper">
                <div className="chat-messages">
                    <div className="flex flex-col gap-1">
                        {messages.map((msg, index) => {
                            const isMyMessage = msg.name === name;
                            return (
                                <div
                                    className={`message-item ${isMyMessage ? "my-message" : "other-message"}`}
                                    key={index}
                                    ref={index === messages.length - 1 ? messagesEndRef : null}
                                >
                                    <div className="message-header">
                                        <span className="message-name">{msg.name}</span>
                                        <span className="message-time">{msg.createAt}</span>
                                    </div>
                                    <div className="message-content">{msg.content}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="input-wrapper">
                    <input
                        ref={inputRef}
                        type="text"
                        className="message-input"
                        placeholder="메시지를 입력하세요..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyPress}
                    />
                    <IoPaperPlaneOutline className="send-button" onClick={sendMessage} disabled={isSending}/>
                    {/*<button className="send-button" onClick={sendMessage} disabled={isSending}>*/}
                    {/*    전송*/}
                    {/*</button>*/}
                </div>
            </div>
            <div className="chat-sidebar">
                <h3 className="sidebar-title">참여자 목록</h3>
                {userList && userList.length > 0 ? (
                    <ul className="participant-list">
                        {userList.map((participant, index) => (
                            <li className="participant-item" key={index}>
                                <img
                                    src={participant.profileImage || "default-avatar.png"}
                                    alt="profile"
                                    className="profile-image"
                                />
                                <span className="participant-name">{participant}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div></div>
                )}
            </div>

        </div>
    );
}

export default ChatRoom;
