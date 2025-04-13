import React from 'react';
import AdminSidebar from "./AdminSidebar";
import "./../../css/admin/AdminLayout.css"
import {Outlet} from "react-router-dom";
function AdminLayout({children}) {
    return (
        <div className="admin-layout">
            <AdminSidebar/>
            <div className="container">
                <Outlet/>
            </div>
        </div>
    );
}

export default AdminLayout;