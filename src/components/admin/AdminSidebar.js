import React from 'react';
import {Link} from "react-router-dom";
import "./../../css/admin/AdminSidebar.css"
function AdminSidebar(props) {

    return (
        <div className="admin-sidebar">
            <h2 className="sidebar-title">관리자 메뉴</h2>
            <ul className="sidebar-menu">
                <li><Link to="/admin/users">👥 유저 리스트</Link></li>
                <li><Link to="/admin/roles">✅ 권한 편집</Link></li>
            </ul>
        </div>
    );
}

export default AdminSidebar;