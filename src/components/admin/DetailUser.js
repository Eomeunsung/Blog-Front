import React, {useEffect, useState} from 'react';
import {roleGet, userDetail, userUpdate} from "../../api/AdminApi";
import "./../../css/admin/DetailUser.css"

function DetailUser({data, close}) {
    const [userInfo, setUserInfo] = useState({});
    const [updateFlag, setUpdateFlag] = useState(false);
    const [roleData, setRoleData] = useState([]);
    const [editName, setEditName] = useState('');
    const [editEmail, setEditEmail] = useState('');
    const [checkedItems, setCheckedItems] = useState([]);
    const [error, setError] = useState('');
    //유정 정보 가져오기
    useEffect(() => {
        if(data){
            userDetail(data)
                .then((res)=>{
                    setUserInfo(res);
                })
                .catch((err)=>{
                    console.log(err);
                })
        }
    }, [updateFlag]);

    //수정 페이지이로 이동
    const handleUpdate =async () =>{
        setUpdateFlag(!updateFlag);
        await roleGet()
            .then((res) => {
                setRoleData(res)
            })
            .catch((err) => {

            })
    }

    //수정 페이지 이동할때 권한 체크박스 초기하
    useEffect(() => {
        if (updateFlag && userInfo.roles) {
            setCheckedItems(userInfo.roles);
        }
    }, [updateFlag]);


    //권한 체크 할때 배열에 담기
    const handleCheck = (item) => {
        setCheckedItems((prev) =>
            prev.includes(item)
                ? prev.filter((v) => v !== item)
                : [...prev, item]
        );
    };

    //수정 후 저장
    const handleUpdateApi = async () =>{
        const updatedUser = {
            id: userInfo.id || data,
            name: editName || userInfo.name,
            email: editEmail || userInfo.email,
            roles: checkedItems,
        };
        await userUpdate(updatedUser)
            .then((res)=>{
                if(res.code==='A200'){
                    setUpdateFlag(!updateFlag);
                }
                console.log(res)
            })
            .catch((err)=>{
                setError(err.data.message);
                return;
            })
    }


    return (
        <div className="detail-user-container">
            {
                updateFlag ?
                    (
                        <div className="user-edit-container">
                            <h3 className="section-title">✏️ 사용자 정보 수정</h3>
                            {error && <div className="error-message">{error}</div>}
                            <div className="form-row">
                                <label>이름</label>
                                <input
                                    type="text"
                                    value={editName}
                                    placeholder={userInfo.name}
                                    onChange={(e) => setEditName(e.target.value)}
                                    className="editable-input"
                                />
                            </div>

                            <div className="form-row">
                                <label>이메일</label>
                                <input
                                    type="text"
                                    value={editEmail}
                                    placeholder={userInfo.email}
                                    onChange={(e) => setEditEmail(e.target.value)}
                                    className="editable-input"
                                />
                            </div>

                            <div className="form-section">
                                <h4 className="section-subtitle">📌 권한 선택</h4>
                                {roleData.length > 0 ? (
                                    <div className="checkbox-group">
                                        {roleData.map((item, idx) => (
                                            <label key={idx} className="checkbox-label">
                                                <input
                                                    type="checkbox"
                                                    checked={checkedItems.includes(item.role)}
                                                    onChange={() => handleCheck(item.role)}
                                                />
                                                {item.role}
                                            </label>
                                        ))}
                                    </div>
                                ) : (
                                    <p>등록된 권한이 없습니다.</p>
                                )}
                            </div>

                            <div className="role-badge-group">
                                {checkedItems?.map((r, idx) => (
                                    <span className="role-badge" key={idx}>{r}</span>
                                ))}
                            </div>

                            <div className="close-button" onClick={handleUpdateApi}>저장</div>
                            <div className="close-button" onClick={close}>닫기</div>
                        </div>
                    ) : (
                        <>
                        {userInfo ? (
                                <>
                                    <p><strong>이름:</strong> {userInfo.name}</p>
                                    <p><strong>이메일:</strong> {userInfo.email}</p>
                                    <p><strong>가입일:</strong> {userInfo.createAt}</p>
                                    <p><strong>권한 목록:</strong></p>
                                    <div className="role-badge-group">
                                        {userInfo.roles?.map((r, idx) => (
                                            <span className="role-badge" key={idx}>
                                              {r}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="close-button" onClick={handleUpdate}>수정</div>
                                    <div className="close-button" onClick={close}>닫기</div>
                                </>
                            ) : (
                                <p>불러오는 중...</p>
                            )}
                        </>
                    )
            }

        </div>
    );
}

export default DetailUser;