import React, {useEffect, useState} from 'react';
import "../../css/admin/RolePage.css"
import {roleGet, roleDelete} from "../../api/AdminApi";
import RoleCreate from "./RoleCreate";

function RolePage(props) {
    const [roleData, setRoleData] = useState([]);
    const [modalFlag, setModalFlag] = useState(false);
    const handleCreate = () => {
        setModalFlag(!modalFlag);
    };
    useEffect(() => {
        roleGet()
            .then((res) => {
                setRoleData(res)
            })
            .catch((err) => {

            })
    },[modalFlag])

    const handleDelete = async (id) => {
        if (!window.confirm("정말 이 권한을 삭제하시겠습니까?")) return;

       await roleDelete(id)
           .then((res) => {
               alert("삭제 완료 되었습니다.")
               roleGet()
                   .then((res) => {
                       setRoleData(res)
                   })
                   .catch((err) => {

                   })
           }).catch((err) => {

           })
    };
    return (
        <div>
            <h2 className="title">🛡️ 권한 목록 </h2>
            {
                !modalFlag ? (
                    <div className="create-role-container">
                        <div className="role-badge-group" style={{marginBottom: '24px'}}>
                            {roleData.length > 0 ? (
                                roleData.map((item, idx) => (
                                    <div className="role-badge-wrapper" key={idx}>
                                        <span className="role-badge">{item.role}</span>
                                        <button className="delete-btn"onClick={() => handleDelete(item.id)}>×</button>
                                    </div>
                                ))
                            ) : (
                                <p>등록된 권한이 없습니다.</p>
                            )}
                        </div>
                        <div className="form-group">
                            <button className="add-role-button" onClick={handleCreate}>
                                + 권한 추가
                            </button>
                        </div>
                    </div>
                ) : (
                    <RoleCreate close={handleCreate}></RoleCreate>
                )
            }

        </div>
    );
}

export default RolePage;