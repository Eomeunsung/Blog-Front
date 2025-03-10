import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";

function SearchPage(props) {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query'); // 검색어 가져오기
    const [filteredFriends, setFilteredFriends] = useState([]);

    useEffect(() => {
        // 친구 목록을 가져온 후 검색어로 필터링
        const friends = [
            { id: 1, name: "엄은성" },
            { id: 2, name: "이영희" },
            { id: 3, name: "박민수" },
            { id: 4, name: "홍길동" }
        ];
        const result = friends.filter(friend =>
            friend.name.includes(query)
        );
        setFilteredFriends(result); // 필터링된 결과 상태 업데이트
    }, [query]);

    return (
        <div className="friends-container">
            <h2 className="friends-title">👥 검색 결과</h2>
            {filteredFriends.length === 0 ? (
                <p>검색된 친구가 없습니다.</p>
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
    );
}

export default SearchPage;