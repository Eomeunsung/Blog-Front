import React, {useEffect, useState} from 'react';
import {userInfo, userDetail} from "./../../api/AdminApi"
import "../../css/admin/AdminUser.css"
import DetailUser from "./DetailUser";
function AdminUserPage(props) {
    const [users, setUsers] = useState([]);
    const [detailFlag, setDetailFlag] = useState(false);
    const [userId, setUserId] = useState(null);
    useEffect(() => {
        userInfo()
            .then((res)=>{
                console.log("유저 정보 조회 성공 "+JSON.stringify(res))
                setUsers(res);
            })
            .catch((err)=>{
                console.log(err);
            })
    },[])

    const handleDetail=(data)=>{
        setUserId(data);
        setDetailFlag(!detailFlag);
    }

    const handleCloseDetail=()=>{
        setDetailFlag(!detailFlag);
    }
    return (
        <div>
            <h2 className="admin-title">👨‍💼 관리자 - 회원 관리</h2>
            {
                !detailFlag ? (
                    <ul className="user-list">
                        {users.map((user) => (
                            <li key={user.id} className="user-item" onClick={() => {
                                handleDetail(user.id)
                            }}>
                                <div className="user-summary">
                                    <span>📧 {user.email}</span>
                                    <span>가입일: {user.createAt || '알 수 없음'}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <DetailUser data={userId} close={handleCloseDetail}></DetailUser>
                )
            }
        </div>
    );
}

export default AdminUserPage;