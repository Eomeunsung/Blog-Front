import React, {useEffect, useState} from 'react';
import './../css/List.css'
import { FiMenu,FiGrid } from "react-icons/fi";
import Detail from './Detail'
import {getBlog} from "./../api/BlogApi";
import {useLocation} from "react-router-dom";


const initState = {
    id : 0,
    title : "",
    content:"",
    imgUrl:""
}

function List(props) {
    const [isGrid, setIsGrid] = useState(true); // 상태로 레이아웃 제어
    let [blog, setBlog] = useState({...initState});

    const [selectedBlog, setSelectedBlog] = useState({...initState}); // 선택된 블로그 데이터
    const [isHidingDetail, setIsHidingDetail] = useState(false); // 애니메이션 상태
    const [renewal, setRenewal] = useState(false);
    const location = useLocation(); // 현재 URL 경로 가져오기

    const handleRenewal = () =>{
        setRenewal(true);
    }
    const handleSelectBlog = (blog) => {
        setSelectedBlog(blog); // 블로그 선택
        setIsHidingDetail(false); // 애니메이션 초기화
    };

    const handleCloseDetail = () => {
        setIsHidingDetail(true); // 애니메이션 시작
        setTimeout(() => {
            setIsHidingDetail(false); // 애니메이션 종료 후 상태 변경
            setSelectedBlog(null); // 상세 정보 숨김
        }, 500);
    };

    useEffect(() => {
        setSelectedBlog(null); // 상세 정보를 초기화
        getBlog().then((result) => {setBlog(result); setRenewal(false)});  // result.data는 함수가 아니라 데이터입니다.
    }, [location, renewal]);


    return (
        <div>
            {/* 레이아웃 변경 버튼 */}
            {isGrid ? (
                <FiMenu
                    style={{width: "40px", height: "40px", cursor: "pointer"}}
                    onClick={() => setIsGrid(!isGrid)}
                />
            ) : (
                <FiGrid
                    style={{width: "40px", height: "40px", cursor: "pointer"}}
                    onClick={() => setIsGrid(!isGrid)}
                />
            )}

            {/* 상세 페이지 */}
            {selectedBlog ? (
                <Detail
                    isHidingDetail={isHidingDetail}
                    onClose={handleCloseDetail}
                    value={selectedBlog}
                    handleRenewal={handleRenewal}
                />
            ) : (
                /* 리스트 렌더링 */
                <div className={isGrid ? "grid-container" : "list-container"}>
                    {blog.length > 0  ? (
                        blog.map((value, index) => (
                            <div
                                className={isGrid ? "grid-item" : "list-item"}
                                onClick={() => handleSelectBlog(value)}
                            >
                                <h6>{value.title}</h6>
                                <p>{value.localDate}</p>
                            </div>
                        ))
                    ) : (
                        <div>데이터가 없음</div>
                    )}
                </div>
            )}
        </div>
    );
}

export default List;