import React, {useEffect, useState} from 'react';
import {friendProfile} from "./../../api/FriendApi"
import DetailPage from "../detail/DetailPage";
import "./../../css/MyProfile.css"

function RecommendFriendProfilePage(props) {
    const [userProfile, setUserProfile] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [loadingProfile, setLoadingProfile] = useState(true);
    const [loadingBlogs, setLoadingBlogs] = useState(true);

    const [selectedBlog, setSelectedBlog] = useState();
    const [isHidingDetail, setIsHidingDetail] = useState(false);
    const [renewal, setRenewal] = useState(false);
    const [layout, setLayout] = useState(false);
    const [deleteBlog, setDeleteBlog] = useState(true);

    useEffect(() => {
        const name = localStorage.getItem("name");
        if (name) {
            setUserProfile({ name: name });
            setLoadingProfile(false);
        }
    }, []);

    useEffect(() => {
        friendProfile(props.id)
            .then((result) => {
                setBlogs(result.data.blogData);
                setUserProfile(result.data);
                setLoadingBlogs(false);

            })
            .catch((err) => {
                console.log(err);
            });
    }, [renewal]);

    const handleCloseDetail = () => {
        setIsHidingDetail(true);
        setTimeout(() => {
            setIsHidingDetail(false);
            setSelectedBlog(null);
            setLayout(!layout);
        }, 500);
    };

    const handleSelectBlog = (blog) => {
        setSelectedBlog(blog);
        setIsHidingDetail(false);
        setLayout(true);
    };

    const handleRenewal = () => {
        setRenewal(true);
    };

    if (loadingProfile || loadingBlogs) {
        return <p>로딩 중...</p>;
    }

    return (
        <div className="container">
            {/* 프로필 컨테이너 */}
            <div className="profile-container">
                {userProfile && (
                    <>
                        <div className="profile-header">
                            <div className="profile-avatar-container">
                                <img
                                    src={userProfile.avatarUrl}
                                    alt="프로필 사진"
                                    className="profile-avatar"
                                />
                                <div className="profile-info">
                                    <h2>{userProfile.name}</h2>
                                    <p>{userProfile.email}</p>
                                    <p className="created-at">{userProfile.createAt}</p>
                                </div>
                            </div>
                        </div>

                        {/* 버튼을 별도로 분리 */}
                        <div className="profile-buttons">
                            <button onClick={()=>{props.handleBackToList()}}>친구 추천 목록</button>
                        </div>
                    </>
                )}
            </div>

            {/*{selectedBlog && layout ? (*/}
            {layout ? (
                <DetailPage
                    isHidingDetail={isHidingDetail}
                    onClose={handleCloseDetail}
                    value={selectedBlog}
                    handleRenewal={handleRenewal}
                    deleteBlog={deleteBlog}
                />
            ) : (
                <div className="blogs-container">
                    {blogs?.length === 0 ? (
                        <p className="empty-message">작성한 블로그가 없습니다.</p>
                    ) : (
                        blogs?.map((blog) => (
                            <div
                                key={blog.id}
                                className="blog-card"
                                onClick={() => handleSelectBlog(blog.id)}
                            >
                                <h3>{blog.title}</h3>
                                <p>{blog.createAt}</p>
                            </div>
                        ))
                    )}
                </div>
            )}

        </div>
    )
}

export default RecommendFriendProfilePage;