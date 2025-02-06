import React, {useEffect, useState} from 'react';
import '../../css/List.css'
import { FiMenu,FiGrid } from "react-icons/fi";
import Detail from '../detail/Detail'
import {getBlog} from "../../api/BlogApi"
import {useLocation} from "react-router-dom";


const initState = {
    id : 0,
    title : "",
    content:"",
    imgUrl:null
}

function List(props) {
    const [isGrid, setIsGrid] = useState(true); // 상태로 레이아웃 제어
    let [blog, setBlog] = useState({...initState});
    const [connection, setConnection] = useState(true);
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
        getBlog()
            .then((result) => {
                if (result) {
                    setBlog(result);
                    setRenewal(false);

                } else {
                    // 오류 발생 시 필요한 추가 처리
                    console.log("Failed to fetch blog data");
                    setBlog([]); // 예시로 빈 배열로 초기화
                    setRenewal(false);
                    setConnection(false);
                }
            })
            .catch((error) => {
                console.log(error);
                setBlog([]); // 에러 발생 시 빈 배열로 초기화
                setRenewal(false);
                setConnection(false);
            }); // result.data는 함수가 아니라 데이터입니다.
    }, [location, renewal]);


    return (
        <div>
            {!connection && (
                <p
                    style={{
                        color: "white",
                        background: "linear-gradient(45deg, #ff7f50, #ff6347, #ff1493)", // 그라데이션 효과로 알록달록한 배경
                        border: "2px solid #ff8c00", // 주황색 테두리
                        borderRadius: "10px", // 둥글게
                        padding: "12px 20px", // 여백 추가
                        fontWeight: "bold", // 글씨 두껍게
                        textAlign: "center", // 가운데 정렬
                        fontSize: "18px", // 글씨 크기
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // 그림자 추가
                        transition: "transform 0.3s ease, box-shadow 0.3s ease", // 애니메이션 효과
                    }}
                >
                    서버와 연결되지 않았습니다.
                </p>
            )}

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