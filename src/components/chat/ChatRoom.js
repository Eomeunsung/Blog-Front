import React, {useState, useEffect, useRef} from 'react';
import { Client } from '@stomp/stompjs'; // STOMP 클라이언트
import SockJS from 'sockjs-client'; // SockJS 클라이언트
import {useLocation} from "react-router-dom";
import {chatPrivateGet, chatRoomCreate, chatMsgGet} from  "./../../api/ChatApi"
import "../../css/chat/ChatRoom.css"


const SOCKET_URL = "http://localhost:8080/ws";
const init = {
    name : "",
    content:"",
    createAt:"",
}
function ChatRoom(props) {
    const location = useLocation();
    const data = location.state;
    const [name, setName] = React.useState(localStorage.getItem('name'));
    const [email, setEmail] = React.useState(localStorage.getItem('email'));
    const [isSending, setIsSending] = useState(false); // 중복 전송 방지 상태

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([init]);
    const stompClientRef = useRef(null);
    const inputRef = useRef(null);
    const [roomId, setRoomId] = useState(0);

    useEffect(()=>{
        if(!data.chatRoomFlag){
            chatPrivateGet(data.id)
                .then((data)=>{
                    // console.log("방 가져오기 "+JSON.stringify(data.data))
                    if(data.code==="001"){
                        handleCreateChat()
                    }else{
                        setRoomId(data.data.roomId);

                        const messagesData = data.data?.chatMessageGetDtoList || []; // 기본값은 빈 배열

                        // 데이터에서 필요한 부분만 추출하여 messages에 저장
                        const extractedMessages = messagesData.map(item => ({
                            name: item.name,
                            content: item.content,
                            createAt: item.createAt,
                        }));

                        // messages 상태 갱신
                        setMessages(extractedMessages);
                    }
                })
                .catch((err)=>{
                    console.log("에러 결과 "+err)
                })
        }else if(data.chatRoomFlag){
            chatMsgGet(data.id)
                .then((data)=>{
                    setRoomId(data.data.roomId);

                    const messagesData = data.data?.chatMessageGetDtoList || []; // 기본값은 빈 배열

                    // 데이터에서 필요한 부분만 추출하여 messages에 저장
                    const extractedMessages = messagesData.map(item => ({
                        name: item.name,
                        content: item.content,
                        createAt: item.createAt,
                    }));

                    // messages 상태 갱신
                    setMessages(extractedMessages);
                }).catch((err)=>{
                console.log("에러 결과 "+err)
            })
        }

    },[data])

    const handleCreateChat = () =>{
        console.log("채팅방 없음으로 새로 개설")
        chatRoomCreate(data)
            .then((data)=>{
                console.log("룸 생성 아이디1 "+data.data)
                setRoomId(data.data);

            }).catch((err)=>{

        })
    }

    useEffect(()=>{
        if (roomId !== 0) {
            webSocket();
        }
    },[roomId])



    const webSocket = () => {
        const socket = new SockJS(SOCKET_URL, null, {
            withCredentials: false,
        });
        const stompClient = new Client({
            webSocketFactory: () => socket,
            debug: (msg) => console.log("[STOMP]:", msg),
            connectHeaders: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                name: localStorage.getItem('name'),
                id: roomId,
                email: localStorage.getItem('email'),
            },
            onConnect: () => {
                console.log("[STOMP] 연결 성공: ", stompClient);

                // 기존 구독 취소
                if (stompClientRef.current) {
                    stompClientRef.current.deactivate();
                }

                stompClientRef.current = stompClient;
                stompClientRef.current.subscribe(`/topic/chat/${roomId}`, (message) => {
                    if (message.body) {
                        const newMessage = JSON.parse(message.body);
                        setMessages((prevMessages) => [...prevMessages, newMessage]); // 이전 상태 기반으로 메시지 추가
                        setMessage("");  // 입력창 초기화
                        console.log("새로운 메시지 추가 후 메시지들: ", newMessage);
                    }
                });
            },
            onStompError: (e) => {
                console.error("[STOMP] 연결 실패: ", e);
                stompClient.deactivate();
            },
            onDisconnect: () => console.log("STOMP 연결 해제"),
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });

        stompClient.activate();
    };


    const sendMessage = () => {
        if (!message.trim() || !stompClientRef.current || !stompClientRef.current.connected || isSending) return;

        const messageDto = {
            name: name,
            email: email,
            content: message
        };

        setIsSending(true);  // 전송 시작

        stompClientRef.current.publish({
            destination: `/app/chat/${roomId}`,
            body: JSON.stringify(messageDto),
        });

        setMessage(""); // 메시지 전송 후 초기화
        inputRef.current?.focus();

        setIsSending(false);  // 전송 완료
    };
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            // 한글 입력 중이면 메시지를 전송하지 않음
            if (e.nativeEvent.isComposing) return;

            e.preventDefault();  // 기본 동작 방지
            sendMessage();  // 메시지 전송
        }
    };


    return (
        <div className="chat-container">
            <div className="chat-wrapper">
                <div className="chat-messages">
                    <div className="flex flex-col gap-1">
                        {messages.map((message, index) => {
                            const isMyMessage = message.name === name; // 내 메시지인지 확인
                            return message.type === "SYSTEM" ? (
                                <div className="message-item system-message" key={index}>
                                    {message.content}
                                </div>
                            ) : (
                                <div className={`message-item ${isMyMessage ? "my-message" : "other-message"}`} key={index}>
                                    <div className="message-header">
                                        <span className="message-name">{message.name}</span>
                                        <span className="message-time">{message.createAt}</span>
                                    </div>
                                    <div className="message-content">{message.content}</div>
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
                    <button className="send-button" onClick={sendMessage}>
                        전송
                    </button>
                </div>
            </div>
        </div>
    );

}

export default ChatRoom;
