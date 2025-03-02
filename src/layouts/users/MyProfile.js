import React, { useState, useEffect } from "react";
import "./../../css/MyProfile.css"
import {myProfile} from "../../api/UserApi";
import {initState} from "../../config/initState";
import DetailPage from "../detail/DetailPage";



const MyProfile = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [loadingProfile, setLoadingProfile] = useState(true);
    const [loadingBlogs, setLoadingBlogs] = useState(true);

    const [selectedBlog, setSelectedBlog] = useState({...initState}); // 선택된 블로그 데이터
    const [isHidingDetail, setIsHidingDetail] = useState(false); // 애니메이션 상태
    const [renewal, setRenewal] = useState(false);
    const [layout, setLayout] = useState(false);
    const [deleteBlog, setDeleteBlog] = useState(true);

    // 사용자 프로필 가져오기
    useEffect(() => {
        const name = localStorage.getItem("name");
        // 예시로만 이름을 가져왔다고 가정하고, 해당 데이터를 사용할 수 있습니다.
        if (name) {
            setUserProfile({ name: name }); // 실제 프로필 정보로 변경 필요
            setLoadingProfile(false); // 로딩 완료
        }
    }, []);

    // 사용자 블로그 목록 가져오기
    useEffect(() => {
       myProfile()
           .then((result)=>{
            setBlogs(result.data);
            setLoadingBlogs(false); // 블로그 로딩 완료
       })
           .catch((err)=>{
               console.log(err);
           })
    }, [renewal]);

    const handleCloseDetail = () => {
        setIsHidingDetail(true); // 애니메이션 시작
        setTimeout(() => {
            setIsHidingDetail(false); // 애니메이션 종료 후 상태 변경
            setSelectedBlog(null); // 상세 정보 숨김
        }, 500);
    };

    const handleSelectBlog = (blog) => {
        setSelectedBlog(blog); // 블로그 선택
        setIsHidingDetail(false); // 애니메이션 초기화
        setLayout(true);
    };

    const handleLayout=()=>{
        setLayout(false);
    }

    const handleRenewal = () =>{
        setRenewal(true);
    }

    if (loadingProfile || loadingBlogs) {
        return <p>로딩 중...</p>;
    }

    return (
        <div className="container">
            {/* 사용자 프로필 */}
            <div className="profile-container">
                {userProfile && (
                    <div className="profile-header">
                        <img
                            src={userProfile.avatarUrl}
                            alt="프로필 사진"
                            className="profile-avatar"
                        />
                        <div className="profile-info">
                            <h2>{userProfile.name}</h2>
                            <p>{"이메일"}</p>
                            <p className="created-at">회원가입일: {"회원가입 날짜"}</p>
                        </div>
                    </div>
                )}
            </div>
            {
                selectedBlog && layout ? (
                    <DetailPage
                        isHidingDetail={isHidingDetail}
                        onClose={handleCloseDetail}
                        value={selectedBlog}
                        handleRenewal={handleRenewal}
                        deleteBlog={deleteBlog}
                        handleLayout={handleLayout}
                    />
                )  : (
                    /* 사용자 블로그 목록 */
                    <div className="blogs-container">
                        {blogs.length === 0 ? (
                            <p className="empty-message">작성한 블로그가 없습니다.</p>
                        ) : (
                            blogs.map((blog) => (
                                <div key={blog.id} className="blog-card" onClick={() => handleSelectBlog(blog)}>
                                    <h3>{blog.title}</h3>
                                    <p>{blog.createAt}</p>
                                </div>
                            ))
                        )}
                    </div>
                )
            }


        </div>

    );
};

export default MyProfile;
