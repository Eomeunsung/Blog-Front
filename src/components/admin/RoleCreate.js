import React, {useState} from 'react';
import "./../../css/admin/RoleCreate.css"
import {roleCreate} from "./../../api/AdminApi"
function RoleCreate({close}) {
    const init = {
        role : "",
        roleDesc:"",
    }
    const [roleName, setRoleName] = useState('');
    const [roleDesc, setRoleDesc] = useState('');
    const [error, setError] = useState('');
    const handleCreate = async () => {
        if (!roleName.trim()) {
            setError("권한 이름을 입력해주세요.")
            return;
        }
        if(!roleDesc.trim()) {
            setError("권한 설명을 입력해주세요.")
            return;
        }
        init.role = roleName;
        init.roleDesc = roleDesc;
       await roleCreate(init)
            .then((res)=>{
                setRoleName('');
                close();
            })
            .catch((err)=>{
                if(err.data.code=="R001"){
                    setError(err.data.message);
                    return;
                }
            })
    };
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className="modal-title">🔐 새 권한 추가</h2>
                <p className="role-warning">⚠️ 꼭 <strong>ROLE_</strong> 접두사를 붙여주시기 바랍니다.</p>
                {error && <div className="error-message">{error}</div>}
                <input
                    type="text"
                    id="roleName"
                    value={roleName}
                    onChange={(e) => setRoleName(e.target.value)}
                    placeholder="예: ROLE_MANAGER"
                    className="modal-input"
                />
                <input
                    type="text"
                    id="roleDesc"
                    value={roleDesc}
                    onChange={(e) => setRoleDesc(e.target.value)}
                    placeholder="예: 매니저"
                    className="modal-input"
                />
                <div className="modal-button-group">
                    <button className="modal-button" onClick={() => {
                        handleCreate()
                    }}>저장
                    </button>
                    <button className="modal-button" onClick={close}>취소</button>
                </div>
            </div>
        </div>
    );
}

export default RoleCreate;