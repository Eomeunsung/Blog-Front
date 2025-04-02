import React, { useState, useEffect } from "react";
import "../../css/profile/MyProfile.css";
import { myProfile } from "../../api/UserApi";
import DetailPage from "../detail/DetailPage";
import MyProfileUpdateModal from "./MyProfileUpdateModal";
import {useNavigate} from "react-router-dom";
import { BsEmojiSmile } from "react-icons/bs";

const profileData={
    email:"",
    name:"",
    createAt:"",
    imgUrl:"",

}

const MyProfile = () => {
    const navigate = useNavigate();
    const [userProfile, setUserProfile] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [loadingProfile, setLoadingProfile] = useState(true);
    const [loadingBlogs, setLoadingBlogs] = useState(true);

    const [selectedBlog, setSelectedBlog] = useState();
    const [isHidingDetail, setIsHidingDetail] = useState(false);
    const [renewal, setRenewal] = useState(false);
    const [layout, setLayout] = useState(false);
    const [deleteBlog, setDeleteBlog] = useState(true);


    const [modal, setModal] = useState(false);

    useEffect(() => {
        const name = localStorage.getItem("name");
        if (name) {
            setUserProfile({ name: name });
            setLoadingProfile(false);
        }
    }, []);

    useEffect(() => {
        myProfile()
            .then((result) => {
                setBlogs(result.data.blogData);
                setUserProfile(result.data);
                setLoadingBlogs(false);
                profileData.email = result.data.email;
                profileData.name = result.data.name;
                profileData.createAt = result.data.createAt;
                profileData.imgUrl = `${process.env.REACT_APP_URL}/${result.data.imgUrl}`;
                console.log(`${process.env.REACT_APP_URL}/${userProfile.imgUrl}`)
            })
            .catch((err) => {
                console.log(err);
            });
    }, [renewal, modal]);

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

    const handleModal = () =>{
        setModal(!modal);
    }

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
                            {/*{userProfile.profileImg ? (*/}
                                <img
                                    src={profileData.imgUrl}
                                    alt="프로필 사진"
                                    className="profile-avatar"
                                />
                            {/*// ) : (*/}
                            {/*//     <BsEmojiSmile className="profile-avatar" />*/}
                            {/*// )}*/}
                                <div className="profile-info">
                                    <h2>{profileData.name}</h2>
                                    <p>{profileData.email}</p>
                                    <p className="created-at">{profileData.createAt}</p>
                                </div>
                            </div>
                        </div>

                        {/* 버튼을 별도로 분리 */}
                        <div className="profile-buttons">
                            <button onClick={() => {handleModal()}}>
                                프로필 수정
                            </button>
                            <button onClick={()=>{navigate("/friend")}}>친구 목록</button>
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
            {modal && (
                <>
                    {/* 모달 배경 클릭 시 모달을 닫을 수 있도록 */}
                    <div className="modal-background" onClick={handleModal}></div>

                    {/* 모달 내용 */}
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <MyProfileUpdateModal handleModal={handleModal} profile={profileData}/>
                    </div>
                </>
            )}

        </div>
    );
};

export default MyProfile;
