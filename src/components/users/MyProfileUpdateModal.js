import React, { useState } from 'react';
import "../../css/MyProfileUpdateModal.css";
import {myProfileUpdate} from "../../api/UserApi"

const MyProfileUpdateModal = ({ profile, handleModal}) => {
    const [isAvatarChanging, setIsAvatarChanging] = useState(false);
    const [newName, setNewName] = useState('');

    const handleNameChange = (e) => {
        setNewName(e.target.value);
    };

    const handleChangeName = () =>{
        const data = {
            name : newName,
        }
        myProfileUpdate(data)
            .then((res) => {
                localStorage.setItem("name",newName)
                // 변경된 이름을 App.js에서 반영하도록 강제로 storage 이벤트 발생
                window.dispatchEvent(new Event('storage'));  // 다른 탭에서도 변경 감지 가능
                handleModal();
        })
            .catch((err) => {
                alert(err.response.data.message)
                window.location.href="/login";
            })

    }


    return (
        <div className="modal-overlay">
            <div className="modal-container">
                {/* 프로필 수정 모달 */}
                <div className="profile-header">
                    {/* 프로필 사진과 정보 */}
                    <div className="profile-avatar-info-container">
                        <div className="profile-avatar-container">
                            <img
                                src={"/default-avatar.png"} // 기본 프로필 사진
                                alt="프로필 사진"
                                className="profile-avatar"
                            />


                            <label htmlFor="avatar-upload" className="profile-input-file-label">
                                사진 변경
                            </label>
                            <input
                                type="file"
                                id="avatar-upload"
                                className="profile-input-file"
                            />


                        </div>

                        <div className="profile-info-container">
                            <p className="profile-email"><strong>이메일:</strong> {profile.email}</p>
                            <p className="profile-created-at"><strong>회원가입일:</strong> {profile.name}</p>
                        </div>
                    </div>

                    {/* 이름 수정 */}
                    <div className="profile-input-container">
                        <p className="profile-textbar"><strong>이름수정</strong></p>
                        <input
                            type="text"
                            className="profile-input"
                            value={newName}
                            onChange={handleNameChange}
                            placeholder={profile.name}
                        />
                    </div>

                    {/* 저장 및 취소 버튼 */}
                    <div className="profile-buttons">
                        <button onClick={() => {handleChangeName()}}>저장</button>
                        <button onClick={handleModal}>취소</button> {/* 모달 닫기 */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfileUpdateModal;
