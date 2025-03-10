import React, { useEffect, useState } from 'react';
import "./../../css/Friend.css";
import { friendGet } from "../../api/FriendApi";
import { CiSearch } from "react-icons/ci";
import SearchPage from "./SearchPage";
import RecommendFriendPage from "./RecommendFriendPage";

function FriendPage() {
    const [friends, setFriends] = React.useState([
        { id: 1, name: "김철수" },
        { id: 2, name: "이영희" },
        { id: 3, name: "박민수" }
    ]);

    const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 추가
    const [searchFlag, setSearchFlag] = useState(false);
    const [recommendationFlag, setRecommendationFlag] = useState(false); // 추천 친구 페이지 flag 추가

    // 검색어에 맞게 친구 목록 필터링
    const filteredFriends = friends.filter(friend =>
        friend.name.includes(searchTerm)
    );

    // 검색 버튼 클릭 시 searchFlag 상태 토글
    const handleSearch = () => {
        setSearchFlag(true);
    };

    // 추천 친구 페이지로 이동하는 버튼 클릭 핸들러
    const handleRecommendFriends = () => {
        setRecommendationFlag(true);
    };

    useEffect(() => {
        friendGet()
            .then((res) => {
                // API 응답 데이터 처리
                // 예: setFriends(res.data);
            })
            .catch((err) => {
                console.error("친구 목록을 가져오는 데 실패했습니다.", err);
            });
    }, []);

    return (
        <div>
            {recommendationFlag ? (
                // 추천 친구 페이지가 활성화되면 RecommendationPage 렌더링
                <RecommendFriendPage />
            ) : (
                <>
                    {searchFlag ? (
                        // searchFlag가 true일 때 SearchPage를 렌더링
                        <SearchPage />
                    ) : (
                        <div className="friends-container">
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
                                <CiSearch className="search-icon" onClick={() => handleSearch()} />
                            </div>
                            {friends.length > 1 ? (
                                <p>친구가 없습니다.</p>
                            ) : (
                                <ul className="friends-list">
                                    {filteredFriends.map((friend) => (
                                        <li key={friend.id} className="friend-card">
                                            {friend.name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}
                    {/* 추천 친구 찾기 버튼 */}
                    <button className="recommendation-button" onClick={handleRecommendFriends}>
                        추천 친구 찾기
                    </button>
                </>
            )}
        </div>
    );
}

export default FriendPage;
