import React, { useEffect, useState } from 'react';
import "../../css/chat/ChatRoomList.css";  // CSS 파일을 import
import { chatRoomList } from "./../../api/ChatApi";
import { useNavigate } from "react-router-dom";
import {friendGet} from "../../api/FriendApi";
import {chatCreateGroup} from "../../api/ChatApi";

function ChatRoomList(props) {
    const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지 상태
    const [chatRooms, setChatRooms] = useState([]);
    const [roomTitle, setRoomTitle] = useState("");  // 방 제목 상태 추가
    const [friends, setFriends] = React.useState([]);
    const navigate = useNavigate();
    const [showGroup, setShowGroup] = useState(false);
    const [selectedFriends, setSelectedFriends] = useState([]);

    useEffect(() => {
        chatRoomList()
            .then((res) => {
                console.log("목록 가져오기 " + JSON.stringify(res));
                if (res !== null) {
                    setChatRooms(res);
                }
            })
            .catch((err) => {
                console.error('채팅방 정보를 가져오는 데 실패했습니다.', err);
                setChatRooms([]); // 에러 발생 시 빈 배열로 초기화
            });
    }, [showGroup]);

    const handleChatRoom = (id) => {
        const data = {
            id: id,
            chatRoomFlag: true,
        };
        navigate("/chat", { state: data });
    };


    const handleCreateGroupChat = () => {
        // setShowGroup 상태를 변경
        setShowGroup(!showGroup);
    };

    useEffect(() => {
        if (showGroup) {
            // showGroup이 true일 때만 친구 목록을 가져옵니다.
            friendGet()
                .then((res) => {
                    setFriends(res.data);
                })
                .catch((err) => {
                    console.error("친구 목록을 가져오는 데 실패했습니다.", err);
                });
        }
    }, [showGroup]);  // showGroup 상태가 변경될 때마다 실행됩니다.

    const handleCheckboxChange = (friendId) => {
        setSelectedFriends(prev => {
            // friendId가 이미 선택된 친구 목록에 있는지 확인
            if (prev.includes(friendId)) {
                // 있으면 목록에서 제거
                return prev.filter(id => id !== friendId);
            } else {
                // 없으면 목록에 추가
                return [...prev, friendId];
            }
        });
    };




    const handleCreateRoom = () => {
        console.log("선택된 친구들:", selectedFriends);
        if (!roomTitle.trim()) {
            // 방 제목이 비어 있으면 에러 메시지 설정
            setErrorMessage("방 제목을 입력해주세요.");
            return; // 방 생성 로직을 실행하지 않음
        }



        const chatUserIdDtoList = selectedFriends.map(userId => ({ userId }));

        const init = {
            chatUserIdDtoList : chatUserIdDtoList,
            groupName: roomTitle,
        }

        chatCreateGroup(init)
            .then((res) => {
                const id = res.data;
                console.log("생성된 단톡방 id "+id)
                handleChatRoom(id);

            })
            .catch((err) => {

            })
        setErrorMessage("");
        setSelectedFriends([]);
        setRoomTitle("");
        // 방 생성 로직 추가
        setShowGroup(!showGroup);
    };

    return (
        <div>
            {!showGroup ? (
                <div className="chat-room-container">
                    <h2>채팅방 목록</h2>
                    <button className="create-group-chat-button" onClick={handleCreateGroupChat}>
                        단체방 만들기
                    </button>
                    {chatRooms.length === 0 ? (
                        <p className="no-chat-room">채팅방이 없습니다.</p>
                    ) : (
                        <ul className="chat-room-list">
                            {chatRooms.map(room => (
                                <li key={room.id} className="chat-room-item" onClick={() => {
                                    handleChatRoom(room.id)
                                }}>
                                    <div className="chat-room-card">
                                        <h3 className="chat-room-title">{room.name}</h3>
                                        <p className="chat-room-description">{room.createAt}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

            ) : (
                <div className="friend-list-modal">
                    <h2>친구 목록</h2>
                    <input
                        type="text"
                        placeholder="방 제목을 입력하세요"
                        value={roomTitle}
                        onChange={(e) => setRoomTitle(e.target.value)} // 방 제목 변경
                    />
                    {errorMessage && <p style={{ color: 'red', fontSize: '14px' }}>{errorMessage}</p>}  {/* 에러 메시지 표시 */}
                    <ul className="friend-list">
                        {friends.map(friend => (
                            <li key={friend.id} className="friend-item">
                                <input
                                    type="checkbox"
                                    id={friend.id}
                                    onChange={() => handleCheckboxChange(friend.id)}
                                />
                                <label htmlFor={friend.id}>{friend.name}</label>
                            </li>
                        ))}
                    </ul>
                    <button className="create-room-button" onClick={handleCreateRoom}>
                        방 생성
                    </button>
                    <button className="create-room-button" onClick={handleCreateGroupChat}>
                        채팅 목록
                    </button>
                </div>
            )}

        </div>
    );
}

export default ChatRoomList;
