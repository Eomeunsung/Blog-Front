import React, { useState, useEffect } from 'react';
import "./../../css/RecommendFriendPage.css";
import { CiSearch } from "react-icons/ci";
import { recommendSearch, friendAdd } from "../../api/FriendApi";
import FriendProfile from "./FriendProfile";

const init = {
    id: 0,
    email: "",
    name: "",
};

function RecommendFriendPage(props) {
    const [friends, setFriends] = useState([init]);
    const [searchTerm, setSearchTerm] = useState("");
    const [friendId, setFriendId] = useState(null);
    const [friendFlag, setFriendFlag] = useState(false);

    // 검색어가 없으면 전체 친구 목록을, 있으면 필터링된 친구 목록을 보여줌
    const filteredFriends = searchTerm
        ? friends.filter(friend => friend.name.includes(searchTerm)) // 검색어가 있으면 필터링
        : friends; // 검색어가 없으면 전체 목록

    const handleAddFriend = (friendId) => {
        alert(`${friendId}번 친구가 추가되었습니다!`);
        friendAdd(friendId)
            .then((res) => {

            })
            .catch((err) => {

            })

    };

    const handleFriendProfile = (friendId) => {
        setFriendId(friendId);
        setFriendFlag(true); // 친구 프로필 화면으로 전환
    };

    const handleBackToList = () => {
        setFriendFlag(false); // 다시 추천 친구 목록으로 돌아가기
    };

    useEffect(() => {
        recommendSearch()
            .then((res) => {
                console.log("추천 친구 가져온 데이터", res.data);
                setFriends(res.data); // 친구 목록 업데이트
            })
            .catch((err) => {
                console.error("친구 목록 가져오기 실패", err);
            });
    }, []);

    return (
        <div>
            <h2 className="recommendation-title">👥 추천 친구 찾기</h2>

            {/* 친구 프로필 화면이면 추천 목록 숨김 */}
            {!friendFlag ? (
                <div className="recommendation-container">
                    {/* 🔍 검색 입력 필드 */}
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="추천 친구 검색..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                        <CiSearch className="search-icon"/>
                    </div>

                    {filteredFriends.length === 0 ? (
                        <p>추천할 친구가 없습니다.</p>
                    ) : (
                        <ul className="friends-list">
                            {filteredFriends.map((friend) => (
                                <li key={friend.id} className="friend-card"
                                    onClick={() => handleFriendProfile(friend.id)}>
                                    <div className="friend-info">
                                        <p>{friend.name}</p>
                                        <button
                                            className="add-button"
                                            onClick={(e) => {
                                                e.stopPropagation(); // 부모 요소 클릭 방지
                                                handleAddFriend(friend.id);
                                            }}
                                        >
                                            친구 추가
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ) : (
                // 친구 프로필 화면
                <FriendProfile id={friendId} handleBackToList={handleBackToList}/>
            )}
        </div>
    );
}

export default RecommendFriendPage;
