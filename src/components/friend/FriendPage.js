import React, { useEffect, useState } from 'react';
import "../../css/friend/Friend.css";
import { friendGet, friendRequest, friendAccept, friendDelete } from "../../api/FriendApi";
import { CiSearch } from "react-icons/ci";
import FriendProfilePage from "./FriendProfilePage";
import {useNavigate} from "react-router-dom";

function FriendPage() {
    const navigate = useNavigate();
    const [friends, setFriends] = React.useState([]);
    const [friendReq, setFriendReq] = React.useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 추가
    const [friendFlag, setFriendFlag] = useState(false); // 친구 프로필을 보여줄 flag 상태 추가
    const [friendId, setFriendId] = useState(0);  // 친구 ID 상태 추가

    // 검색어에 맞게 친구 목록 필터링
    const filteredFriends = friends.filter(friend =>
        friend.name && friend.name.includes(searchTerm) // friend.name이 undefined가 아니고 포함하는 경우만 필터링
    );

    const handleFriendProfile = (id) => {
        setFriendId(id);  // 클릭한 친구의 ID를 설정
        setFriendFlag(true);  // 친구 프로필 페이지 열기
    };

    const handleCloseProfile = () =>{
        setFriendFlag(false);
    }

    const handleAccept = (id) => {
        console.log("들어온 id "+id);
        friendAccept(id)
            .then((res) => {
                friendRequest()
                    .then((res) => {
                        setFriendReq(res.data);
                    })
                    .catch((err) => {
                        console.error("친구 요청 가져오기 실패", err);
                    });
                // 수락 후 친구 목록을 다시 가져오기
                friendGet()
                    .then((res) => {
                        setFriends(res.data); // 최신 친구 목록으로 갱신
                    })
                    .catch((err) => {
                        console.error("친구 목록을 가져오는 데 실패했습니다.", err);
                    });
            })
            .catch((err) => {
                console.error("친구 요청 수락 실패", err);
            });
    };

    const handleDelete = (id) => {
        friendDelete(id)
            .then((res) => {
                setFriends(friends.filter(friend => friend.id !== id));
        })
            .catch((err) => {

            })
    }
    const handleChatRoom = (id) =>{
        console.log("들어온 친구 아이디 "+id)
        const data = {
            id: id,
            chatRoomFlag: false,
        }
        navigate("/chat", { state: data })
    }
    useEffect(() => {
        friendRequest()
            .then((res) => {
                setFriendReq(res.data);
            })
            .catch((err) => {
                console.log(err)
                console.error("친구 요청 가져오기 실패", err);
            });
    }, []);

    useEffect(() => {
        friendGet()
            .then((res) => {
                setFriends(res.data);
            })
            .catch((err) => {
                console.log(err)
                console.error("친구 목록을 가져오는 데 실패했습니다.", err);
            });
    }, []);

    return (
        <div>
            {
                friendFlag ? (
                    <FriendProfilePage id={friendId} handleCloseProfile={handleCloseProfile }/>
                ) : (
                    <div className="friends-container">
                        <div>
                            {
                                friendReq.length === 0 ? (
                                    <></>
                                ) : (
                                    <div>
                                        <h2 className="friends-title">👥 친구 요청</h2>
                                        <ul className="friends-list">
                                            {friendReq.map((friend) => (
                                                <li key={friend.id} className="friend-card">
                                                    {friend.friendName}
                                                    <div className="reqButtons-container">
                                                        <button className="friendReq-button"
                                                                onClick={(e) => {
                                                                    handleAccept(friend.friendId);
                                                                    e.stopPropagation(); // 부모 요소 클릭 방지
                                                                }}>수락
                                                        </button>
                                                        <button className="friendReq-button" onClick={(e) => {
                                                            e.stopPropagation(); // 부모 요소 클릭 방지
                                                        }}>거절
                                                        </button>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )
                            }
                        </div>
                        <button className="recommendation-button" onClick={()=>{navigate("/recommendation")}}>
                            추천 친구 찾기
                        </button>
                        <h2 className="friends-title">👥 친구 목록</h2>
                        {/* 🔍 검색 입력 필드 */}
                        <div className="search-container">
                            <input
                                type="text"
                                placeholder="친구 이름 검색..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                            <CiSearch className="search-icon"/>
                        </div>

                        {friends.length === 0 ? (
                            <p>친구가 없습니다.</p>
                        ) : (
                            <ul className="friends-list">
                                {filteredFriends.map((friend) => (
                                    <li key={friend.id} className="friend-card"
                                        onClick={() => handleFriendProfile(friend.id)}>
                                        {friend.name}
                                        <div className="friend-actions">
                                            <button className="friend-delete"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleChatRoom(friend.id);
                                                    }}>
                                                채팅
                                            </button>
                                            <button className="friend-delete"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDelete(friend.id);
                                                    }}>
                                                삭제
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )
            }

        </div>
    );
}

export default FriendPage;
