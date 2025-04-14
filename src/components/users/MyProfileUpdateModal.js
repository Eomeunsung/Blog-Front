import React, {useEffect, useState} from 'react';
import "../../css/profile/MyProfileUpdateModal.css";
import {myProfileUpdate} from "../../api/UserApi"
import {imgUpload} from "../../api/UserApi"

const MyProfileUpdateModal = ({ profile, handleModal}) => {
    const formData = new FormData();
    const [newName, setNewName] = useState('');
    const [newImg, setNewImg] = useState(null);
    const [uploadImg, setUploadImg] = useState(null);
    const [error, setError] = useState(null);
    console.log("받아온 프로필 업데이트 "+JSON.stringify(profile))
    const handleNameChange = (e) => {
        setNewName(e.target.value);
    };

    const handleChangeImg= (e) => {
        const file = e.target.files[0]; // 사용자가 선택한 첫 번째 파일
        if (!file) return; // 파일이 없으면 리턴
        const fileUrl = URL.createObjectURL(file); // 파일의 URL 생성
        setNewImg(fileUrl); // 미리보기용 이미지 URL 상태 업데이트
        // formData.append("files", file); // 올바른 방식으로 파일 추가
        // const files = formData.get("files"); // formData에서 파일을 가져옴
        setUploadImg(file)

        console.log("선택한 파일:", file.name); // 디버깅용
    }

    const handleUpdateProfile = () =>{
        // 이름이 비어있는지 확인
        if (newName === null || newName === "") {
            setNewName(profile.name);
            if (newName === null || newName === ""){
                return;
            }
        }
        const data = {
            name : newName,
            imgUrl : "",
        }
        const files = [uploadImg]; // 리스트로 감싸기
        files.forEach(file => formData.append("files", file));
        console.log("formData : "+ files)
        if (formData.get("files")) {
            imgUpload(formData) // 이미지 업로드 함수 호출
                .then((res) => {
                    data.imgUrl = res;
                    // 업로드 성공 후 추가 작업
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
                })
                .catch((err) => {
                    console.error("이미지 업로드 실패:", err);
                    alert("이미지 업로드에 실패했습니다.");
                });
        } else {
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
    }

    return (
        <div className="update-modal-overlay">
            <div className="modal-container">
                {/* 프로필 수정 모달 */}
                <div className="profile-header">
                    {/* 프로필 사진과 정보 */}
                    <div className="profile-avatar-info-container">
                        <div className="profile-avatar-container">
                            <img
                                src={newImg || profile.imgUrl} // 기본 프로필 사진
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
                                onChange={handleChangeImg}
                            />


                        </div>

                        <div className="profile-info-container">
                            <p className="profile-email"><strong>이메일:</strong> {profile.email}</p>
                            <p className="profile-created-at"><strong>회원가입일:</strong> {profile.name}</p>
                        </div>
                    </div>
                    {error && <div className="error-message">{error}</div>}

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
                        <button onClick={() => {handleUpdateProfile()}}>저장</button>
                        <button onClick={handleModal}>취소</button> {/* 모달 닫기 */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfileUpdateModal;
